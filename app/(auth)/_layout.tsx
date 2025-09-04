import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" options={{ headerShown: false }} />
    </Stack>
  );
}
