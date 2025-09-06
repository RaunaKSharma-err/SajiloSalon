import NetInfo from "@react-native-community/netinfo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { TransactionProvider } from "@/hooks/useTransactionStore";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: "Back",
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [isConnected, setIsConnected] = useState(true);
  const [checking, setChecking] = useState(false);
  // Listener to auto-update on connectivity change
  useEffect(() => {
    SplashScreen.hideAsync();

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(!!state.isConnected && !!state.isInternetReachable);
    });

    return () => unsubscribe();
  }, []);

  // Manual retry function
  const handleRetry = async () => {
    const state = await NetInfo.fetch();
    setIsConnected(!!state.isConnected && !!state.isInternetReachable);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TransactionProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          {!isConnected ? (
            <View style={styles.errorScreen}>
              <Text style={styles.errorTitle}>No Internet Connection</Text>
              <Text style={styles.errorMessage}>
                Please check your connection and try again.
              </Text>

              <TouchableOpacity
                style={styles.retryButton}
                onPress={handleRetry}
                disabled={checking}
              >
                {checking ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.retryText}>Try Again</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <RootLayoutNav />
          )}
        </GestureHandlerRootView>
      </TransactionProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  errorScreen: {
    flex: 1,
    backgroundColor: "#fff0f0",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#990000",
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  retryButton: {
    backgroundColor: "#990000",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
