import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://cctnqzkxcufpsisfjhvf.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjdG5xemt4Y3VmcHNpc2ZqaHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQwOTk3MDYsImV4cCI6MjAwOTY3NTcwNn0.8R-k43x9een0Vvih-9Z6aVwoKwgBkLuieMH3_4MZi_M";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
