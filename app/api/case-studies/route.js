import { createClient } from "../../../lib/supabase-server";
import { NextResponse } from "next/server";

const CASE_STUDY_FIELDS = [
  "company", "abbr", "slug", "description", "change", "service",
  "bg", "dot", "sort_order", "published",
  "client_about", "challenge", "solution",
  "metrics", "services_list", "timeline",
  "content_html", "hero_image_url",
];

function pick(body, fields) {
  return Object.fromEntries(fields.filter(k => k in body).map(k => [k, body[k]]));
}

export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { data, error } = await supabase
    .from("case_studies")
    .insert(pick(body, CASE_STUDY_FIELDS))
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
