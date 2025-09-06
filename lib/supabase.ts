import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl ="https://jsanjctcpzmtrfboxome.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzYW5qY3RjcHptdHJmYm94b21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMzE2OTEsImV4cCI6MjA3MTcwNzY5MX0.fBojDEHlheULJxjrnqsdYzfq_3cXxxQ3HHFrmssDwFA"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
//supabase info