package com.emerald.mahjong;

import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.view.WindowManager;
import android.view.View;
import java.io.IOException;

public final class MainActivity extends Activity {
    private static final String TAG = "EmeraldMahjong";
    private static final String HOST = "appassets.androidplatform.net";
    private WebView game;
    @Override public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
                View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION);
        try {
            game = new WebView(this);
            game.setBackgroundColor(Color.rgb(3, 49, 38));
            WebSettings settings = game.getSettings();
            settings.setJavaScriptEnabled(true);
            settings.setDomStorageEnabled(true);
            settings.setMediaPlaybackRequiresUserGesture(true);
            settings.setAllowFileAccess(false);
            settings.setAllowContentAccess(false);
            settings.setJavaScriptCanOpenWindowsAutomatically(false);
            settings.setSupportMultipleWindows(false);
            settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
            game.setWebViewClient(new WebViewClient() {
                @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                    android.net.Uri uri = request.getUrl();
                    if (!"https".equals(uri.getScheme()) || !HOST.equals(uri.getHost()) ||
                            !"/assets/index.html".equals(uri.getPath())) {
                        return new WebResourceResponse("text/plain", "UTF-8",
                                new java.io.ByteArrayInputStream(new byte[0]));
                    }
                    try {
                        return new WebResourceResponse("text/html", "UTF-8",
                                getAssets().open("index.html"));
                    } catch (IOException e) {
                        Log.e(TAG, "Missing game asset", e);
                        return new WebResourceResponse("text/plain", "UTF-8",
                                new java.io.ByteArrayInputStream("Game asset not found".getBytes()));
                    }
                }
            });
            game.setWebChromeClient(new WebChromeClient() {
                @Override public boolean onConsoleMessage(ConsoleMessage message) {
                    if (message.messageLevel() == ConsoleMessage.MessageLevel.ERROR)
                        Log.e(TAG, "JS: " + message.message() + " at line " + message.lineNumber());
                    return true;
                }
            });
            setContentView(game);
            game.loadUrl("https://" + HOST + "/assets/index.html");
        } catch (Exception e) {
            Log.e(TAG, "Could not open game", e);
            throw e;
        }
    }
    @Override protected void onDestroy() {
        if (game != null) { game.destroy(); game = null; }
        super.onDestroy();
    }
}
