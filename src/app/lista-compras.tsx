import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { Screen, SectionTitle } from '../components/Screen';
import { usePlan } from '../context/PlanContext';
import { CATEGORIAS, formatarQuantidade, gerarLista } from '../utils/lista';
import { colors, spacing } from '../theme';

export default function ListaCompras() {
  const { plano, cardapio, comprados, alternarComprado } = usePlan();
  const itens = gerarLista(plano, cardapio);
  const feitos = itens.filter((i) => comprados.includes(i.chave)).length;

  if (!itens.length) {
    return (
      <Screen>
        <Card>
          <Text style={styles.vazio}>Você já tem tudo em casa. Nada para comprar! 🎉</Text>
        </Card>
      </Screen>
    );
  }

  return (
    <Screen>
      <Card>
        <Text style={styles.resumo}>
          {feitos} de {itens.length} itens comprados
        </Text>
      </Card>

      {CATEGORIAS.map((categoria) => {
        const doGrupo = itens.filter((i) => i.categoria === categoria);
        if (!doGrupo.length) return null;
        return (
          <View key={categoria} style={{ gap: spacing.sm }}>
            <SectionTitle>{categoria}</SectionTitle>
            <Card style={{ gap: spacing.xs }}>
              {doGrupo.map((item) => {
                const feito = comprados.includes(item.chave);
                return (
                  <Pressable key={item.chave} style={styles.linha} onPress={() => alternarComprado(item.chave)}>
                    <Ionicons
                      name={feito ? 'checkbox' : 'square-outline'}
                      size={24}
                      color={feito ? colors.darkGreen : colors.muted}
                    />
                    <Text style={[styles.nome, feito && styles.feito]}>{item.nome}</Text>
                    <Text style={[styles.qtd, feito && styles.feito]}>
                      {formatarQuantidade(item.quantidade, item.unidade)}
                    </Text>
                  </Pressable>
                );
              })}
            </Card>
          </View>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  resumo: { color: colors.darkGreen, fontWeight: '700', fontSize: 16, textAlign: 'center' },
  vazio: { color: colors.text, fontSize: 16, textAlign: 'center' },
  linha: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: 8 },
  nome: { flex: 1, fontSize: 16, color: colors.text },
  qtd: { fontSize: 15, fontWeight: '700', color: colors.darkGreen },
  feito: { textDecorationLine: 'line-through', color: colors.muted },
});
