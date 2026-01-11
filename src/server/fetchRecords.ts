import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
  throw new Error("VITE_SUPABASE_URL is not defined");
}
if (!supabaseKey) {
  throw new Error("VITE_SUPABASE_PUBLISHABLE_KEY is not defined");
}

export const supabase = createClient<Database>(
  supabaseUrl as string,
  supabaseKey as string
);

export const fetchRecords = async () => {
  const { data, error } = await supabase.from("study-record").select("*");
  if (error) {
    console.error("Fetch error:", error);
    // TODO エラーをモーダル表示にする (component)
  }
  return data;
};
