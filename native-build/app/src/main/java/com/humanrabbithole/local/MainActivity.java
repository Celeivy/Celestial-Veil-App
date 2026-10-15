package com.humanrabbithole.local;

import androidx.activity.ComponentActivity;
import androidx.activity.OnBackPressedCallback;
import android.app.AlertDialog;
import android.os.Bundle;
import android.content.Intent;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.net.Uri;
import android.graphics.Color;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowManager;
import android.webkit.*;
import android.util.AtomicFile;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import androidx.webkit.WebViewAssetLoader;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.security.KeyStore;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import org.json.JSONObject;

public class MainActivity extends ComponentActivity {
    private static final String HOME="https://appassets.androidplatform.net/assets/index.html";
    private static final String KEY_ALIAS="rabbit-hole-state-v2";
    private static final int EXPORT=21, IMPORT=22, RESOURCE=23, PACK=24, LIMIT=110_000_000;
    private WebView web;
    private byte[] pendingExport;
    private AtomicFile stateFile;

    @Override public void onCreate(Bundle saved) {
        super.onCreate(saved);
        stateFile=new AtomicFile(new File(getNoBackupFilesDir(),"discoveries.enc"));
        web=new WebView(this);
        web.setBackgroundColor(Color.rgb(250,247,241));
        setContentView(web);
        web.setOnApplyWindowInsetsListener((v,insets)->{
            if(android.os.Build.VERSION.SDK_INT>=30){
                android.graphics.Insets bars=insets.getInsets(WindowInsets.Type.systemBars()|WindowInsets.Type.displayCutout());
                android.graphics.Insets ime=insets.getInsets(WindowInsets.Type.ime());
                v.setPadding(bars.left,bars.top,bars.right,Math.max(bars.bottom,ime.bottom));
            }else v.setPadding(insets.getSystemWindowInsetLeft(),insets.getSystemWindowInsetTop(),insets.getSystemWindowInsetRight(),insets.getSystemWindowInsetBottom());
            return insets;
        });
        WebView.setWebContentsDebuggingEnabled(false);
        WebSettings s=web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(false);
        s.setDatabaseEnabled(false);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);
        s.setAllowFileAccessFromFileURLs(false);
        s.setAllowUniversalAccessFromFileURLs(false);
        s.setJavaScriptCanOpenWindowsAutomatically(false);
        s.setSupportMultipleWindows(false);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        s.setCacheMode(WebSettings.LOAD_NO_CACHE);
        s.setMediaPlaybackRequiresUserGesture(true);
        s.setSaveFormData(false);
        CookieManager.getInstance().setAcceptCookie(false);
        CookieManager.getInstance().setAcceptThirdPartyCookies(web,false);
        final WebViewAssetLoader loader=new WebViewAssetLoader.Builder().addPathHandler("/assets/",new WebViewAssetLoader.AssetsPathHandler(this)).build();
        web.setWebViewClient(new WebViewClient(){
            @Override public WebResourceResponse shouldInterceptRequest(WebView view,WebResourceRequest req){
                if (isLocal(req.getUrl())) {WebResourceResponse r=loader.shouldInterceptRequest(req.getUrl());if(r!=null)return r;}
                return new WebResourceResponse("text/plain","UTF-8",403,"Blocked",java.util.Collections.emptyMap(),new ByteArrayInputStream(new byte[0]));
            }
            @Override public boolean shouldOverrideUrlLoading(WebView view,WebResourceRequest req){return !isLocal(req.getUrl());}
            @Override public boolean onRenderProcessGone(WebView view,RenderProcessGoneDetail detail){
                view.destroy();runOnUiThread(()->new AlertDialog.Builder(MainActivity.this).setTitle("Your space needs to reopen").setMessage("Your last saved discoveries are kept on this device.").setPositiveButton("Reopen",(a,b)->recreate()).setCancelable(false).show());return true;
            }
        });
        web.setWebChromeClient(new WebChromeClient());
        web.addJavascriptInterface(new LocalBridge(),"RabbitNative");
        getOnBackPressedDispatcher().addCallback(this,new OnBackPressedCallback(true){
            @Override public void handleOnBackPressed(){web.evaluateJavascript("(function(){const d=document.querySelector('dialog[open]');if(d){d.close();return true;}return false;})()",result->{if(!"true".equals(result)){if(web.canGoBack())web.goBack();else finish();}});}
        });
        web.loadUrl(HOME);
    }
    private boolean isLocal(Uri uri){return "https".equals(uri.getScheme())&&"appassets.androidplatform.net".equals(uri.getHost())&&"/assets/index.html".equals(uri.getPath())&&(uri.getPort()==-1||uri.getPort()==443);}
    private SecretKey key() throws Exception {
        KeyStore ks=KeyStore.getInstance("AndroidKeyStore");ks.load(null);
        if(ks.containsAlias(KEY_ALIAS))return (SecretKey)ks.getKey(KEY_ALIAS,null);
        KeyGenerator generator=KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES,"AndroidKeyStore");
        generator.init(new KeyGenParameterSpec.Builder(KEY_ALIAS,KeyProperties.PURPOSE_ENCRYPT|KeyProperties.PURPOSE_DECRYPT).setBlockModes(KeyProperties.BLOCK_MODE_GCM).setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE).setKeySize(256).build());
        return generator.generateKey();
    }
    private synchronized String readState(){
        // A legacy AtomicFile backup can be the only complete file after a crash.
        // Let readFully() restore it instead of mistaking this for a fresh vault.
        File base=stateFile.getBaseFile();
        if(!base.exists()&&!new File(base.getPath()+".bak").exists())return "";
        try {byte[] bytes=stateFile.readFully();if(bytes.length<29||bytes.length>LIMIT)return "UNREADABLE_STATE";byte[] iv=java.util.Arrays.copyOfRange(bytes,0,12),cipher=java.util.Arrays.copyOfRange(bytes,12,bytes.length);Cipher c=Cipher.getInstance("AES/GCM/NoPadding");c.init(Cipher.DECRYPT_MODE,key(),new GCMParameterSpec(128,iv));return new String(c.doFinal(cipher),StandardCharsets.UTF_8);}
        catch(Exception ex){return "UNREADABLE_STATE";}
    }
    private synchronized boolean writeState(String value){
        FileOutputStream out=null;
        try {if(value==null||value.length()>LIMIT)return false;JSONObject o=new JSONObject(value);if(o.optInt("version")!=2)return false;Cipher c=Cipher.getInstance("AES/GCM/NoPadding");c.init(Cipher.ENCRYPT_MODE,key());byte[] ciphertext=c.doFinal(value.getBytes(StandardCharsets.UTF_8));out=stateFile.startWrite();out.write(c.getIV());out.write(ciphertext);stateFile.finishWrite(out);return true;}
        catch(Exception ex){if(out!=null)stateFile.failWrite(out);return false;}
    }
    public class LocalBridge {
        @JavascriptInterface public String getPlatform(){return "android";}
        @JavascriptInterface public String loadState(){return readState();}
        @JavascriptInterface public boolean saveState(String value){return writeState(value);}
        @JavascriptInterface public void setSecureScreen(boolean enabled){runOnUiThread(()->{if(enabled)getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);else getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE);});}
        @JavascriptInterface public void copyText(String text){if(text==null||text.length()>20000)return;runOnUiThread(()->{ClipboardManager clipboard=(ClipboardManager)getSystemService(Context.CLIPBOARD_SERVICE);clipboard.setPrimaryClip(ClipData.newPlainText("My Rabbit Hole words",text));});}
        @JavascriptInterface public void exportBackup(String text,String filename){if(text==null||text.length()>LIMIT)return;pendingExport=text.getBytes(StandardCharsets.UTF_8);String safeName=filename!=null&&filename.endsWith(".rabbitpack")?"Rabbit_Hole_Content.rabbitpack":"Rabbit_Hole_Backup.rabbit";runOnUiThread(()->{Intent i=new Intent(Intent.ACTION_CREATE_DOCUMENT).addCategory(Intent.CATEGORY_OPENABLE).setType("application/json").putExtra(Intent.EXTRA_TITLE,safeName);startActivityForResult(i,EXPORT);});}
        @JavascriptInterface public void importBackup(){runOnUiThread(()->{Intent i=new Intent(Intent.ACTION_OPEN_DOCUMENT).addCategory(Intent.CATEGORY_OPENABLE).setType("*/*");startActivityForResult(i,IMPORT);});}
        @JavascriptInterface public void importContentPack(){runOnUiThread(()->startActivityForResult(new Intent(Intent.ACTION_OPEN_DOCUMENT).addCategory(Intent.CATEGORY_OPENABLE).setType("*/*"),PACK));}
        @JavascriptInterface public void importResource(){runOnUiThread(()->startActivityForResult(new Intent(Intent.ACTION_OPEN_DOCUMENT).addCategory(Intent.CATEGORY_OPENABLE).setType("*/*"),RESOURCE));}
        @JavascriptInterface public boolean saveMedia(String id,String value){try{if(value==null||value.length()>22_000_000)return false;return writeMedia(id,android.util.Base64.decode(value,android.util.Base64.DEFAULT));}catch(Exception e){return false;}}
        @JavascriptInterface public String loadMedia(String id){try{return android.util.Base64.encodeToString(readMedia(id),android.util.Base64.NO_WRAP);}catch(Exception e){return "";}}
        @JavascriptInterface public boolean deleteMedia(String id){try{mediaFile(id).delete();return true;}catch(Exception e){return false;}}
        @JavascriptInterface public void exportMedia(String id,String name,String mime){try{pendingExport=readMedia(id);runOnUiThread(()->startActivityForResult(new Intent(Intent.ACTION_CREATE_DOCUMENT).addCategory(Intent.CATEGORY_OPENABLE).setType(mime).putExtra(Intent.EXTRA_TITLE,new File(name).getName()),EXPORT));}catch(Exception e){notice("This file is not present on this device.");}}
    }
    private AtomicFile mediaFile(String id){if(id==null||!id.matches("[a-zA-Z0-9-]{1,100}"))throw new IllegalArgumentException();return new AtomicFile(new File(getNoBackupFilesDir(),"media-"+id+".enc"));}
    private synchronized boolean writeMedia(String id,byte[] bytes){FileOutputStream out=null;AtomicFile f=null;try{if(bytes.length>16_000_000)return false;f=mediaFile(id);Cipher c=Cipher.getInstance("AES/GCM/NoPadding");c.init(Cipher.ENCRYPT_MODE,key());byte[] cipher=c.doFinal(bytes);out=f.startWrite();out.write(c.getIV());out.write(cipher);f.finishWrite(out);return true;}catch(Exception e){if(f!=null&&out!=null)f.failWrite(out);return false;}}
    private synchronized byte[] readMedia(String id)throws Exception{byte[] bytes=mediaFile(id).readFully();if(bytes.length<29||bytes.length>16_000_100)throw new IOException();Cipher c=Cipher.getInstance("AES/GCM/NoPadding");c.init(Cipher.DECRYPT_MODE,key(),new GCMParameterSpec(128,java.util.Arrays.copyOfRange(bytes,0,12)));return c.doFinal(java.util.Arrays.copyOfRange(bytes,12,bytes.length));}
    private String resourceMime(String reported,String name){if(reported!=null&&reported.matches("(image/(png|jpeg|webp)|audio/(mpeg|mp3|mp4|aac|ogg|wav|x-wav|flac|webm)|application/pdf|text/(plain|markdown))"))return reported;String n=name.toLowerCase(java.util.Locale.ROOT);String[][] types={{".mp3","audio/mpeg"},{".m4a","audio/mp4"},{".wav","audio/wav"},{".ogg","audio/ogg"},{".aac","audio/aac"},{".flac","audio/flac"},{".webm","audio/webm"},{".webp","image/webp"},{".jpg","image/jpeg"},{".jpeg","image/jpeg"},{".png","image/png"},{".pdf","application/pdf"},{".txt","text/plain"},{".md","text/markdown"}};for(String[] t:types)if(n.endsWith(t[0]))return t[1];return null;}
    private void notice(String message){runOnUiThread(()->web.evaluateJavascript("window.rabbitNativeNotice("+JSONObject.quote(message)+")",null));}
    @Override protected void onActivityResult(int request,int result,Intent intent){
        super.onActivityResult(request,result,intent);
        if(result!=RESULT_OK||intent==null||intent.getData()==null){pendingExport=null;return;}
        Uri uri=intent.getData();
        if(request==EXPORT){try(OutputStream out=getContentResolver().openOutputStream(uri,"wt")){if(pendingExport==null||out==null)throw new IOException();out.write(pendingExport);notice("Your file was saved.");}catch(Exception e){notice("This file could not be saved. Please try again.");}finally{pendingExport=null;}}
        if(request==IMPORT)new Thread(()->{try(InputStream in=getContentResolver().openInputStream(uri);ByteArrayOutputStream out=new ByteArrayOutputStream()){if(in==null)throw new IOException();byte[] buffer=new byte[8192];int n,total=0;while((n=in.read(buffer))!=-1){total+=n;if(total>LIMIT)throw new IOException();out.write(buffer,0,n);}String text=out.toString(StandardCharsets.UTF_8.name());runOnUiThread(()->web.evaluateJavascript("window.rabbitImport("+JSONObject.quote(text)+")",null));}catch(Exception ex){notice("This backup could not be read. It may be too large or unavailable.");}}).start();
        if(request==PACK||request==RESOURCE)new Thread(()->{try(InputStream in=getContentResolver().openInputStream(uri);ByteArrayOutputStream out=new ByteArrayOutputStream()){if(in==null)throw new IOException();int max=request==PACK?60_000_000:15*1024*1024;byte[] buffer=new byte[8192];int n,total=0;while((n=in.read(buffer))!=-1){total+=n;if(total>max)throw new IOException();out.write(buffer,0,n);}if(request==PACK){String text=out.toString(StandardCharsets.UTF_8.name());runOnUiThread(()->web.evaluateJavascript("window.rabbitPackImport("+JSONObject.quote(text)+")",null));}else{String name="My file";try(android.database.Cursor cursor=getContentResolver().query(uri,new String[]{android.provider.OpenableColumns.DISPLAY_NAME},null,null,null)){if(cursor!=null&&cursor.moveToFirst())name=cursor.getString(0);}String mime=resourceMime(getContentResolver().getType(uri),name);if(mime==null)throw new IOException();String id=java.util.UUID.randomUUID().toString();if(!writeMedia(id,out.toByteArray()))throw new IOException();JSONObject meta=new JSONObject().put("id",id).put("name",name).put("mime",mime).put("size",out.size()).put("at",java.time.Instant.now().toString()).put("present",true);runOnUiThread(()->web.evaluateJavascript("window.rabbitResourceAdded("+JSONObject.quote(meta.toString())+")",null));}}catch(Exception ex){notice("This file could not be added. Choose supported audio, image, PDF or text under 15 MB.");}}).start();
    }
    @Override protected void onDestroy(){if(web!=null){web.removeJavascriptInterface("RabbitNative");web.destroy();}super.onDestroy();}
}
