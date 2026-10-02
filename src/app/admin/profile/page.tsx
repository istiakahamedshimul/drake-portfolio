"use client";

import React, { useEffect, useState } from "react";

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface StatItem {
  number: string;
  label: string;
}

export default function AdminProfilePage() {
  const [profileId, setProfileId] = useState<string>("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [heroGreeting, setHeroGreeting] = useState("");
  const [heroRole, setHeroRole] = useState("");
  const [heroBio, setHeroBio] = useState("");
  const [aboutStory, setAboutStory] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [copyright, setCopyright] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [stats, setStats] = useState<StatItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/admin/profile");
        const data = await res.json();
        if (data.success && data.profile) {
          const p = data.profile;
          setProfileId(p.id);
          setName(p.name || "");
          setDesignation(p.designation || "");
          setHeroGreeting(p.hero_greeting || "");
          setHeroRole(p.hero_role || "");
          setHeroBio(p.hero_bio || "");
          setAboutStory(p.about_story || "");
          setEmail(p.email || "");
          setPhone(p.phone || "");
          setAddress(p.address || "");
          setCopyright(p.copyright || "");
          setAvatarUrl(p.avatar_url || "");
          setLogoUrl(p.logo_url || "");
          setSocials(Array.isArray(p.socials) ? p.socials : []);
          setStats(Array.isArray(p.stats) ? p.stats : []);
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setUploadingAvatar(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "avatar");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Upload failed");
      }

      setAvatarUrl(data.url);
      setNotification({ type: "success", text: "Avatar image uploaded to Supabase Storage!" });
    } catch (err: any) {
      setNotification({ type: "error", text: err.message || "Failed to upload avatar" });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setNotification(null);

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: profileId,
          name,
          designation,
          heroGreeting,
          heroRole,
          heroBio,
          aboutStory,
          email,
          phone,
          address,
          copyright,
          avatarUrl,
          logoUrl,
          socials,
          stats,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save profile");
      }

      setNotification({ type: "success", text: "Profile updated successfully! Main website updated in real-time." });
    } catch (err: any) {
      setNotification({ type: "error", text: err.message || "Failed to save profile." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "40px 0", color: "#888", textAlign: "center" }}>
        Loading profile data...
      </div>
    );
  }

  return (
    <div>
      <div className="admin-header">
        <div className="admin-header-title">
          <h1>Profile & Personal Info</h1>
          <p>Update your personal information, bio, contact details, and avatar</p>
        </div>
        <button
          onClick={handleSave}
          className="admin-btn admin-btn-primary"
          disabled={saving}
        >
          <i className="las la-save"></i>
          {saving ? "Saving Changes..." : "Save Profile"}
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

      <form onSubmit={handleSave}>
        {/* Avatar & Photo Card */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2><i className="las la-image" style={{ color: "#28e98c" }}></i> Avatar & Photo</h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "28px", flexWrap: "wrap" }}>
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "20px",
                overflow: "hidden",
                border: "2px solid #28e98c",
                position: "relative",
                background: "#0d0d11",
              }}
            >
              <img
                src={avatarUrl || "/assets/images/me.jpg"}
                alt="Avatar Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={{ flex: 1, minWidth: "260px" }}>
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 18px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px dashed rgba(255,255,255,0.2)",
                  borderRadius: "10px",
                  cursor: "pointer",
                  color: "#fff",
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
              >
                <i className="las la-cloud-upload-alt" style={{ fontSize: "18px", color: "#28e98c" }}></i>
                {uploadingAvatar ? "Uploading to Supabase..." : "Upload New Avatar"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  style={{ display: "none" }}
                  disabled={uploadingAvatar}
                />
              </label>
              <div style={{ fontSize: "12px", color: "#888" }}>
                Accepts JPG, PNG, WebP. Automatically stored in Supabase <code>portfolio-assets/avatar</code>.
              </div>
              <div style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Or enter direct image URL"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  style={{ fontSize: "12px", padding: "8px 12px" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Identity & Hero Details */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2><i className="las la-id-card" style={{ color: "#28e98c" }}></i> Identity & Hero Section</h2>
          </div>

          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label>Full Display Name</label>
              <input
                type="text"
                className="admin-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="admin-form-group">
              <label>Designation / Role Title</label>
              <input
                type="text"
                className="admin-input"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Hero Heading Greeting</label>
            <input
              type="text"
              className="admin-input"
              value={heroGreeting}
              onChange={(e) => setHeroGreeting(e.target.value)}
              placeholder="e.g. Say Hi from Drake, Framer Designer and Developer"
            />
          </div>

          <div className="admin-form-group">
            <label>Hero Short Bio</label>
            <textarea
              className="admin-textarea"
              rows={2}
              value={heroBio}
              onChange={(e) => setHeroBio(e.target.value)}
              placeholder="I design and code beautifully simple things..."
            />
          </div>

          <div className="admin-form-group">
            <label>About Section Story</label>
            <textarea
              className="admin-textarea"
              rows={4}
              value={aboutStory}
              onChange={(e) => setAboutStory(e.target.value)}
              placeholder="Since beginning my journey as a freelance designer..."
            />
          </div>
        </div>

        {/* Contact & Location */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2><i className="las la-map-marker-alt" style={{ color: "#28e98c" }}></i> Contact & Location</h2>
          </div>

          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label>Primary Email</label>
              <input
                type="email"
                className="admin-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="admin-form-group">
              <label>Phone Number (optional)</label>
              <input
                type="text"
                className="admin-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label>Location / Address</label>
              <input
                type="text"
                className="admin-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Base in Los Angeles, CA"
              />
            </div>

            <div className="admin-form-group">
              <label>Copyright Footer Text</label>
              <input
                type="text"
                className="admin-input"
                value={copyright}
                onChange={(e) => setCopyright(e.target.value)}
                placeholder="© 2022 Drake. All Rights Reserved"
              />
            </div>
          </div>
        </div>

        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            style={{ padding: "13px 28px" }}
            disabled={saving}
          >
            <i className="las la-save"></i>
            {saving ? "Saving Changes..." : "Save Profile Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
