import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://exompwzaiobmsbxmircf.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4b21wd3phaW9ibXNieG1pcmNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwOTY0NzcsImV4cCI6MjA0ODY3MjQ3N30.7oiMnwNj-s1cZF7Ff2xfgEhdQ4pUImz-gaSIczsJC7I";

const db = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    db.auth.startAutoRefresh();
  } else {
    db.auth.stopAutoRefresh();
  }
});

export default db;
