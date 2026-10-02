import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASS = process.env.ADMIN_PASSWORD || "drake2024";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (password === ADMIN_PASS || password === process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({ success: true, message: "Authenticated successfully" });
    }

    return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return NextResponse.json({ success: true, message: "Logged out" });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  const cookieStore = await cookies();

  if (key === ADMIN_PASS || key === process.env.SUPABASE_SERVICE_ROLE_KEY) {
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return NextResponse.json({ authenticated: true });
  }

  const session = cookieStore.get("admin_session");
  const isAuthenticated = session?.value === "authenticated";
  return NextResponse.json({ authenticated: isAuthenticated });
}
