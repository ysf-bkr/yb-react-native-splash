import { Animated, Easing } from 'react-native';

/**
 * Fade animasyonu oluşturur
 * @param value - Animated.Value
 * @param toValue - Hedef değer
 * @param duration - Animasyon süresi
 * @returns Animated.CompositeAnimation
 */
export const createFadeAnimation = (
    value: Animated.Value,
    toValue: number,
    duration: number
): Animated.CompositeAnimation => {
    return Animated.timing(value, {
        toValue,
        duration,
        easing: Easing.ease,
        useNativeDriver: true,
    });
};

/**
 * Slide animasyonu oluşturur
 * @param value - Animated.Value
 * @param toValue - Hedef değer
 * @param duration - Animasyon süresi
 * @returns Animated.CompositeAnimation
 */
export const createSlideAnimation = (
    value: Animated.Value,
    toValue: number,
    duration: number
): Animated.CompositeAnimation => {
    return Animated.timing(value, {
        toValue,
        duration,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: true,
    });
};

/**
 * Animasyonları sırayla çalıştırır
 * @param animations - Animated.CompositeAnimation dizisi
 * @returns Promise<void>
 */
export const runSequence = (animations: Animated.CompositeAnimation[]): Promise<void> => {
    return new Promise((resolve) => {
        Animated.sequence(animations).start(() => resolve());
    });
};

/**
 * Animasyonları paralel çalıştırır
 * @param animations - Animated.CompositeAnimation dizisi
 * @returns Promise<void>
 */
export const runParallel = (animations: Animated.CompositeAnimation[]): Promise<void> => {
    return new Promise((resolve) => {
        Animated.parallel(animations).start(() => resolve());
    });
};

/**
 * Animasyon easing fonksiyonları
 */
export const easings = {
    easeIn: Easing.in(Easing.ease),
    easeOut: Easing.out(Easing.ease),
    easeInOut: Easing.inOut(Easing.ease),
    elastic: Easing.elastic(1),
    bounce: Easing.bounce
};