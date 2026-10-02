import React from "react";
import { PricingPlan } from "@/types/portfolio";

interface PricingSectionProps {
  plans: PricingPlan[];
}

export const PricingSection: React.FC<PricingSectionProps> = ({ plans }) => {
  return (
    <section className="pricing-area page-section scroll-to-page" id="pricing">
      <div className="custom-container">
        <div className="pricing-content content-width">
          <div className="section-header">
            <h4
              className="subtitle scroll-animation"
              data-animation="fade_from_bottom"
            >
              <i className="las la-dollar-sign"></i> pricing
            </h4>
            <h1
              className="scroll-animation"
              data-animation="fade_from_bottom"
            >
              My <span>Pricing</span>
            </h1>
          </div>

          <div className="pricing-table-items">
            <div className="row">
              {plans.map((plan, index) => (
                <div
                  key={plan.id}
                  className={`col-md-6 scroll-animation`}
                  data-animation={
                    index % 2 === 0 ? "fade_from_left" : "fade_from_right"
                  }
                >
                  <div className="pricing-table">
                    <div className="pricing-table-header">
                      <div className="top d-flex justify-content-between align-items-start">
                        <h4>{plan.name}</h4>
                        <p className="text-right">{plan.subtitle}</p>
                      </div>
                      <h1>
                        {plan.price} <span>{plan.unit}</span>
                      </h1>
                    </div>
                    <ul className="feature-lists">
                      {plan.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                    <a href="#contact" className="theme-btn">
                      pick this package
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <p
              className="info scroll-animation"
              data-animation="fade_from_bottom"
            >
              Don&apos;t find any package match with your plan!
              <br />
              Want to setup a new tailor-made package for only you?.{" "}
              <a href="#contact">Contact Us</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
