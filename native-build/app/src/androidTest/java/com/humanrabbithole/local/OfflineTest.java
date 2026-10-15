package com.humanrabbithole.local;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.view.ViewGroup;
import android.webkit.WebView;
import androidx.test.platform.app.InstrumentationRegistry;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.*;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;
import java.nio.file.Files;
import java.io.File;
import java.nio.charset.StandardCharsets;

@RunWith(AndroidJUnit4.class)
public class OfflineTest {
    private WebView web;
    private String eval(String js)throws Exception{
        CountDownLatch latch=new CountDownLatch(1);AtomicReference<String> result=new AtomicReference<>();
        InstrumentationRegistry.getInstrumentation().runOnMainSync(()->web.evaluateJavascript(js,s->{result.set(s);latch.countDown();}));
        assertTrue("JavaScript callback",latch.await(8,TimeUnit.SECONDS));return result.get();
    }
    private void waitFor(String js)throws Exception{
        long end=System.currentTimeMillis()+25000;
        while(System.currentTimeMillis()<end){if("true".equals(eval(js)))return;Thread.sleep(150);}
        fail("Timed out waiting for the offline application: "+js+"; details: "+eval("JSON.stringify({error:window.__rabbitError||null,subtle:!!window.crypto?.subtle,uuid:typeof window.crypto?.randomUUID,entries:JSON.parse(RabbitNative.loadState()).entries.length,toast:document.querySelector('#toast')?.textContent})"));
    }
    @Test public void bundledUiPersistsEncryptedStateWithoutInternet()throws Exception{
        Context context=InstrumentationRegistry.getInstrumentation().getTargetContext();
        PackageInfo info=context.getPackageManager().getPackageInfo(context.getPackageName(),PackageManager.GET_PERMISSIONS);
        if(info.requestedPermissions!=null)for(String permission:info.requestedPermissions)assertNotEquals("android.permission.INTERNET",permission);
        MainActivity activity=(MainActivity)InstrumentationRegistry.getInstrumentation().startActivitySync(new Intent(context,MainActivity.class).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
        InstrumentationRegistry.getInstrumentation().runOnMainSync(()->web=(WebView)((ViewGroup)activity.findViewById(android.R.id.content)).getChildAt(0));
        waitFor("!!document.querySelector('[data-action=\"start\"][data-id=\"compass\"]')");
        int initialEntries=Integer.parseInt(eval("(()=>{try{return JSON.parse(RabbitNative.loadState()).entries.length}catch(e){return 0}})()"));
        AtomicReference<Boolean> domStorage=new AtomicReference<>();
        InstrumentationRegistry.getInstrumentation().runOnMainSync(()->domStorage.set(web.getSettings().getDomStorageEnabled()));assertFalse(domStorage.get());
        eval("document.querySelector('[data-action=\"start\"][data-id=\"compass\"]').click()");
        waitFor("!!document.querySelector('.compass-wrap')");
        eval("document.querySelector('[data-key=\"Core0\"]').click()");
        waitFor("JSON.parse(RabbitNative.loadState()).draft.data.Core0.length===1");
        byte[] encrypted=Files.readAllBytes(new File(context.getNoBackupFilesDir(),"discoveries.enc").toPath());
        assertTrue(encrypted.length>40);assertFalse(new String(encrypted,StandardCharsets.UTF_8).contains("Enough room for now"));
        File base=new File(context.getNoBackupFilesDir(),"discoveries.enc");
        assertTrue("Simulate interrupted legacy save",base.renameTo(new File(base.getPath()+".bak")));
        assertEquals("true",eval("JSON.parse(RabbitNative.loadState()).draft.data.Core0.length===1"));
        assertTrue("Recover complete legacy snapshot",base.exists());
        eval("window.__beforeReload=true");
        InstrumentationRegistry.getInstrumentation().runOnMainSync(()->web.reload());
        waitFor("!window.__beforeReload && !!document.querySelector('[data-key=\"Core0\"][aria-pressed=\"true\"]')");
        eval("window.onerror=function(m){window.__rabbitError=m};window.onunhandledrejection=function(e){window.__rabbitError=String(e.reason)};document.querySelector('[data-action=\"finish\"]').click()");
        waitFor("JSON.parse(RabbitNative.loadState()).entries.length==="+(initialEntries+1));
        assertTrue(eval("JSON.parse(RabbitNative.loadState()).entries[0].tool").contains("compass"));
        assertEquals("true",eval("RabbitNative.saveMedia('test-media','aGVsbG8=')"));
        assertEquals("\"aGVsbG8=\"",eval("RabbitNative.loadMedia('test-media')"));
        byte[] media=Files.readAllBytes(new File(context.getNoBackupFilesDir(),"media-test-media.enc").toPath());
        assertFalse(new String(media,StandardCharsets.UTF_8).contains("hello"));
        eval("crypto.subtle.generateKey({name:'AES-GCM',length:256},true,['encrypt','decrypt']).then(function(){window.__cryptoTest=true})");
        waitFor("window.__cryptoTest===true");
        eval("RabbitNative.deleteMedia('test-media')");
        InstrumentationRegistry.getInstrumentation().runOnMainSync(activity::finish);
    }
}
