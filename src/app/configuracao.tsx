import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Chip } from '../components/Chip';
import { Screen, SectionTitle } from '../components/Screen';
import { Stepper } from '../components/Stepper';
import { usePlan } from '../context/PlanContext';
import { Refeicao } from '../types';
import { colors, radius, spacing } from '../theme';

const REFEICOES: Refeicao[] = ['Café da manhã', 'Almoço', 'Lanche', 'Jantar'];

export default function Configuracao() {
  const router = useRouter();
  const { plano, atualizar } = usePlan();

  const alternarRefeicao = (r: Refeicao) => {
    const existe = plano.refeicoes.includes(r);
    atualizar({
      refeicoes: existe ? plano.refeicoes.filter((x) => x !== r) : [...plano.refeicoes, r],
    });
  };

  const orcamentoValido = Number(plano.orcamento.replace(',', '.')) > 0;
  const podeContinuar = orcamentoValido && plano.refeicoes.length > 0;

  return (
    <Screen>
      <Card style={{ gap: spacing.md }}>
        <Stepper label="Pessoas" value={plano.pessoas} onChange={(v) => atualizar({ pessoas: v })} />
        <Stepper label="Dias" value={plano.dias} onChange={(v) => atualizar({ dias: v })} />
      </Card>

      <SectionTitle>Refeições</SectionTitle>
      <View style={styles.wrap}>
        {REFEICOES.map((r) => (
          <Chip key={r} label={r} selected={plano.refeicoes.includes(r)} onPress={() => alternarRefeicao(r)} />
        ))}
      </View>

      <SectionTitle>Orçamento</SectionTitle>
      <View style={styles.inputRow}>
        <Text style={styles.prefix}>R$</Text>
        <TextInput
          style={styles.input}
          value={plano.orcamento}
          onChangeText={(t) => atualizar({ orcamento: t.replace(/[^0-9.,]/g, '') })}
          placeholder="Quanto pretende gastar?"
          placeholderTextColor={colors.muted}
          keyboardType="decimal-pad"
        />
      </View>

      <Button title="Continuar" onPress={() => router.push('/preferencias')} disabled={!podeContinuar} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.md,
  },
  prefix: { fontSize: 18, fontWeight: '700', color: colors.darkGreen, marginRight: spacing.sm },
  input: { flex: 1, paddingVertical: 14, fontSize: 16, color: colors.text },
});
