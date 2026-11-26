import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius } from '../theme';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  disabled?: boolean;
}

export function Button({ title, onPress, variant = 'primary', disabled }: Props) {
  const outline = variant === 'outline';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        outline ? styles.outline : styles.primary,
        disabled && styles.disabled,
        pressed && { opacity: 0.85 },
      ]}
    >
      <Text style={[styles.text, outline && { color: colors.darkGreen }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: 15, paddingHorizontal: 24, borderRadius: radius.pill, alignItems: 'center' },
  primary: { backgroundColor: colors.darkGreen },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.darkGreen },
  disabled: { opacity: 0.4 },
  text: { color: colors.white, fontSize: 16, fontWeight: '700' },
});
