import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { Card } from '../../components/Card';
import { Screen, SectionTitle } from '../../components/Screen';
import { usePlan } from '../../context/PlanContext';
import { buscarReceita } from '../../data/recipes';
import { custoReceita, moeda } from '../../utils/cardapio';
import { formatarQuantidade } from '../../utils/lista';
import { colors, radius, spacing } from '../../theme';

export default function DetalheReceita() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { plano } = usePlan();
  const receita = buscarReceita(id);

  if (!receita) {
    return (
      <Screen>
        <Text style={{ color: colors.text }}>Receita não encontrada.</Text>
      </Screen>
    );
  }

  const fator = plano.pessoas / receita.porcoes;
  const n = receita.nutricao;

  return (
    <Screen>
      <Image source={receita.imagem} style={styles.imagem} resizeMode="cover" />
      <Text style={styles.nome}>{receita.nome}</Text>

      <View style={styles.meta}>
        <Meta icone="time-outline" texto={`${receita.tempo} min`} />
        <Meta icone="cash-outline" texto={moeda(custoReceita(receita, plano.pessoas))} />
        <Meta icone="people-outline" texto={`${plano.pessoas} pessoa(s)`} />
      </View>

      <SectionTitle>Ingredientes</SectionTitle>
      <Card style={{ gap: spacing.sm }}>
        {receita.ingredientes.map((ing) => {
          const tem = plano.alimentosCasa.includes(ing.nome);
          return (
            <View key={ing.nome} style={styles.linha}>
              <Text style={styles.ingNome}>
                {ing.nome}
                {tem ? '  ✓ em casa' : ''}
              </Text>
              <Text style={styles.ingQtd}>{formatarQuantidade(ing.quantidade * fator, ing.unidade)}</Text>
            </View>
          );
        })}
      </Card>

      <SectionTitle>Modo de preparo</SectionTitle>
      <Card style={{ gap: spacing.md }}>
        {receita.preparo.map((passo, i) => (
          <View key={i} style={styles.passo}>
            <View style={styles.numero}>
              <Text style={styles.numeroTexto}>{i + 1}</Text>
            </View>
            <Text style={styles.passoTexto}>{passo}</Text>
          </View>
        ))}
      </Card>

      <SectionTitle>Informações nutricionais (por porção)</SectionTitle>
      <View style={styles.nutricao}>
        <Nutri rotulo="Calorias" valor={`${n.kcal} kcal`} />
        <Nutri rotulo="Proteínas" valor={`${n.proteina} g`} />
        <Nutri rotulo="Carboidratos" valor={`${n.carbo} g`} />
        <Nutri rotulo="Gorduras" valor={`${n.gordura} g`} />
      </View>
    </Screen>
  );
}

function Meta({ icone, texto }: { icone: keyof typeof Ionicons.glyphMap; texto: string }) {
  return (
    <View style={styles.metaItem}>
      <Ionicons name={icone} size={18} color={colors.darkGreen} />
      <Text style={styles.metaTexto}>{texto}</Text>
    </View>
  );
}

function Nutri({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <View style={styles.nutriCard}>
      <Text style={styles.nutriValor}>{valor}</Text>
      <Text style={styles.nutriRotulo}>{rotulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imagem: { width: '100%', height: 220, borderRadius: radius.lg },
  nome: { fontSize: 24, fontWeight: '800', color: colors.darkGreen },
  meta: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaTexto: { color: colors.text, fontWeight: '600' },
  linha: { flexDirection: 'row', justifyContent: 'space-between' },
  ingNome: { color: colors.text, fontSize: 15, flexShrink: 1 },
  ingQtd: { color: colors.darkGreen, fontSize: 15, fontWeight: '700' },
  passo: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  numero: {
    width: 26, height: 26, borderRadius: 13, backgroundColor: colors.darkGreen,
    alignItems: 'center', justifyContent: 'center',
  },
  numeroTexto: { color: colors.white, fontWeight: '700', fontSize: 13 },
  passoTexto: { flex: 1, color: colors.text, fontSize: 15, lineHeight: 22 },
  nutricao: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  nutriCard: {
    width: '48%', backgroundColor: colors.lightGreen, borderRadius: radius.md,
    padding: spacing.md, alignItems: 'center',
  },
  nutriValor: { fontSize: 18, fontWeight: '800', color: colors.darkGreen },
  nutriRotulo: { fontSize: 12, color: colors.muted, fontWeight: '600' },
});
