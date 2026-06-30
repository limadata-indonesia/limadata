import { createClient } from "../../../lib/supabase-server";
import { NextResponse } from "next/server";

const ABOUT_PUBLIC_FIELDS = "hero_tagline, hero_title, hero_description, mission, vision, values, team, content_html";

const ABOUT_WRITE_FIELDS = [
  "hero_tagline", "hero_title", "hero_description",
  "mission", "vision", "values", "team", "content_html",
];

function pick(body, fields) {
  return Object.fromEntries(fields.filter(k => k in body).map(k => [k, body[k]]));
}

export async function GET() {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("about_page")
      .select(ABOUT_PUBLIC_FIELDS)
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
    .upsert({ ...pick(body, ABOUT_WRITE_FIELDS), id: 1, updated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
