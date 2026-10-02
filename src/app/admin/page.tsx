"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface DashboardStats {
  projectsCount: number;
  skillsCount: number;
  totalMessages: number;
  unreadMessages: number;
}

interface Message {
  id: string;
  full_name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    projectsCount: 0,
    skillsCount: 0,
    totalMessages: 0,
    unreadMessages: 0,
  });
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [projRes, skillRes, msgRes] = await Promise.all([
          fetch("/api/admin/projects"),
          fetch("/api/admin/skills"),
          fetch("/api/admin/messages"),
        ]);

        const projData = await projRes.json();
        const skillData = await skillRes.json();
        const msgData = await msgRes.json();

        const messages: Message[] = msgData.messages || [];
        const unread = messages.filter((m) => !m.is_read).length;

        setStats({
          projectsCount: projData.projects?.length || 0,
          skillsCount: skillData.skills?.length || 0,
          totalMessages: messages.length,
          unreadMessages: unread,
        });

        setRecentMessages(messages.slice(0, 5));
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead: true }),
      });
      setRecentMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
      );
      setStats((prev) => ({
        ...prev,
        unreadMessages: Math.max(0, prev.unreadMessages - 1),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* Top Header */}
      <div className="admin-header">
        <div className="admin-header-title">
          <h1>Dashboard Overview</h1>
          <p>Real-time analytics and portfolio management</p>
        </div>
        <div className="admin-header-actions">
          <Link href="/admin/projects" className="admin-btn admin-btn-primary">
            <i className="las la-plus"></i> Add Project
          </Link>
          <Link href="/admin/profile" className="admin-btn admin-btn-outline">
            <i className="las la-user-edit"></i> Edit Profile
          </Link>
        </div>
      </div>

      {/* Supabase Status Banner */}
      <div
        style={{
          background: "rgba(40, 233, 140, 0.08)",
          border: "1px solid rgba(40, 233, 140, 0.25)",
          borderRadius: "12px",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "28px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#28e98c",
              boxShadow: "0 0 10px #28e98c",
            }}
          />
          <span style={{ fontSize: "13px", color: "#e0e0e0", fontWeight: 500 }}>
            Supabase Cloud Connected &bull; Storage Bucket: <strong>portfolio-assets</strong>
          </span>
        </div>
        <span
          style={{
            fontSize: "11px",
            color: "#28e98c",
            textTransform: "uppercase",
            fontWeight: 700,
            letterSpacing: "1px",
          }}
        >
          Active & Synced
        </span>
      </div>

      {/* Metric Cards */}
      <div className="admin-metrics-grid">
        <Link href="/admin/projects" style={{ textDecoration: "none" }}>
          <div className="admin-metric-card">
            <div className="admin-metric-icon">
              <i className="las la-folder"></i>
            </div>
            <div className="admin-metric-info">
              <h3>{loading ? "..." : stats.projectsCount}</h3>
              <span>Active Projects</span>
            </div>
          </div>
        </Link>

        <Link href="/admin/skills" style={{ textDecoration: "none" }}>
          <div className="admin-metric-card">
            <div className="admin-metric-icon">
              <i className="las la-shapes"></i>
            </div>
            <div className="admin-metric-info">
              <h3>{loading ? "..." : stats.skillsCount}</h3>
              <span>Configured Skills</span>
            </div>
          </div>
        </Link>

        <Link href="/admin/inbox" style={{ textDecoration: "none" }}>
          <div className="admin-metric-card">
            <div className="admin-metric-icon">
              <i className="las la-envelope"></i>
            </div>
            <div className="admin-metric-info">
              <h3>{loading ? "..." : stats.totalMessages}</h3>
              <span>Total Inquiries</span>
            </div>
          </div>
        </Link>

        <Link href="/admin/inbox" style={{ textDecoration: "none" }}>
          <div className="admin-metric-card">
            <div
              className="admin-metric-icon"
              style={{
                background: stats.unreadMessages > 0 ? "rgba(255, 79, 79, 0.15)" : undefined,
                color: stats.unreadMessages > 0 ? "#ff4f4f" : undefined,
              }}
            >
              <i className="las la-bell"></i>
            </div>
            <div className="admin-metric-info">
              <h3 style={{ color: stats.unreadMessages > 0 ? "#ff6b6b" : undefined }}>
                {loading ? "..." : stats.unreadMessages}
              </h3>
              <span>Unread Messages</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Contact Inquiries */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>
            <i className="las la-inbox" style={{ color: "#28e98c" }}></i>
            Recent Contact Inquiries
          </h2>
          <Link
            href="/admin/inbox"
            style={{ fontSize: "13px", color: "#28e98c", textDecoration: "none", fontWeight: 600 }}
          >
            View All ({stats.totalMessages}) &rarr;
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <div style={{ textAlign: "center", padding: "36px 0", color: "#777", fontSize: "14px" }}>
            <i className="las la-comment-slash" style={{ fontSize: "36px", display: "block", marginBottom: "10px", opacity: 0.5 }}></i>
            No contact inquiries yet. When visitors fill out your contact form, they will appear here!
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Sender</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentMessages.map((msg) => (
                  <tr key={msg.id}>
                    <td>
                      {msg.is_read ? (
                        <span style={{ fontSize: "11px", color: "#666", padding: "3px 8px", background: "rgba(255,255,255,0.05)", borderRadius: "6px" }}>
                          Read
                        </span>
                      ) : (
                        <span style={{ fontSize: "11px", color: "#28e98c", padding: "3px 8px", background: "rgba(40, 233, 140, 0.15)", borderRadius: "6px", fontWeight: 700 }}>
                          NEW
                        </span>
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: "#fff" }}>{msg.full_name}</div>
                      <div style={{ fontSize: "12px", color: "#888" }}>{msg.email}</div>
                    </td>
                    <td style={{ color: "#ccc" }}>{msg.subject || "General Inquiry"}</td>
                    <td style={{ color: "#888", fontSize: "13px" }}>
                      {new Date(msg.created_at).toLocaleDateString()}
                    </td>
                    <td>
                      {!msg.is_read && (
                        <button
                          onClick={() => markAsRead(msg.id)}
                          className="admin-btn admin-btn-outline"
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                        >
                          Mark Read
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
