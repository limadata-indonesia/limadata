import { createClient } from "../../../lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("about_page")
      .select("*")
      .eq("id", 1)
      .single();
    return NextResponse.json(data ?? {});
  } catch (_) {
    return NextResponse.json({});
  }
}

export async function PUT(request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { data, error } = await supabase
    .from("about_page")
    .upsert({ ...body, id: 1, updated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
