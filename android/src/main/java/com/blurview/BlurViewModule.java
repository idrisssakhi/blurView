package com.blurview;

import android.graphics.drawable.Drawable;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Objects;

import javax.annotation.Nonnull;

import eightbitlab.com.blurview.BlurAlgorithm;
import eightbitlab.com.blurview.BlurView;
import eightbitlab.com.blurview.RenderEffectBlur;
import eightbitlab.com.blurview.RenderScriptBlur;

@SuppressWarnings("unused")
class BlurViewModule extends ViewGroupManager<BlurView> {
    private static final String REACT_CLASS = "BlurView";

    private static final int defaultRadius = 10;
    private static final int defaultSampling = 10;

    @Override
    public @Nonnull String getName() {
        return REACT_CLASS;
    }

    @Override
    public @Nonnull BlurView createViewInstance(@Nonnull ThemedReactContext ctx) {
        BlurView blurView = new BlurView(ctx);
        View decorView = Objects.requireNonNull(ctx.getCurrentActivity()).getWindow().getDecorView();
        ViewGroup rootView = decorView.findViewById(android.R.id.content);
        Drawable windowBackground = decorView.getBackground();

        BlurAlgorithm blurAlgorithm = android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.S
                ? new RenderEffectBlur()
                : new RenderScriptBlur(ctx);

        blurView.setupWith(rootView, blurAlgorithm)
                .setFrameClearDrawable(windowBackground)
                .setBlurRadius(defaultRadius)
                .setBlurAutoUpdate(true);
        return blurView;
    }

    @ReactProp(name = "blurRadius", defaultInt = defaultRadius)
    public void setRadius(BlurView view, int radius) {
        if (radius == 0) {
            view.setBlurEnabled(false);
        } else {
            view.setBlurEnabled(true);
            view.setBlurRadius(radius);
            view.invalidate();
        }
    }

    @ReactProp(name = "overlayColor", customType = "Color")
    public void setColor(BlurView view, int color) {
        view.setOverlayColor(color);
        view.invalidate();
    }

    @ReactProp(name = "downsampleFactor", defaultInt = defaultSampling)
    public void setDownsampleFactor(BlurView view, int factor) {
    }
}
