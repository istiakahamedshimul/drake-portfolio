import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, projects: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, categories, imageUrl, projectUrl, isWide, orderIndex } = body;

    if (!title || !imageUrl) {
      return NextResponse.json(
        { success: false, error: "Title and Image URL are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("projects")
      .insert([
        {
          title,
          slug: slug || title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
          categories: Array.isArray(categories) ? categories : [],
          image_url: imageUrl,
          project_url: projectUrl || "#",
          is_wide: Boolean(isWide),
          order_index: typeof orderIndex === "number" ? orderIndex : 10,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, project: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, slug, categories, imageUrl, projectUrl, isWide, orderIndex } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Project ID is required" }, { status: 400 });
    }

    const updateData: Record<string, any> = {};
    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (categories !== undefined) updateData.categories = categories;
    if (imageUrl !== undefined) updateData.image_url = imageUrl;
    if (projectUrl !== undefined) updateData.project_url = projectUrl;
    if (isWide !== undefined) updateData.is_wide = Boolean(isWide);
    if (orderIndex !== undefined) updateData.order_index = orderIndex;

    const { data, error } = await supabaseAdmin
      .from("projects")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, project: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Project ID is required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("projects").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
