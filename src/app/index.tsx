import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/Button";
import { usePlan } from "../context/PlanContext";
import { colors, radius, spacing } from "../theme";

export default function Inicio() {
  const router = useRouter();
  const { reiniciar } = usePlan();

  const comecar = () => {
    reiniciar();
    router.push("/configuracao");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Image
          source={require("../../assets/images/dogao.png")}
          style={styles.logo}
          resizeMode="cover"
        />
        <Text style={styles.title}>Nada pra comer{"\n"}nessa casa</Text>
        <Text style={styles.subtitle}>
          Geladeira vazia? Conte o que você tem, quanto quer gastar e a gente
          monta o cardápio e a lista de compras.
        </Text>
      </View>
      <Button title="Montar meu cardápio" onPress={comecar} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    padding: spacing.lg,
    justifyContent: "space-between",
  },
  hero: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.md,
  },
  logo: {
    width: 104,
    height: 104,
    borderRadius: radius.lg + 12,
    backgroundColor: colors.darkGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: colors.darkGreen,
    textAlign: "center",
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 23,
    paddingHorizontal: spacing.md,
  },
});
