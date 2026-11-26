import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { RecipeCard } from '../components/RecipeCard';
import { SectionTitle } from '../components/Screen';
import { usePlan } from '../context/PlanContext';
import { buscarReceita } from '../data/recipes';
import { custoTotal, moeda } from '../utils/cardapio';
import { colors, spacing } from '../theme';

export default function Cardapio() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { plano, cardapio, trocar } = usePlan();

  if (!cardapio.length) {
    return (
      <View style={styles.vazio}>
        <Text style={styles.vazioTitulo}>Nenhuma receita compatível</Text>
        <Text style={styles.vazioTexto}>
          Não encontramos receitas para as suas preferências. Volte e ajuste padrão alimentar, alergias ou eletrodomésticos.
        </Text>
        <Button title="Voltar às preferências" onPress={() => router.back()} />
      </View>
    );
  }

  const total = custoTotal(cardapio, plano.pessoas);
  const limite = Number(plano.orcamento.replace(',', '.'));
  const estourou = total > limite;
  const dias = Array.from({ length: plano.dias }, (_, i) => i + 1);

  const aoTrocar = (slotId: string) => {
    if (!trocar(slotId)) {
      Alert.alert('Sem outra opção', 'Não há outra receita compatível para essa refeição.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Card style={{ gap: 6 }}>
          <Text style={styles.resumoRotulo}>Custo estimado</Text>
          <Text style={[styles.resumoValor, estourou && { color: colors.accent }]}>{moeda(total)}</Text>
          <Text style={styles.resumoRotulo}>
            Orçamento: {moeda(limite)} • {plano.pessoas} pessoa(s) • {plano.dias} dia(s)
          </Text>
          {estourou && (
            <Text style={{ color: colors.accent, fontWeight: '600' }}>
              Passou do orçamento. Tente trocar alguma receita por uma mais barata.
            </Text>
          )}
        </Card>

        {dias.map((dia) => (
          <View key={dia} style={{ gap: spacing.md }}>
            <SectionTitle>{`Dia ${dia}`}</SectionTitle>
            {cardapio
              .filter((s) => s.dia === dia)
              .map((slot) => {
                const receita = buscarReceita(slot.receitaId);
                if (!receita) return null;
                return (
                  <RecipeCard
                    key={slot.id}
                    receita={receita}
                    refeicao={slot.refeicao}
                    pessoas={plano.pessoas}
                    onVer={() => router.push(`/receita/${receita.id}`)}
                    onTrocar={() => aoTrocar(slot.id)}
                  />
                );
              })}
          </View>
        ))}
      </ScrollView>

      <View style={[styles.rodape, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
        <Button title="Ver lista de compras" onPress={() => router.push('/lista-compras')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteudo: { padding: spacing.md, gap: spacing.lg, paddingBottom: spacing.xl },
  resumoRotulo: { color: colors.muted, fontSize: 13, fontWeight: '600' },
  resumoValor: { color: colors.darkGreen, fontSize: 30, fontWeight: '800' },
  rodape: { padding: spacing.md, backgroundColor: colors.cream, borderTopWidth: 1, borderTopColor: colors.border },
  vazio: { flex: 1, padding: spacing.lg, justifyContent: 'center', gap: spacing.md, backgroundColor: colors.cream },
  vazioTitulo: { fontSize: 22, fontWeight: '800', color: colors.darkGreen, textAlign: 'center' },
  vazioTexto: { fontSize: 15, color: colors.muted, textAlign: 'center', lineHeight: 22 },
});
