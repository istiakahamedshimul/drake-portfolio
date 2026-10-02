import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!serviceRoleKey && typeof window === "undefined") {
  console.warn("SUPABASE_SERVICE_ROLE_KEY is not defined in environment variables");
}

// Server-side admin client that bypasses RLS for administrative tasks
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
