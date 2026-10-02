"use client";

import React, { useState } from "react";
import { PersonalInfo } from "@/types/portfolio";

interface ContactSectionProps {
  info: PersonalInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ info }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    budget: "",
    message: "",
  });

  const [fileName, setFileName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("subject", formData.subject);
      data.append("budget", formData.budget);
      data.append("message", formData.message);

      if (fileInputRef.current?.files?.[0]) {
        data.append("file", fileInputRef.current.files[0]);
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to send message. Please try again.");
      }

      setIsSent(true);
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        subject: "",
        budget: "",
        message: "",
      });
      setFileName("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err: any) {
      console.error("Submit error:", err);
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-area page-section scroll-content" id="contact">
      <div className="custom-container">
        <div className="contact-content content-width">
          <div className="section-header">
            <h4
              className="subtitle scroll-animation"
              data-animation="fade_from_bottom"
            >
              <i className="las la-envelope"></i> contact
            </h4>
            <h1
              className="scroll-animation"
              data-animation="fade_from_bottom"
            >
              Let&apos;s Work <span>Together!</span>
            </h1>
          </div>
          <h3
            className="scroll-animation"
            data-animation="fade_from_bottom"
          >
            {info.email}
          </h3>
          <p id="required-msg">* Marked fields are required to fill.</p>

          <form
            className="contact-form scroll-animation"
            data-animation="fade_from_bottom"
            onSubmit={handleSubmit}
          >
            {isSent && (
              <div
                className="alert alert-success messenger-box-contact__msg"
                style={{
                  display: "block",
                  background: "rgba(40, 233, 140, 0.15)",
                  border: "1px solid var(--primary_color)",
                  color: "var(--primary_color)",
                  borderRadius: "12px",
                  padding: "16px 20px",
                  marginBottom: "25px",
                }}
                role="alert"
              >
                ✓ Your message was sent successfully. We will get back to you soon!
              </div>
            )}

            {errorMessage && (
              <div
                className="alert alert-danger"
                style={{
                  display: "block",
                  background: "rgba(255, 77, 77, 0.15)",
                  border: "1px solid #ff4d4d",
                  color: "#ff6b6b",
                  borderRadius: "12px",
                  padding: "16px 20px",
                  marginBottom: "25px",
                }}
                role="alert"
              >
                ⚠ {errorMessage}
              </div>
            )}

            <div className="row">
              <div className="col-md-6">
                <div className="input-group">
                  <label htmlFor="fullName">
                    full Name <sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group">
                  <label htmlFor="email">
                    Email <sup>*</sup>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group">
                  <label htmlFor="phoneNumber">
                    phone <span>(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Your phone number"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group">
                  <label htmlFor="subject">
                    subject <sup>*</sup>
                  </label>
                  <select
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    style={{ colorScheme: "dark" }}
                    required
                  >
                    <option value="" style={{ background: "#191919", color: "#fff" }}>Select a subject</option>
                    <option value="Web Design" style={{ background: "#191919", color: "#fff" }}>Web Design</option>
                    <option value="Web Development" style={{ background: "#191919", color: "#fff" }}>Web Development</option>
                    <option value="Branding / Strategy" style={{ background: "#191919", color: "#fff" }}>
                      Branding / Strategy
                    </option>
                    <option value="Other" style={{ background: "#191919", color: "#fff" }}>Other</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="input-group">
                  <label htmlFor="budget">
                    your budget <span>(optional)</span>
                  </label>
                  <input
                    type="number"
                    name="budget"
                    id="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="A range budget for your project"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="input-group">
                  <label htmlFor="message">message</label>
                  <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here ..."
                    rows={4}
                  ></textarea>
                </div>
              </div>
              <div className="col-md-12">
                <div className="input-group upload-attachment">
                  <div>
                    <label htmlFor="upload-attachment" style={{ cursor: "pointer" }}>
                      <i className="las la-cloud-upload-alt"></i>{" "}
                      {fileName ? `File: ${fileName}` : "add an attachment"}
                      <input
                        ref={fileInputRef}
                        type="file"
                        name="file"
                        id="upload-attachment"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="input-group submit-btn-wrap">
                  <button
                    className="theme-btn"
                    name="submit"
                    type="submit"
                    id="submit-form"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "send message"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
