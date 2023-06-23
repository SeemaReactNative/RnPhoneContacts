package com.demoapp;

import android.app.Activity;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.i18nmanager.I18nUtil;


public class RnStorageModule extends ReactContextBaseJavaModule {

    public RnStorageModule(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod
    public void readStorageValue(String userLanguage, String value, Callback cb) {
        I18nUtil mI18nUtil = I18nUtil.getInstance();
        Activity activity = getCurrentActivity();
        if(value.equals("fr")) {
            Toast.makeText(getReactApplicationContext(), "language changed successfully in fr", Toast.LENGTH_LONG).show();

            try{
                cb.invoke(null, value);
                mI18nUtil.forceRTL(activity,true);
                mI18nUtil.allowRTL(activity, true);
            }catch (Exception e){
                cb.invoke(e.toString(), userLanguage);
            }

        } else {
            Toast.makeText(getReactApplicationContext(), "language changed successfully in en", Toast.LENGTH_LONG).show();

            try{
                cb.invoke(null, value);
                mI18nUtil.forceRTL(activity,false);
                mI18nUtil.allowRTL(activity, false);
            }catch (Exception e){
                cb.invoke(e.toString(), userLanguage);
            }
        }
    }

    @ReactMethod
    public void getDeviceName(Callback cb) {
        try{
            cb.invoke(null, android.os.Build.MODEL);
        }catch (Exception e){
            cb.invoke(e.toString(), null);
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "RnStorageModule";
    }
}
