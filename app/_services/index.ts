import { createClient } from "@supabase/supabase-js";
import { env } from "process";

const { SUPABASE_URL, SUPABASE_PUBLIC_KEY } = env;

// Create a single supabase client for interacting with your database
export const supabase =
  SUPABASE_URL && SUPABASE_PUBLIC_KEY
    ? createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY)
    : null;
