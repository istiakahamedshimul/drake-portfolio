import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.from("profiles").select("*").limit(1).single();
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, profile: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    // Updates to snake_case mapping
    const dbPayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (updates.name !== undefined) dbPayload.name = updates.name;
    if (updates.designation !== undefined) dbPayload.designation = updates.designation;
    if (updates.heroGreeting !== undefined) dbPayload.hero_greeting = updates.heroGreeting;
    if (updates.heroRole !== undefined) dbPayload.hero_role = updates.heroRole;
    if (updates.heroBio !== undefined) dbPayload.hero_bio = updates.heroBio;
    if (updates.aboutStory !== undefined) dbPayload.about_story = updates.aboutStory;
    if (updates.email !== undefined) dbPayload.email = updates.email;
    if (updates.phone !== undefined) dbPayload.phone = updates.phone;
    if (updates.address !== undefined) dbPayload.address = updates.address;
    if (updates.copyright !== undefined) dbPayload.copyright = updates.copyright;
    if (updates.avatarUrl !== undefined) dbPayload.avatar_url = updates.avatarUrl;
    if (updates.logoUrl !== undefined) dbPayload.logo_url = updates.logoUrl;
    if (updates.socials !== undefined) dbPayload.socials = updates.socials;
    if (updates.stats !== undefined) dbPayload.stats = updates.stats;

    // Update the single profile record
    let query = supabaseAdmin.from("profiles");
    let result;
    if (id) {
      result = await query.update(dbPayload).eq("id", id).select().single();
    } else {
      // Find the first row id
      const { data: first } = await supabaseAdmin.from("profiles").select("id").limit(1).single();
      if (first) {
        result = await query.update(dbPayload).eq("id", first.id).select().single();
      } else {
        result = await query.insert([dbPayload]).select().single();
      }
    }

    if (result.error) {
      return NextResponse.json({ success: false, error: result.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, profile: result.data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
