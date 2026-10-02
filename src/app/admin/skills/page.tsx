"use client";

import React, { useEffect, useState } from "react";

interface Skill {
  id: string;
  name: string;
  percent: number;
  icon_url: string;
  order_index?: number;
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [percent, setPercent] = useState<number>(85);
  const [iconUrl, setIconUrl] = useState("/assets/images/figma.png");
  const [orderIndex, setOrderIndex] = useState(1);
  const [uploadingIcon, setUploadingIcon] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/admin/skills");
      const data = await res.json();
      if (data.success && Array.isArray(data.skills)) {
        setSkills(data.skills);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openAddModal = () => {
    setEditingSkill(null);
    setName("");
    setPercent(85);
    setIconUrl("/assets/images/figma.png");
    setOrderIndex(skills.length + 1);
    setModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    setName(skill.name);
    setPercent(skill.percent);
    setIconUrl(skill.icon_url);
    setOrderIndex(skill.order_index || 1);
    setModalOpen(true);
  };

  const handleIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setUploadingIcon(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "skills");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Icon upload failed");

      setIconUrl(data.url);
      setNotification({ type: "success", text: "Skill icon uploaded to Supabase Storage!" });
    } catch (err: any) {
      setNotification({ type: "error", text: err.message || "Failed to upload icon" });
    } finally {
      setUploadingIcon(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setNotification({ type: "error", text: "Skill name is required." });
      return;
    }

    setSubmitting(true);
    setNotification(null);

    const payload = {
      name,
      percent: Number(percent),
      iconUrl,
      orderIndex: Number(orderIndex),
    };

    try {
      if (editingSkill) {
        const res = await fetch("/api/admin/skills", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingSkill.id, ...payload }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || "Update failed");
        setNotification({ type: "success", text: `Updated ${name} successfully!` });
      } else {
        const res = await fetch("/api/admin/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || "Create failed");
        setNotification({ type: "success", text: `Added ${name} successfully!` });
      }

      setModalOpen(false);
      fetchSkills();
    } catch (err: any) {
      setNotification({ type: "error", text: err.message || "Failed to save skill" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, skillName: string) => {
    if (!confirm(`Are you sure you want to delete "${skillName}"?`)) return;

    try {
      const res = await fetch(`/api/admin/skills?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Delete failed");

      setSkills((prev) => prev.filter((s) => s.id !== id));
      setNotification({ type: "success", text: `Deleted "${skillName}"` });
    } catch (err: any) {
      setNotification({ type: "error", text: err.message || "Failed to delete skill" });
    }
  };

  return (
    <div>
      <div className="admin-header">
        <div className="admin-header-title">
          <h1>Skills & Tech Stack</h1>
          <p>Manage proficiencies, percentages, and icons displayed in the skills section</p>
        </div>
        <button onClick={openAddModal} className="admin-btn admin-btn-primary">
          <i className="las la-plus"></i> Add New Skill
        </button>
      </div>

      {notification && (
        <div
          style={{
            background: notification.type === "success" ? "rgba(40, 233, 140, 0.12)" : "rgba(255, 79, 79, 0.15)",
            border: `1px solid ${notification.type === "success" ? "#28e98c" : "#ff4f4f"}`,
            color: notification.type === "success" ? "#28e98c" : "#ff6b6b",
            borderRadius: "10px",
            padding: "14px 18px",
            marginBottom: "24px",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>{notification.text}</span>
          <button
            onClick={() => setNotification(null)}
            style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}
          >
            &times;
          </button>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>
          Loading skills from Supabase...
        </div>
      ) : skills.length === 0 ? (
        <div className="admin-card" style={{ textAlign: "center", padding: "48px 20px" }}>
          <i className="las la-shapes" style={{ fontSize: "48px", color: "#444", marginBottom: "16px", display: "block" }}></i>
          <h3 style={{ color: "#fff", marginBottom: "8px" }}>No Skills Added</h3>
          <p style={{ color: "#888", marginBottom: "20px" }}>Showcase your technical competencies by adding skills.</p>
          <button onClick={openAddModal} className="admin-btn admin-btn-primary">
            Add Skill
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {skills.map((skill) => (
            <div
              key={skill.id}
              style={{
                background: "#141418",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "14px",
                  background: "#191920",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <img
                  src={skill.icon_url}
                  alt={skill.name}
                  style={{ width: "36px", height: "36px", objectFit: "contain" }}
                />
              </div>

              <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#fff", margin: "0 0 4px 0" }}>
                {skill.name}
              </h3>

              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#28e98c",
                  margin: "8px 0 16px 0",
                }}
              >
                {skill.percent}%
              </div>

              {/* Progress bar preview */}
              <div
                style={{
                  width: "100%",
                  height: "6px",
                  background: "rgba(255, 255, 255, 0.08)",
                  borderRadius: "3px",
                  overflow: "hidden",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${skill.percent}%`,
                    background: "#28e98c",
                    borderRadius: "3px",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "8px", width: "100%", justifyContent: "center" }}>
                <button
                  onClick={() => openEditModal(skill)}
                  className="admin-btn admin-btn-outline"
                  style={{ padding: "6px 14px", fontSize: "12px", flex: 1 }}
                >
                  <i className="las la-pen"></i> Edit
                </button>
                <button
                  onClick={() => handleDelete(skill.id, skill.name)}
                  className="admin-btn admin-btn-danger"
                  style={{ padding: "6px 12px", fontSize: "12px" }}
                >
                  <i className="las la-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add / Edit Skill */}
      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingSkill ? "Edit Skill" : "Add New Skill"}</h3>
              <button className="admin-modal-close" onClick={() => setModalOpen(false)}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label>Skill Name *</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Next.js, Framer, Figma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Percentage Range Slider & Number */}
              <div className="admin-form-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <label style={{ margin: 0 }}>Proficiency Percentage: <strong style={{ color: "#28e98c" }}>{percent}%</strong></label>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={percent}
                  onChange={(e) => setPercent(Number(e.target.value))}
                  style={{
                    width: "100%",
                    accentColor: "#28e98c",
                    cursor: "pointer",
                  }}
                />
              </div>

              {/* Icon selection / upload */}
              <div className="admin-form-group">
                <label>Skill Icon</label>
                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "10px" }}>
                  {iconUrl && (
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "10px",
                        background: "#191920",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #333",
                      }}
                    >
                      <img src={iconUrl} alt="Icon" style={{ width: "26px", height: "26px", objectFit: "contain" }} />
                    </div>
                  )}

                  <label
                    style={{
                      padding: "8px 14px",
                      background: "rgba(40, 233, 140, 0.12)",
                      border: "1px dashed #28e98c",
                      borderRadius: "8px",
                      color: "#28e98c",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <i className="las la-cloud-upload-alt"></i>
                    {uploadingIcon ? "Uploading..." : "Upload Custom Icon"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleIconUpload}
                      style={{ display: "none" }}
                      disabled={uploadingIcon}
                    />
                  </label>
                </div>

                <input
                  type="text"
                  className="admin-input"
                  placeholder="/assets/images/figma.png"
                  value={iconUrl}
                  onChange={(e) => setIconUrl(e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label>Display Order</label>
                <input
                  type="number"
                  className="admin-input"
                  value={orderIndex}
                  onChange={(e) => setOrderIndex(Number(e.target.value))}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
                <button
                  type="button"
                  className="admin-btn admin-btn-outline"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                  disabled={submitting || uploadingIcon}
                >
                  {submitting ? "Saving..." : editingSkill ? "Update Skill" : "Add Skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
