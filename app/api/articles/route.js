import { createClient } from "../../../lib/supabase-server";
import { NextResponse } from "next/server";

const ARTICLE_FIELDS = [
  "slug", "category", "title", "excerpt", "date", "read_time",
  "author_name", "author_initials", "author_role",
  "content", "content_html", "published",
  "focus_keyword", "meta_title", "meta_description",
];

function pick(body, fields) {
  return Object.fromEntries(fields.filter(k => k in body).map(k => [k, body[k]]));
}

export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { data, error } = await supabase
    .from("articles")
    .insert(pick(body, ARTICLE_FIELDS))
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
