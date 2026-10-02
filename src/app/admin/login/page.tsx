"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Invalid authentication credentials.");
      }

      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to authenticate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at 50% 20%, #171720 0%, #09090b 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#141418",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "18px",
          padding: "36px 32px",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "#28e98c",
              color: "#0b0b0e",
              fontWeight: 800,
              fontSize: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
              boxShadow: "0 0 20px rgba(40, 233, 140, 0.35)",
            }}
          >
            D
          </div>
          <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", margin: "0 0 6px 0" }}>
            Drake Admin Portal
          </h2>
          <p style={{ fontSize: "13px", color: "#8b8b98", margin: 0 }}>
            Enter your admin key to manage portfolio content
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "rgba(255, 79, 79, 0.15)",
              border: "1px solid rgba(255, 79, 79, 0.35)",
              color: "#ff6b6b",
              borderRadius: "10px",
              padding: "12px 14px",
              fontSize: "13px",
              marginBottom: "20px",
            }}
          >
            ⚠ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="password" style={{ color: "#aaa" }}>
              Admin Passcode / Master Key
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="admin-input"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: "44px" }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "#777",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                <i className={showPassword ? "las la-eye-slash" : "las la-eye"}></i>
              </button>
            </div>
            <div style={{ marginTop: "8px", fontSize: "11px", color: "#666" }}>
              Hint: Default passcode is <code style={{ color: "#28e98c" }}>drake2024</code>
            </div>
          </div>

          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            style={{ width: "100%", marginTop: "12px", padding: "13px" }}
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Sign In to Admin"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Link
            href="/"
            style={{
              fontSize: "13px",
              color: "#888",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <i className="las la-arrow-left"></i> Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
