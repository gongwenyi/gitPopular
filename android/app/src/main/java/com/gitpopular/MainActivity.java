package com.gitpopular;

import android.os.Bundle; // here

import com.facebook.react.ReactActivity;
import com.umeng.analytics.MobclickAgent;

import org.devio.rn.splashscreen.SplashScreen; // here

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }

    public void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);
    }
    public void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "gitPopular";
    }
}
