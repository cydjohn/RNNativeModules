package com.crossplatformdemo;

import android.support.annotation.Nullable;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.bridge.Promise;


public class messageBridge extends ReactContextBaseJavaModule {
    ReactApplicationContext mReactContext;
    public messageBridge(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }
    @Override
    public String getName() {
        return "messageBridge";
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @ReactMethod
    public void pushMessage(String message) {
        WritableMap data = Arguments.createMap();
        data.putString("status","success");
        data.putString("message",message + " (send event)");
        this.sendEvent(this.mReactContext,"PushMessage",data);
    }

    @ReactMethod
    public void show(String message){
        Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_SHORT).show();
    }

    @ReactMethod
    public void getMessage(String message, Promise promise) {
        try {
            WritableMap data = Arguments.createMap();
            data.putString("status","success");
            data.putString("message", message + " (promise)");
            promise.resolve(data);
        } catch(IllegalViewOperationException e){
            promise.reject("error", e);
        }
    }

}
