"use client";

import React, { useState } from "react";
import { ProjectItem } from "@/types/portfolio";
import { LightboxModal } from "@/components/LightboxModal";

interface PortfolioSectionProps {
  projects: ProjectItem[];
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  projects,
}) => {
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const openLightbox = (url: string, title: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedImage({ url, title });
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <section
        className="portfolio-area page-section scroll-to-page"
        id="portfolio"
      >
        <div className="custom-container">
          <div className="portfolio-content content-width">
            <div className="section-header">
              <h4
                className="subtitle scroll-animation"
                data-animation="fade_from_bottom"
              >
                <i className="las la-grip-vertical"></i> portfolio
              </h4>
              <h1
                className="scroll-animation"
                data-animation="fade_from_bottom"
              >
                Featured <span>Projects</span>
              </h1>
            </div>

            <div className="row portfolio-items">
              {projects.map((project, index) => {
                let colClass = "col-md-12";
                let itemClass = "portfolio-full";
                let anim = "fade_from_bottom";

                if (index === 0) {
                  colClass = "col-md-12";
                  itemClass = "portfolio-full";
                  anim = "fade_from_bottom";
                } else if (index === 1) {
                  colClass = "col-md-6";
                  itemClass = "portfolio-half";
                  anim = "fade_from_left";
                } else if (index === 2) {
                  colClass = "col-md-6";
                  itemClass = "portfolio-half";
                  anim = "fade_from_right";
                } else {
                  colClass = "col-md-12";
                  itemClass = "portfolio-half";
                  anim = "fade_from_bottom";
                }

                return (
                  <div
                    key={project.id}
                    className={`${colClass} scroll-animation`}
                    data-animation={anim}
                  >
                    <div className={`portfolio-item ${itemClass}`}>
                      <div className="portfolio-item-inner">
                        <a
                          href={project.imageUrl}
                          onClick={(e) =>
                            openLightbox(project.imageUrl, project.title, e)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <img src={project.imageUrl} alt={project.title} />
                        </a>

                        <ul className="portfolio-categories">
                          {project.categories.map((cat, idx) => (
                            <li key={idx}>
                              <a href="#portfolio">{cat}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <h2>
                        <a
                          href={project.projectUrl || "#"}
                          onClick={(e) => {
                            if (
                              project.projectUrl === "#" ||
                              !project.projectUrl
                            ) {
                              openLightbox(project.imageUrl, project.title, e);
                            }
                          }}
                        >
                          {project.title}
                        </a>
                      </h2>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {selectedImage && (
        <LightboxModal
          isOpen={true}
          imageUrl={selectedImage.url}
          title={selectedImage.title}
          onClose={closeLightbox}
        />
      )}
    </>
  );
};
