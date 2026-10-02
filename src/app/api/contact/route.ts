import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let fullName = "";
    let email = "";
    let phone = "";
    let subject = "";
    let budget = "";
    let message = "";
    let attachmentUrl = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      fullName = (formData.get("fullName") as string) || "";
      email = (formData.get("email") as string) || "";
      phone = (formData.get("phoneNumber") as string) || "";
      subject = (formData.get("subject") as string) || "";
      budget = (formData.get("budget") as string) || "";
      message = (formData.get("message") as string) || "";

      const file = formData.get("file") as File | null;
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const ext = file.name.split(".").pop() || "dat";
        const fileName = `attachments/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9_-]/g, "_")}.${ext}`;

        const uploadRes = await supabaseAdmin.storage
          .from("portfolio-assets")
          .upload(fileName, buffer, {
            contentType: file.type,
            upsert: true,
          });

        if (!uploadRes.error) {
          const { data: publicUrlData } = supabaseAdmin.storage
            .from("portfolio-assets")
            .getPublicUrl(fileName);
          attachmentUrl = publicUrlData.publicUrl;
        }
      }
    } else {
      const body = await req.json();
      fullName = body.fullName || "";
      email = body.email || "";
      phone = body.phoneNumber || "";
      subject = body.subject || "";
      budget = body.budget || "";
      message = body.message || "";
      attachmentUrl = body.attachmentUrl || "";
    }

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Full name, email, and message are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin.from("contact_messages").insert([
      {
        full_name: fullName,
        email,
        phone: phone || null,
        subject: subject || null,
        budget: budget || null,
        message,
        attachment_url: attachmentUrl || null,
        is_read: false,
      },
    ]).select().single();

    if (error) {
      console.error("Error inserting contact message:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: data });
  } catch (err: any) {
    console.error("Contact API route error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
