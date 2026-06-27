import { createClient } from "../../../../lib/supabase-server";
import AboutForm from "./AboutForm";

export default async function Page() {
  let initial = null;
  try {
    const supabase = createClient();
    const { data } = await supabase.from("about_page").select("*").eq("id", 1).single();
    initial = data;
  } catch (_) {}

  return <AboutForm initial={initial} />;
}
