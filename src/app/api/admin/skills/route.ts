import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("skills")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, skills: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, percent, iconUrl, orderIndex } = body;

    if (!name || percent === undefined) {
      return NextResponse.json(
        { success: false, error: "Name and Percentage are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("skills")
      .insert([
        {
          name,
          percent: Number(percent),
          icon_url: iconUrl || "/assets/images/figma.png",
          order_index: typeof orderIndex === "number" ? orderIndex : 10,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, skill: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, percent, iconUrl, orderIndex } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Skill ID is required" }, { status: 400 });
    }

    const updateData: Record<string, any> = {};
    if (name !== undefined) updateData.name = name;
    if (percent !== undefined) updateData.percent = Number(percent);
    if (iconUrl !== undefined) updateData.icon_url = iconUrl;
    if (orderIndex !== undefined) updateData.order_index = orderIndex;

    const { data, error } = await supabaseAdmin
      .from("skills")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, skill: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Skill ID is required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("skills").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Skill deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
