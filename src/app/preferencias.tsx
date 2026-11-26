import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Chip } from "../components/Chip";
import { Screen, SectionTitle } from "../components/Screen";
import { usePlan } from "../context/PlanContext";
import { colors, radius, spacing } from "../theme";

const PADROES = ["Onívoro", "Vegetariano", "Vegano"];
const DIETAS = ["Equilibrada", "Alta proteína", "Low carb"];
const ALERGIAS = [
  "Glúten",
  "Trigo",
  "Lactose",
  "Leite de vaca",
  "Ovo",
  "Amendoim",
  "Castanhas e nozes",
  "Soja",
  "Peixe",
  "Frutos do mar",
  "Gergelim",
  "Milho",
];
const ELETROS = [
  "Fogão",
  "Forno",
  "Micro-ondas",
  "Airfryer",
  "Liquidificador",
  "Panela de pressão",
];

interface Item {
  nome: string;
  emoji: string;
}

const DESPENSA: { categoria: string; itens: Item[] }[] = [
  {
    categoria: "Carnes e proteínas",
    itens: [
      { nome: "Frango", emoji: "🍗" },
      { nome: "Carne bovina", emoji: "🥩" },
      { nome: "Carne moída", emoji: "🍖" },
      { nome: "Linguiça", emoji: "🌭" },
      { nome: "Bacon", emoji: "🥓" },
      { nome: "Peixe", emoji: "🐟" },
      { nome: "Ovos", emoji: "🥚" },
      { nome: "Atum em lata", emoji: "🥫" },
    ],
  },
  {
    categoria: "Hortifruti",
    itens: [
      { nome: "Tomate", emoji: "🍅" },
      { nome: "Cebola", emoji: "🧅" },
      { nome: "Alho", emoji: "🧄" },
      { nome: "Batata", emoji: "🥔" },
      { nome: "Cenoura", emoji: "🥕" },
      { nome: "Alface", emoji: "🥬" },
      { nome: "Brócolis", emoji: "🥦" },
      { nome: "Abobrinha", emoji: "🥒" },
      { nome: "Milho", emoji: "🌽" },
      { nome: "Limão", emoji: "🍋" },
      { nome: "Banana", emoji: "🍌" },
      { nome: "Maçã", emoji: "🍎" },
    ],
  },
  {
    categoria: "Laticínios",
    itens: [
      { nome: "Leite", emoji: "🥛" },
      { nome: "Queijo", emoji: "🧀" },
      { nome: "Manteiga", emoji: "🧈" },
      { nome: "Iogurte", emoji: "🍦" },
      { nome: "Requeijão", emoji: "🥣" },
      { nome: "Creme de leite", emoji: "🥫" },
    ],
  },
  {
    categoria: "Mercearia",
    itens: [
      { nome: "Arroz", emoji: "🍚" },
      { nome: "Feijão", emoji: "🫘" },
      { nome: "Macarrão", emoji: "🍝" },
      { nome: "Farinha de trigo", emoji: "🌾" },
      { nome: "Farinha de mandioca", emoji: "🥣" },
      { nome: "Aveia", emoji: "🥣" },
      { nome: "Pão", emoji: "🍞" },
      { nome: "Açúcar", emoji: "🍬" },
      { nome: "Café", emoji: "☕" },
      { nome: "Molho de tomate", emoji: "🥫" },
    ],
  },
  {
    categoria: "Temperos",
    itens: [
      { nome: "Sal", emoji: "🧂" },
      { nome: "Pimenta-do-reino", emoji: "⚫" },
      { nome: "Orégano", emoji: "🌿" },
      { nome: "Cheiro-verde", emoji: "🌱" },
      { nome: "Colorau", emoji: "🌶️" },
      { nome: "Cominho", emoji: "🟤" },
      { nome: "Louro", emoji: "🍃" },
      { nome: "Páprica", emoji: "🌶️" },
    ],
  },
  {
    categoria: "Óleos e molhos",
    itens: [
      { nome: "Óleo de soja", emoji: "🛢️" },
      { nome: "Azeite", emoji: "🫒" },
      { nome: "Vinagre", emoji: "🍶" },
      { nome: "Molho de soja", emoji: "🥢" },
      { nome: "Maionese", emoji: "🥚" },
      { nome: "Ketchup", emoji: "🍅" },
    ],
  },
];

const alternar = (lista: string[], item: string) =>
  lista.includes(item) ? lista.filter((x) => x !== item) : [...lista, item];

export default function Preferencias() {
  const router = useRouter();
  const { plano, atualizar, gerar } = usePlan();

  return (
    <Screen>
      <SectionTitle>O que você tem em casa</SectionTitle>
      <Text style={styles.hint}>Toque nos itens que você já tem.</Text>

      {DESPENSA.map((grupo) => (
        <View key={grupo.categoria} style={{ gap: spacing.sm }}>
          <Text style={styles.categoria}>{grupo.categoria}</Text>
          <View style={styles.grid}>
            {grupo.itens.map((item) => {
              const ativo = plano.alimentosCasa.includes(item.nome);
              return (
                <Pressable
                  key={item.nome}
                  onPress={() =>
                    atualizar({
                      alimentosCasa: alternar(plano.alimentosCasa, item.nome),
                    })
                  }
                  style={[styles.card, ativo && styles.cardAtivo]}
                >
                  <Text style={styles.emoji}>{item.emoji}</Text>
                  <Text
                    style={[styles.cardTexto, ativo && { color: colors.white }]}
                    numberOfLines={2}
                  >
                    {item.nome}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}

      <Text style={styles.contador}>
        {plano.alimentosCasa.length} item(ns) selecionado(s)
      </Text>

      <SectionTitle>Padrão alimentar</SectionTitle>
      <View style={styles.wrap}>
        {PADROES.map((p) => (
          <Chip
            key={p}
            label={p}
            selected={plano.padrao === p}
            onPress={() => atualizar({ padrao: p })}
          />
        ))}
      </View>

      <SectionTitle>Estilo de dieta</SectionTitle>
      <View style={styles.wrap}>
        {DIETAS.map((d) => (
          <Chip
            key={d}
            label={d}
            selected={plano.dieta === d}
            onPress={() => atualizar({ dieta: d })}
          />
        ))}
      </View>

      <SectionTitle>Alergias e intolerâncias</SectionTitle>
      <View style={styles.wrap}>
        {ALERGIAS.map((a) => (
          <Chip
            key={a}
            label={a}
            selected={plano.alergias.includes(a)}
            onPress={() => atualizar({ alergias: alternar(plano.alergias, a) })}
          />
        ))}
      </View>

      <SectionTitle>Eletrodomésticos</SectionTitle>
      <View style={styles.wrap}>
        {ELETROS.map((e) => (
          <Chip
            key={e}
            label={e}
            selected={plano.eletrodomesticos.includes(e)}
            onPress={() =>
              atualizar({
                eletrodomesticos: alternar(plano.eletrodomesticos, e),
              })
            }
          />
        ))}
      </View>

      <Button
        title="Gerar cardápio"
        onPress={() => {
          gerar();
          router.push("/cardapio");
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  hint: { color: colors.muted, fontSize: 14, marginTop: -spacing.sm },
  categoria: { fontSize: 16, fontWeight: "700", color: colors.text },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  card: {
    width: "31%",
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    alignItems: "center",
    gap: 6,
  },
  cardAtivo: {
    backgroundColor: colors.darkGreen,
    borderColor: colors.darkGreen,
  },
  emoji: { fontSize: 28 },
  cardTexto: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
  },
  contador: { color: colors.darkGreen, fontWeight: "700", textAlign: "right" },
});
