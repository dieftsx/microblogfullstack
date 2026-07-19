import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";
import type { Database } from "../types/database.types";

let supabaseClient: ReturnType<typeof createSupabaseBrowserClient<Database>> | null =
  null;

export function createBrowserClient() {
  if (supabaseClient === null) {
    supabaseClient = createSupabaseBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    );
  }
  return supabaseClient;
}
