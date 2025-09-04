import AuthScreen from "@/app/(auth)/Auth";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function Index() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    // Initial session fetch
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) router.replace("/(tabs)");
    });

    // Listen for session changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) {
          router.replace("/(tabs)");
        } else {
          router.replace("/(auth)/Auth");
        }
      }
    );

    return () => subscription.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    // Still checking session
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If no session → show auth screen
  return <AuthScreen />;
}
