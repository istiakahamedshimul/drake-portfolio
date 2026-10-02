"use client";

import React, { useEffect, useState } from "react";

interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  subject?: string;
  budget?: string;
  message: string;
  attachment_url?: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminInboxPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    try {
      await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead: !currentStatus }),
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: !currentStatus } : m))
      );
      if (selectedMessage?.id === id) {
        setSelectedMessage((prev) => (prev ? { ...prev, is_read: !currentStatus } : null));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (filter === "unread") return !m.is_read;
    if (filter === "read") return m.is_read;
    return true;
  });

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div>
      <div className="admin-header">
        <div className="admin-header-title">
          <h1>Contact Inquiries & Inbox</h1>
          <p>Read and manage client project requests submitted through your website</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setFilter("all")}
            className={`admin-btn ${filter === "all" ? "admin-btn-primary" : "admin-btn-outline"}`}
            style={{ padding: "8px 16px", fontSize: "13px" }}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`admin-btn ${filter === "unread" ? "admin-btn-primary" : "admin-btn-outline"}`}
            style={{ padding: "8px 16px", fontSize: "13px" }}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`admin-btn ${filter === "read" ? "admin-btn-primary" : "admin-btn-outline"}`}
            style={{ padding: "8px 16px", fontSize: "13px" }}
          >
            Read ({messages.length - unreadCount})
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>
          Loading messages from Supabase...
        </div>
      ) : messages.length === 0 ? (
        <div className="admin-card" style={{ textAlign: "center", padding: "50px 20px" }}>
          <i className="las la-inbox" style={{ fontSize: "52px", color: "#444", marginBottom: "16px", display: "block" }}></i>
          <h3 style={{ color: "#fff", marginBottom: "8px" }}>Inbox Empty</h3>
          <p style={{ color: "#888" }}>Messages sent via the contact form on your portfolio will be stored here.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: selectedMessage ? "1fr 1fr" : "1fr", gap: "24px" }}>
          {/* Messages List */}
          <div className="admin-card" style={{ padding: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {filteredMessages.map((msg) => {
                const isSelected = selectedMessage?.id === msg.id;
                return (
                  <div
                    key={msg.id}
                    onClick={() => {
                      setSelectedMessage(msg);
                      if (!msg.is_read) toggleReadStatus(msg.id, false);
                    }}
                    style={{
                      padding: "16px",
                      borderRadius: "12px",
                      background: isSelected
                        ? "rgba(40, 233, 140, 0.08)"
                        : msg.is_read
                        ? "rgba(255, 255, 255, 0.02)"
                        : "rgba(255, 255, 255, 0.05)",
                      border: `1px solid ${
                        isSelected
                          ? "#28e98c"
                          : msg.is_read
                          ? "rgba(255, 255, 255, 0.04)"
                          : "rgba(40, 233, 140, 0.3)"
                      }`,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {!msg.is_read && (
                          <span
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: "#28e98c",
                              boxShadow: "0 0 8px #28e98c",
                            }}
                          />
                        )}
                        <strong style={{ color: "#fff", fontSize: "15px" }}>{msg.full_name}</strong>
                      </div>
                      <span style={{ fontSize: "12px", color: "#777" }}>
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div style={{ fontSize: "13px", color: "#28e98c", marginBottom: "6px" }}>
                      {msg.subject || "General Inquiry"}
                      {msg.budget && <span style={{ color: "#aaa", marginLeft: "8px" }}>&bull; Budget: ${msg.budget}</span>}
                    </div>

                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        color: "#999",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {msg.message}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Message Detail Card */}
          {selectedMessage && (
            <div className="admin-card" style={{ position: "sticky", top: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "20px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  paddingBottom: "16px",
                }}
              >
                <div>
                  <h2 style={{ fontSize: "20px", margin: "0 0 6px 0", color: "#fff" }}>
                    {selectedMessage.full_name}
                  </h2>
                  <div style={{ fontSize: "13px", color: "#888" }}>
                    <a href={`mailto:${selectedMessage.email}`} style={{ color: "#28e98c", textDecoration: "none" }}>
                      {selectedMessage.email}
                    </a>
                    {selectedMessage.phone && <span> &bull; {selectedMessage.phone}</span>}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => toggleReadStatus(selectedMessage.id, selectedMessage.is_read)}
                    className="admin-btn admin-btn-outline"
                    style={{ padding: "6px 12px", fontSize: "12px" }}
                  >
                    {selectedMessage.is_read ? "Mark Unread" : "Mark Read"}
                  </button>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="admin-btn admin-btn-danger"
                    style={{ padding: "6px 12px", fontSize: "12px" }}
                  >
                    <i className="las la-trash"></i>
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <span style={{ fontSize: "12px", color: "#666", textTransform: "uppercase" }}>Subject:</span>
                <div style={{ fontSize: "15px", color: "#fff", fontWeight: 600, marginTop: "2px" }}>
                  {selectedMessage.subject || "Not specified"}
                </div>
              </div>

              {selectedMessage.budget && (
                <div style={{ marginBottom: "16px" }}>
                  <span style={{ fontSize: "12px", color: "#666", textTransform: "uppercase" }}>Budget:</span>
                  <div style={{ fontSize: "15px", color: "#28e98c", fontWeight: 600, marginTop: "2px" }}>
                    ${selectedMessage.budget}
                  </div>
                </div>
              )}

              <div style={{ marginBottom: "24px" }}>
                <span style={{ fontSize: "12px", color: "#666", textTransform: "uppercase" }}>Message:</span>
                <div
                  style={{
                    marginTop: "8px",
                    padding: "16px",
                    background: "rgba(255, 255, 255, 0.03)",
                    borderRadius: "10px",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    color: "#ddd",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {selectedMessage.message}
                </div>
              </div>

              {selectedMessage.attachment_url && (
                <div style={{ marginBottom: "24px" }}>
                  <span style={{ fontSize: "12px", color: "#666", textTransform: "uppercase" }}>Attachment:</span>
                  <div style={{ marginTop: "8px" }}>
                    <a
                      href={selectedMessage.attachment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-btn admin-btn-outline"
                      style={{ padding: "8px 14px", fontSize: "13px" }}
                    >
                      <i className="las la-paperclip"></i> View / Download Attachment
                    </a>
                  </div>
                </div>
              )}

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "18px" }}>
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || "Project Inquiry")}`}
                  className="admin-btn admin-btn-primary"
                  style={{ width: "100%", padding: "12px" }}
                >
                  <i className="las la-reply"></i> Reply via Email
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
