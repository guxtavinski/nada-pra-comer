import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Receita } from '../types';
import { custoReceita, moeda } from '../utils/cardapio';
import { colors, radius, spacing } from '../theme';
import { Card } from './Card';

interface Props {
  receita: Receita;
  refeicao: string;
  pessoas: number;
  onVer: () => void;
  onTrocar: () => void;
}

function Info({ icone, texto }: { icone: keyof typeof Ionicons.glyphMap; texto: string }) {
  return (
    <View style={styles.info}>
      <Ionicons name={icone} size={16} color={colors.darkGreen} />
      <Text style={styles.infoTexto}>{texto}</Text>
    </View>
  );
}

export function RecipeCard({ receita, refeicao, pessoas, onVer, onTrocar }: Props) {
  return (
    <Card style={styles.card}>
      <Image source={receita.imagem} style={styles.imagem} resizeMode="cover" />
      <View style={styles.corpo}>
        <Text style={styles.refeicao}>{refeicao}</Text>
        <Text style={styles.nome}>{receita.nome}</Text>
        <View style={styles.infos}>
          <Info icone="time-outline" texto={`${receita.tempo} min`} />
          <Info icone="cash-outline" texto={moeda(custoReceita(receita, pessoas))} />
          <Info icone="people-outline" texto={`${pessoas} porç${pessoas > 1 ? 'ões' : 'ão'}`} />
        </View>
        <View style={styles.acoes}>
          <Pressable style={[styles.botao, styles.primario]} onPress={onVer}>
            <Text style={styles.textoPrimario}>Ver receita</Text>
          </Pressable>
          <Pressable style={[styles.botao, styles.secundario]} onPress={onTrocar}>
            <Ionicons name="swap-horizontal" size={16} color={colors.darkGreen} />
            <Text style={styles.textoSecundario}>Trocar receita</Text>
          </Pressable>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: 0, overflow: 'hidden' },
  imagem: { width: '100%', height: 150 },
  corpo: { padding: spacing.md, gap: spacing.sm },
  refeicao: { fontSize: 12, fontWeight: '700', color: colors.muted, textTransform: 'uppercase', letterSpacing: 0.6 },
  nome: { fontSize: 18, fontWeight: '800', color: colors.text },
  infos: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  info: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  infoTexto: { fontSize: 13, color: colors.muted, fontWeight: '600' },
  acoes: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs },
  botao: {
    flex: 1, paddingVertical: 11, borderRadius: radius.pill, alignItems: 'center',
    justifyContent: 'center', flexDirection: 'row', gap: 6,
  },
  primario: { backgroundColor: colors.darkGreen },
  secundario: { borderWidth: 1.5, borderColor: colors.darkGreen },
  textoPrimario: { color: colors.white, fontWeight: '700', fontSize: 14 },
  textoSecundario: { color: colors.darkGreen, fontWeight: '700', fontSize: 14 },
});
