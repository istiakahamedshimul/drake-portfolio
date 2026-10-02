import React from "react";
import "./admin.css";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin Dashboard | Drake Portfolio",
  description: "Manage portfolio content, projects, skills, and contact inquiries.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-body">
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
