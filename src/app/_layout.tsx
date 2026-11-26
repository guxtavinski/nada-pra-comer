import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PlanProvider } from '../context/PlanContext';
import { colors } from '../theme';

export default function RootLayout() {
  return (
    <PlanProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.cream },
          headerTintColor: colors.darkGreen,
          headerShadowVisible: false,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: colors.cream },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="configuracao" options={{ title: 'Configuração' }} />
        <Stack.Screen name="preferencias" options={{ title: 'Preferências' }} />
        <Stack.Screen name="cardapio" options={{ title: 'Meu cardápio' }} />
        <Stack.Screen name="receita/[id]" options={{ title: 'Receita' }} />
        <Stack.Screen name="lista-compras" options={{ title: 'Lista de compras' }} />
      </Stack>
    </PlanProvider>
  );
}
