import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme';

interface Props {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (valor: number) => void;
}

export function Stepper({ label, value, min = 1, max = 14, onChange }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.controls}>
        <Pressable style={styles.btn} onPress={() => onChange(Math.max(min, value - 1))}>
          <Ionicons name="remove" size={20} color={colors.darkGreen} />
        </Pressable>
        <Text style={styles.value}>{value}</Text>
        <Pressable style={styles.btn} onPress={() => onChange(Math.min(max, value + 1))}>
          <Ionicons name="add" size={20} color={colors.darkGreen} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 16, color: colors.text, fontWeight: '600' },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  btn: {
    width: 36, height: 36, borderRadius: radius.pill,
    backgroundColor: colors.lightGreen, alignItems: 'center', justifyContent: 'center',
  },
  value: { fontSize: 18, fontWeight: '700', color: colors.darkGreen, minWidth: 24, textAlign: 'center' },
});
