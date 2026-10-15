package com.humanrabbithole.local;

import android.content.Context;
import android.content.Intent;
import android.view.ViewGroup;
import android.webkit.WebView;
import androidx.test.platform.app.InstrumentationRegistry;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import org.junit.Assume;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.*;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

/** Runs only when the private full product asset is inserted locally. */
@RunWith(AndroidJUnit4.class)
public class ProductTest {
    private WebView web;
    private String eval(String script)throws Exception{
        CountDownLatch latch=new CountDownLatch(1);
        AtomicReference<String> result=new AtomicReference<>();
        InstrumentationRegistry.getInstrumentation().runOnMainSync(()->web.evaluateJavascript(script,v->{result.set(v);latch.countDown();}));
        assertTrue("JavaScript response",latch.await(12,TimeUnit.SECONDS));return result.get();
    }
    private void waitFor(String expression,int seconds)throws Exception{
        long until=System.currentTimeMillis()+seconds*1000L;
        while(System.currentTimeMillis()<until){if("true".equals(eval(expression)))return;Thread.sleep(150);}
        fail("Product test timed out: "+eval("JSON.stringify(window.__productQA||{title:document.title,text:document.body.innerText.slice(0,400)})"));
    }
    @Test public void fullOfflineCollectionPersistsWithoutRequiredWriting()throws Exception{
        Context context=InstrumentationRegistry.getInstrumentation().getTargetContext();
        MainActivity activity=(MainActivity)InstrumentationRegistry.getInstrumentation().startActivitySync(new Intent(context,MainActivity.class).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
        InstrumentationRegistry.getInstrumentation().runOnMainSync(()->web=(WebView)((ViewGroup)activity.findViewById(android.R.id.content)).getChildAt(0));
        try {
            waitFor("document.readyState==='complete'",40);
            Assume.assumeTrue("Synthetic cloud fixture intentionally omits private product", "true".equals(eval("typeof DECK!=='undefined' && typeof PRACTICES!=='undefined'")));
            assertEquals("157",eval("DECK.length"));
            assertEquals("116",eval("PRACTICES.length+1"));
            assertEquals("15",eval("JOURNEYS.length"));
            eval("window.__productQA={running:true};(async()=>{try{const wait=ms=>new Promise(r=>setTimeout(r,ms));const click=(a,extra='')=>{const el=document.querySelector('[data-action=\"'+a+'\"]'+extra);if(!el)throw Error('Missing action '+a+' '+extra);el.click()};const read=()=>{const raw=RabbitNative.loadState();return raw?JSON.parse(raw):{entries:[]}};const before=read().entries.length;for(const id of PRACTICES.map(p=>p.id).concat(['web'])){location.hash='explore';await wait(40);click('room','[data-id=\"'+(id.startsWith('pocket')?'The pocket collection':'All')+'\"]');click('start','[data-id=\"'+id+'\"]');await wait(30);if(id==='compass'){click('pick','[data-key=\"Core0\"]')}else if(id==='web'){click('rate','[data-index=\"0\"][data-value=\"0\"]')}else{let steps=0;while(document.querySelector('.flow-controls [data-action=\"next\"]')){const answer=document.querySelector('[data-action=\"answer\"]')||document.querySelector('.work-panel [data-action=\"pick\"]');if(answer)answer.click();if(document.querySelector('[data-action=\"symbol\"]'))click('symbol');click('next');await wait(10);if(++steps>29)throw Error('Step loop '+id)}}const finish=document.querySelector('.work-panel [data-action=\"finish\"],.flow-controls [data-action=\"finish\"]');if(!finish)throw Error('No finish '+id);finish.click();await wait(20);if(read().entries[0].tool!==id)throw Error('Not saved '+id)}window.__productQA={passed:true,added:read().entries.length-before,fullProduct:true}}catch(e){window.__productQA={passed:false,error:String(e),stack:e.stack}}})()");
            waitFor("window.__productQA && typeof window.__productQA.passed==='boolean'",240);
            assertEquals(eval("JSON.stringify(window.__productQA)"),"true",eval("window.__productQA.passed===true && window.__productQA.added===116"));
            eval("window.__productBeforeReload=JSON.parse(RabbitNative.loadState()).entries.length");
            String count=eval("window.__productBeforeReload");
            InstrumentationRegistry.getInstrumentation().runOnMainSync(()->web.reload());
            waitFor("document.readyState==='complete' && typeof DECK!=='undefined'",40);
            assertEquals(count,eval("JSON.parse(RabbitNative.loadState()).entries.length"));
        } finally {InstrumentationRegistry.getInstrumentation().runOnMainSync(activity::finish);}
    }
}
