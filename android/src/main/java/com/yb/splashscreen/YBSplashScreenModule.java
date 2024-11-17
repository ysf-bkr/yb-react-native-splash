package com.yb.splashscreen;

import android.app.Activity;
import android.app.Dialog;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.FrameLayout;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.view.Gravity;
import android.util.TypedValue;
import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.view.animation.AccelerateDecelerateInterpolator;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class YBSplashScreenModule extends ReactContextBaseJavaModule {
    private static Dialog splashDialog;
    private static boolean isVisible = false;
    private static View splashView;
    private final ReactApplicationContext reactContext;

    YBSplashScreenModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return "YBSplashScreen";
    }

    private static View createDefaultLogoView(Activity activity) {
        // Ana container
        FrameLayout container = new FrameLayout(activity);
        FrameLayout.LayoutParams containerParams = new FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.MATCH_PARENT,
            FrameLayout.LayoutParams.MATCH_PARENT
        );
        container.setLayoutParams(containerParams);
        container.setBackgroundColor(Color.WHITE);

        // Logo container (mavi daire)
        FrameLayout logoContainer = new FrameLayout(activity);
        int size = (int) TypedValue.applyDimension(
            TypedValue.COMPLEX_UNIT_DIP, 100,
            activity.getResources().getDisplayMetrics()
        );
        FrameLayout.LayoutParams logoParams = new FrameLayout.LayoutParams(size, size);
        logoParams.gravity = Gravity.CENTER;
        logoContainer.setLayoutParams(logoParams);

        // Mavi daire arka plan
        GradientDrawable shape = new GradientDrawable();
        shape.setShape(GradientDrawable.OVAL);
        shape.setColor(Color.parseColor("#3498DB")); // YB mavi rengi
        logoContainer.setBackground(shape);

        // YB yazısı
        TextView ybText = new TextView(activity);
        FrameLayout.LayoutParams textParams = new FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.WRAP_CONTENT,
            FrameLayout.LayoutParams.WRAP_CONTENT
        );
        textParams.gravity = Gravity.CENTER;
        ybText.setLayoutParams(textParams);
        ybText.setText("YB");
        ybText.setTextSize(TypedValue.COMPLEX_UNIT_SP, 30);
        ybText.setTextColor(Color.WHITE);
        ybText.setGravity(Gravity.CENTER);

        logoContainer.addView(ybText);
        container.addView(logoContainer);

        splashView = container;
        return container;
    }

    @ReactMethod
    public void updateConfig(ReadableMap config) {
        final Activity activity = getCurrentActivity();
        if (activity == null || splashView == null) return;

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (config.hasKey("backgroundColor")) {
                    splashView.setBackgroundColor(Color.parseColor(config.getString("backgroundColor")));
                }
            }
        });
    }

    @ReactMethod
    public void show() {
        final Activity activity = getCurrentActivity();
        if (activity == null) return;

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (!isVisible) {
                    isVisible = true;
                    splashDialog = new Dialog(activity, android.R.style.Theme_Translucent_NoTitleBar);
                    splashDialog.getWindow().addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
                    splashDialog.getWindow().setStatusBarColor(Color.WHITE);
                    splashDialog.setContentView(createDefaultLogoView(activity));
                    splashDialog.setCancelable(false);
                    splashDialog.show();
                }
            }
        });
    }

    @ReactMethod
    public void hide() {
        final Activity activity = getCurrentActivity();
        if (activity == null) return;

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (isVisible && splashDialog != null) {
                    isVisible = false;
                    if (splashView != null) {
                        splashView.animate()
                            .alpha(0f)
                            .setDuration(200)
                            .setInterpolator(new AccelerateDecelerateInterpolator())
                            .setListener(new AnimatorListenerAdapter() {
                                @Override
                                public void onAnimationEnd(Animator animation) {
                                    splashDialog.dismiss();
                                    splashDialog = null;
                                    splashView = null;
                                    sendEvent("splashScreenDidHide");
                                }
                            })
                            .start();
                    } else {
                        splashDialog.dismiss();
                        splashDialog = null;
                        sendEvent("splashScreenDidHide");
                    }
                }
            }
        });
    }

    private void sendEvent(String eventName) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, null);
    }
}