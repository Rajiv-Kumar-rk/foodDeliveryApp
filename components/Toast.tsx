import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Surface, Text, IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../styles/theme';

type ToastType = 'info' | 'error' | 'warning';

interface ToastProps {
  visible: boolean;
  message: string;
  type: ToastType;
  duration?: number;
  onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type,
  duration = 3000,
  onDismiss,
}) => {
  const insets = useSafeAreaInsets();
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onDismiss());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, animation, duration, onDismiss]);

  if (!visible) return null;

  const getIconAndColor = () => {
    switch (type) {
      case 'info':
        return { icon: 'information', color: theme.colors.primary };
      case 'error':
        return { icon: 'alert-circle', color: theme.colors.error };
      case 'warning':
        return { icon: 'alert', color: theme.colors.warning };
      default:
        return { icon: 'information', color: theme.colors.primary };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <Animated.View
      style={[
        styles.container,
        { top: insets.top + 10 },
        { opacity: animation, transform: [{ translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }] },
      ]}
    >
      <Surface style={[styles.surface, { borderLeftColor: color }]}>
        <IconButton icon={icon} size={24} iconColor={color} style={styles.icon} />
        <Text style={styles.message}>{message}</Text>
        <IconButton icon="close" size={20} onPress={onDismiss} />
      </Surface>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
    alignItems: 'center',
  },
  surface: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 4,
    borderLeftWidth: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 4,
    maxWidth: '90%',
  },
  icon: {
    margin: 0,
    padding: 0,
  },
  message: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    color: theme.colors.textPrimary,
  },
});

export default Toast;

