"use client";

import React, { useState } from "react";
import { TestimonialItem, ClientBrand } from "@/types/portfolio";

interface TestimonialSectionProps {
  testimonials: TestimonialItem[];
  clients: ClientBrand[];
}

const clientAnims = [
  "fade_from_left",
  "fade_from_bottom",
  "fade_from_top",
  "fade_from_right",
  "fade_from_left",
  "fade_from_bottom",
  "fade_from_top",
  "fade_from_right",
];

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  testimonials,
  clients,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const current = testimonials[currentIndex];

  return (
    <section
      className="testimonial-area page-section scroll-to-page"
      id="testimonial"
    >
      <div className="custom-container">
        <div className="testimonial-content content-width">
          <div className="section-header">
            <h4
              className="subtitle scroll-animation"
              data-animation="fade_from_bottom"
            >
              <i className="lar la-comment"></i> testimonial
            </h4>
            <h1
              className="scroll-animation"
              data-animation="fade_from_bottom"
            >
              Trusted by <span>Hundred Clients</span>
            </h1>
          </div>

          <div
            className="testimonial-slider-wrap scroll-animation"
            data-animation="fade_from_bottom"
          >
            {current && (
              <div
                key={current.id}
                className="testimonial-item testimonial-fade"
              >
                <div className="testimonial-item-inner">
                  <div className="author d-flex align-items-center">
                    <img src={current.avatarUrl} alt={current.name} />
                    <div className="right">
                      <h3>{current.name}</h3>
                      <p className="designation">
                        {current.role} of <span>{current.company}</span>
                      </p>
                    </div>
                  </div>
                  <p>{current.quote}</p>
                  <a href={current.projectUrl || "#"} className="project-btn">
                    Project
                  </a>
                </div>
              </div>
            )}

            <div className="testimonial-footer-nav">
              <div className="testimonial-nav d-flex align-items-center">
                <button
                  className="prev"
                  onClick={prevSlide}
                  aria-label="Previous testimonial"
                >
                  <i className="las la-angle-left"></i>
                </button>
                <div id="testimonial-slide-count">
                  <span className="left">{currentIndex + 1}</span> /{" "}
                  {testimonials.length}
                </div>
                <button
                  className="next"
                  onClick={nextSlide}
                  aria-label="Next testimonial"
                >
                  <i className="las la-angle-right"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="clients-logos">
            <h4
              className="scroll-animation"
              data-animation="fade_from_bottom"
            >
              work with 60+ brands worldwide
            </h4>
            <div className="row align-items-center">
              {clients.map((client, index) => (
                <div
                  key={client.id}
                  className="col-md-3 scroll-animation"
                  data-animation={clientAnims[index % clientAnims.length]}
                >
                  <img src={client.logoUrl} alt={client.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
