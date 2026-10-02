"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface AdminShellProps {
  children: React.ReactNode;
}

export const AdminShell: React.FC<AdminShellProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const isLoginPage = pathname === "/admin/login";

  // Check auth and fetch unread message count
  useEffect(() => {
    if (isLoginPage) return;

    const search = typeof window !== "undefined" ? window.location.search : "";
    fetch("/api/admin/auth" + search)
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push("/admin/login");
        }
      })
      .catch(() => {
        router.push("/admin/login");
      });

    // Check unread messages count
    fetch("/api/admin/messages")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.messages)) {
          const unread = data.messages.filter((m: any) => !m.is_read).length;
          setUnreadCount(unread);
        }
      })
      .catch(() => {});
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
    } catch (err) {
      console.error(err);
      router.push("/admin/login");
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: "las la-tachometer-alt" },
    { label: "Profile & Bio", href: "/admin/profile", icon: "las la-user-edit" },
    { label: "Projects", href: "/admin/projects", icon: "las la-folder-open" },
    { label: "Skills", href: "/admin/skills", icon: "las la-shapes" },
    {
      label: "Inquiries",
      href: "/admin/inbox",
      icon: "las la-envelope",
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
  ];

  return (
    <div className="admin-wrapper">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? "open" : ""}`}>
        <Link href="/admin" className="admin-brand">
          <div className="admin-brand-logo">D</div>
          <div className="admin-brand-info">
            <h2>DRAKE</h2>
            <span>Admin Portal</span>
          </div>
        </Link>

        <nav className="admin-nav">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-item ${isActive ? "active" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="admin-nav-badge">{item.badge}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <Link
            href="/"
            target="_blank"
            className="btn-sidebar-secondary"
            rel="noopener noreferrer"
          >
            <i className="las la-external-link-alt"></i>
            <span>View Live Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="btn-sidebar-secondary"
            style={{ color: "#ff6b6b" }}
          >
            <i className="las la-sign-out-alt"></i>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        {/* Mobile toggle button if small screen */}
        <div style={{ display: "none" }} className="admin-mobile-bar">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="admin-btn admin-btn-outline"
            style={{ marginBottom: "16px" }}
          >
            <i className="las la-bars"></i> Menu
          </button>
        </div>

        {children}
      </main>
    </div>
  );
};
