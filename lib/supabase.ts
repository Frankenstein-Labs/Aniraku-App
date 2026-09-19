import "react-native-url-polyfill/auto";
import { AppState, Platform } from "react-native";
import { createClient } from "@supabase/supabase-js";
import { APP_CONFIG } from "@/lib/app-config";
import { secureStorage } from "@/lib/secure-storage";

// Public browsing and playback do not require Supabase. Keep the client
// constructible for preview builds that intentionally omit account secrets;
// authenticated operations still use the real project whenever both public
// variables are present in the build environment.
const supabaseUrl = APP_CONFIG.supabaseUrl || "https://preview-placeholder.supabase.co";
const supabaseAnonKey = APP_CONFIG.supabaseAnonKey || "preview-placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: secureStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === "web",
    flowType: "pkce",
  },
});

if (Platform.OS !== "web") {
  AppState.addEventListener("change", (state) => {
    if (state === "active") supabase.auth.startAutoRefresh();
    else supabase.auth.stopAutoRefresh();
  });
}
