import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Account from "../components/Account";
import Auth from "../components/Auth";
import { supabase } from "../lib/supabase";

export default function Index() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));

    const { data } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    );

    return () => data.subscription.unsubscribe();
  }, []);

  if (session === undefined) return <View style={{ flex: 1 }} />; // loading

  return session && session.user ? <Account session={session} /> : <Auth />;
}
