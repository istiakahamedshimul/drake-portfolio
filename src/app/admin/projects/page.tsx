"use client";

import React, { useEffect, useState } from "react";

interface Project {
  id: string;
  title: string;
  slug?: string;
  categories: string[];
  image_url: string;
  project_url?: string;
  is_wide: boolean;
  order_index?: number;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categoriesInput, setCategoriesInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [isWide, setIsWide] = useState(false);
  const [orderIndex, setOrderIndex] = useState(1);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setTitle("");
    setSlug("");
    setCategoriesInput("Figma, Framer");
    setImageUrl("");
    setProjectUrl("#");
    setIsWide(false);
    setOrderIndex(projects.length + 1);
    setModalOpen(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingProject(proj);
    setTitle(proj.title);
    setSlug(proj.slug || "");
    setCategoriesInput(proj.categories ? proj.categories.join(", ") : "");
    setImageUrl(proj.image_url);
    setProjectUrl(proj.project_url || "#");
    setIsWide(Boolean(proj.is_wide));
    setOrderIndex(proj.order_index || 1);
    setModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "projects");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Image upload failed");
      }

      setImageUrl(data.url);
      setNotification({ type: "success", text: "Screenshot uploaded to Supabase Storage!" });
    } catch (err: any) {
      setNotification({ type: "error", text: err.message || "Upload failed" });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) {
      setNotification({ type: "error", text: "Please provide both a title and an image." });
      return;
    }

    setSubmitting(true);
    setNotification(null);

    const categories = categoriesInput
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      categories,
      imageUrl,
      projectUrl,
      isWide,
      orderIndex: Number(orderIndex),
    };

    try {
      if (editingProject) {
        // PUT update
        const res = await fetch("/api/admin/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingProject.id, ...payload }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || "Update failed");
        setNotification({ type: "success", text: "Project updated successfully!" });
      } else {
        // POST create
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || "Create failed");
        setNotification({ type: "success", text: "New project created successfully!" });
      }

      setModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      setNotification({ type: "error", text: err.message || "Failed to save project" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, projectTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${projectTitle}"?`)) return;

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Delete failed");

      setProjects((prev) => prev.filter((p) => p.id !== id));
      setNotification({ type: "success", text: `Deleted "${projectTitle}"` });
    } catch (err: any) {
      setNotification({ type: "error", text: err.message || "Failed to delete project" });
    }
  };

  return (
    <div>
      <div className="admin-header">
        <div className="admin-header-title">
          <h1>Portfolio Projects</h1>
          <p>Add, edit, rearrange, and manage showcased works</p>
        </div>
        <button onClick={openAddModal} className="admin-btn admin-btn-primary">
          <i className="las la-plus"></i> Add New Project
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
          Loading projects from Supabase...
        </div>
      ) : projects.length === 0 ? (
        <div className="admin-card" style={{ textAlign: "center", padding: "48px 20px" }}>
          <i className="las la-folder-open" style={{ fontSize: "48px", color: "#444", marginBottom: "16px", display: "block" }}></i>
          <h3 style={{ color: "#fff", marginBottom: "8px" }}>No Projects Yet</h3>
          <p style={{ color: "#888", marginBottom: "20px" }}>Start showcasing your work by creating your first project.</p>
          <button onClick={openAddModal} className="admin-btn admin-btn-primary">
            Create Project
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {projects.map((proj) => (
            <div
              key={proj.id}
              style={{
                background: "#141418",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.2s",
              }}
            >
              {/* Project Image */}
              <div
                style={{
                  height: "200px",
                  background: "#0c0c0f",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={proj.image_url}
                  alt={proj.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: proj.is_wide ? "rgba(40, 233, 140, 0.9)" : "rgba(0, 0, 0, 0.75)",
                    color: proj.is_wide ? "#0b0b0e" : "#fff",
                    fontWeight: 700,
                    fontSize: "11px",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    textTransform: "uppercase",
                  }}
                >
                  {proj.is_wide ? "Wide Card" : "Half Card"}
                </div>
              </div>

              {/* Project Details */}
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: 600,
                    color: "#fff",
                    margin: "0 0 10px 0",
                    lineHeight: "1.4",
                  }}
                >
                  {proj.title}
                </h3>

                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
                  {proj.categories?.map((cat, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: "rgba(255, 255, 255, 0.06)",
                        color: "#aaa",
                        fontSize: "11px",
                        padding: "3px 8px",
                        borderRadius: "5px",
                      }}
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "14px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "#666" }}>
                    Order: #{proj.order_index ?? 0}
                  </span>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => openEditModal(proj)}
                      className="admin-btn admin-btn-outline"
                      style={{ padding: "6px 12px", fontSize: "12px" }}
                    >
                      <i className="las la-pen"></i> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id, proj.title)}
                      className="admin-btn admin-btn-danger"
                      style={{ padding: "6px 12px", fontSize: "12px" }}
                    >
                      <i className="las la-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add / Edit Project */}
      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingProject ? "Edit Project" : "Add New Project"}</h3>
              <button className="admin-modal-close" onClick={() => setModalOpen(false)}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label>Project Title *</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Bureau - Architecture Studio"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>Categories (comma separated)</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Figma, Framer, React"
                    value={categoriesInput}
                    onChange={(e) => setCategoriesInput(e.target.value)}
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
              </div>

              {/* Image Upload Area */}
              <div className="admin-form-group">
                <label>Project Screenshot / Image *</label>
                <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "10px" }}>
                  <label
                    style={{
                      padding: "10px 16px",
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
                    <i className="las la-cloud-upload-alt" style={{ fontSize: "16px" }}></i>
                    {uploadingImage ? "Uploading to Supabase..." : "Upload Screenshot"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                      disabled={uploadingImage}
                    />
                  </label>
                  <span style={{ fontSize: "12px", color: "#777" }}>or paste image link:</span>
                </div>

                <input
                  type="text"
                  className="admin-input"
                  placeholder="/assets/images/portfolio1.jpg or Supabase CDN URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                />

                {imageUrl && (
                  <div style={{ marginTop: "10px", width: "100%", height: "140px", borderRadius: "10px", overflow: "hidden", border: "1px solid #333" }}>
                    <img src={imageUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
              </div>

              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>Project External Link</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="https://..."
                    value={projectUrl}
                    onChange={(e) => setProjectUrl(e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Card Size Layout</label>
                  <select
                    className="admin-select"
                    value={isWide ? "true" : "false"}
                    onChange={(e) => setIsWide(e.target.value === "true")}
                  >
                    <option value="false">Half Width Card (col-md-6)</option>
                    <option value="true">Wide Full Width Card (col-md-12)</option>
                  </select>
                </div>
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
                  disabled={submitting || uploadingImage}
                >
                  {submitting ? "Saving..." : editingProject ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
