import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Image,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import type { SplashScreenConfig, SplashScreenRef } from '../types';

const { width, height } = Dimensions.get('window');

const DEFAULT_CONFIG: SplashScreenConfig = {
  backgroundColor: '#ffffff',
  duration: 2000,
  animationType: 'fade',
  animationDuration: 500,
  imageResizeMode: 'contain',
};

const SplashScreen = forwardRef<SplashScreenRef, { initialConfig?: SplashScreenConfig }>(
  ({ initialConfig = {} }, ref) => {
    const [config, setConfig] = useState<SplashScreenConfig>({
      ...DEFAULT_CONFIG,
      ...initialConfig,
    });
    const [isVisible, setIsVisible] = useState(true);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;

    const hide = () => {
      const { animationType, animationDuration = 500, onHide } = config;

      const animation = {
        fade: Animated.timing(fadeAnim, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        slide: Animated.timing(slideAnim, {
          toValue: -height,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        none: Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      }[animationType || 'fade'];

      animation.start(() => {
        setIsVisible(false);
        onHide?.();
      });
    };

    const show = () => {
      setIsVisible(true);
      fadeAnim.setValue(1);
      slideAnim.setValue(0);

      if (config.duration && config.duration > 0) {
        setTimeout(hide, config.duration);
      }
    };

    const updateConfig = (newConfig: Partial<SplashScreenConfig>) => {
      setConfig((prevConfig) => ({
        ...prevConfig,
        ...newConfig,
      }));
    };

    useImperativeHandle(ref, () => ({
      show,
      hide,
      updateConfig,
    }));

    if (!isVisible) return null;

    const animStyle = {
      fade: {
        opacity: fadeAnim,
      },
      slide: {
        transform: [{ translateY: slideAnim }],
      },
      none: {},
    }[config.animationType || 'fade'];

    return (
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: config.backgroundColor },
          animStyle,
        ]}
      >
        {config.imageSource && (
          <Image
            source={config.imageSource as ImageSourcePropType}
            style={styles.image}
            resizeMode={config.imageResizeMode}
          />
        )}
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  image: {
    width: '80%',
    height: '80%',
  },
});

export default SplashScreen;
