const fs = require('fs');
const path = require('path');

let style = fs.readFileSync(path.join(__dirname, '../src/styles/style.css'), 'utf8');
let responsive = fs.readFileSync(path.join(__dirname, '../src/styles/responsive.css'), 'utf8');

// Replace body height: 100vh with min-height: 100vh
style = style.replace('height: 100vh;', 'min-height: 100vh;');

// Remove missing ../images/bg-shape.png reference
style = style.replace("background: url('../images/bg-shape.png') center no-repeat;", "background: radial-gradient(circle at 50% 50%, rgba(40, 233, 140, 0.05), transparent 70%);");

const criticalFixesAndEnhancements = `
/* Text Utilities missing from bootstrap-grid */
.text-center {
  text-align: center !important;
}
.text-right {
  text-align: right !important;
}
.text-left {
  text-align: left !important;
}

/* Authentic Deep Dark Black Theme Baseline */
html, body {
  background: #0f0f11 !important;
  background-color: #0f0f11 !important;
  color: #999999 !important;
  font-family: 'Inter', sans-serif !important;
  scroll-behavior: smooth !important;
  min-height: 100vh;
  overflow-x: hidden;
  color-scheme: dark;
}

/* Form Controls & Select Dropdown Visibility */
select, input, textarea {
  color-scheme: dark !important;
}
.contact-area .contact-content .contact-form .input-group select {
  color: #fff !important;
  background-color: transparent !important;
}
.contact-area .contact-content .contact-form .input-group select option {
  background-color: #191919 !important;
  background: #191919 !important;
  color: #ffffff !important;
  padding: 10px 14px !important;
}
.contact-area .contact-content .contact-form .input-group select option:checked,
.contact-area .contact-content .contact-form .input-group select option:hover {
  background-color: #28e98c !important;
  color: #000000 !important;
}

/* ========================================================
   Left Sidebar - Full, Prominent, Perfectly Proportioned Floating Card
   (No artificial downscaling, prominent fonts, fits viewport)
   ======================================================== */
@media (min-width: 1221px) {
  body > .left-sidebar {
    max-width: 440px !important;
    width: 100% !important;
    border-radius: 30px !important;
    border: 1px solid #565656 !important;
    position: fixed !important;
    left: clamp(20px, 2.5vw, 35px) !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    padding: 38px 32px !important;
    background: #141416 !important;
    z-index: 20 !important;
    box-sizing: border-box !important;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.45) !important;
  }
}

.left-sidebar .sidebar-header {
  margin-bottom: 26px !important;
}
.left-sidebar .sidebar-header img {
  max-height: 34px !important;
  width: auto !important;
}
.left-sidebar .sidebar-header .designation {
  max-width: 135px !important;
  text-align: right !important;
  color: #fff !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 1.35 !important;
}

.left-sidebar > img.me {
  border-radius: 30px !important;
  display: block !important;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 auto 26px auto !important;
  object-fit: cover !important;
  aspect-ratio: 1 / 0.95 !important;
}

.left-sidebar h2.email {
  font-size: 24px !important;
  color: #fff !important;
  text-align: center !important;
  font-weight: 300 !important;
  margin-bottom: 6px !important;
  line-height: 1.3 !important;
}
.left-sidebar h2.address {
  font-size: 20px !important;
  color: #fff !important;
  text-align: center !important;
  font-weight: 300 !important;
  margin-bottom: 16px !important;
  line-height: 1.3 !important;
}
.left-sidebar p.copyright {
  font-size: 14px !important;
  color: #999999 !important;
  text-align: center !important;
  margin-bottom: 20px !important;
}

.left-sidebar .social-profile {
  gap: 10px !important;
  margin-bottom: 24px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
.left-sidebar .social-profile li a {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 48px !important;
  height: 48px !important;
  text-align: center !important;
  border: 2px solid #565656 !important;
  border-radius: 50% !important;
  color: #999999 !important;
  font-size: 19px !important;
  transition: 0.3s !important;
}
.left-sidebar .social-profile li a:hover {
  color: var(--primary_color) !important;
  border-color: var(--primary_color) !important;
}

.left-sidebar .theme-btn {
  width: 100% !important;
  padding: 13px 30px !important;
  font-size: 15px !important;
  border-radius: 30px !important;
  font-weight: 500 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
}

/* Medium Desktop Screens (1221px - 1440px) */
@media (max-width: 1440px) and (min-width: 1221px) {
  body > .left-sidebar {
    max-width: 415px !important;
    padding: 34px 28px !important;
  }
}

/* Short height laptop screens (<= 740px height) without artificial scale */
@media (max-height: 740px) and (min-width: 1221px) {
  body > .left-sidebar {
    padding: 24px 22px !important;
  }
  .left-sidebar .sidebar-header { margin-bottom: 14px !important; }
  .left-sidebar > img.me { margin-bottom: 14px !important; }
  .left-sidebar h2.email { font-size: 21px !important; margin-bottom: 4px !important; }
  .left-sidebar h2.address { font-size: 18px !important; margin-bottom: 10px !important; }
  .left-sidebar p.copyright { margin-bottom: 12px !important; }
  .left-sidebar .social-profile { margin-bottom: 16px !important; }
  .left-sidebar .social-profile li a { width: 42px !important; height: 42px !important; }
  .left-sidebar .theme-btn { padding: 10px 20px !important; font-size: 14px !important; }
}

/* ========================================================
   Desktop & Laptop Layout Proportions & Zoomness
   ======================================================== */
@media (min-width: 1600px) {
  .custom-container {
    max-width: 1240px !important;
  }
  .content-width {
    max-width: 820px !important;
  }
}

@media (min-width: 1221px) and (max-width: 1599px) {
  .custom-container {
    max-width: 1140px !important;
  }
  .content-width {
    max-width: 770px !important;
  }
}

/* Hero Section Typography and Spacing */
.hero-section .hero-content h1 {
  font-size: 78px !important;
  letter-spacing: -0.2px !important;
  line-height: 90px !important;
  margin-bottom: 38px !important;
  font-weight: 300 !important;
}
.hero-section .hero-content h1 span {
  color: var(--primary_color) !important;
}

/* ========================================================
   Responsive Breakpoints: Tablet & Mobile
   ======================================================== */
@media (max-width: 1220px) {
  /* In mobile/tablet, the fixed sidebar is hidden and in-flow sidebar is shown */
  body > .left-sidebar {
    display: none !important;
  }
  .drake-main .left-sidebar {
    display: block !important;
    position: relative !important;
    max-width: 520px !important;
    width: 100% !important;
    left: auto !important;
    right: auto !important;
    top: auto !important;
    transform: none !important;
    margin: 30px auto 45px auto !important;
    padding: 35px 30px !important;
  }
  .drake-main .left-sidebar > img.me {
    max-width: 320px !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
  .custom-container {
    max-width: 767px !important;
    padding: 0 20px !important;
  }
  .content-width {
    max-width: 100% !important;
    margin-left: 0 !important;
  }
  /* Completely hide desktop vertical floating dock on mobile / tablet */
  ul.menu.scroll-nav,
  .scroll-nav,
  .menu.scroll-nav,
  ul.d-flex.menu.scroll-nav,
  body > .menu,
  .menu:not(.scroll-nav-responsive) {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
    opacity: 0 !important;
  }
  .responsive-sidebar-menu .sidebar-menu-inner .menu-wrap .menu {
    display: flex !important;
    visibility: visible !important;
    pointer-events: auto !important;
    opacity: 1 !important;
  }
  .icon-menu {
    position: fixed !important;
    display: flex !important;
    right: 25px !important;
    top: 25px !important;
    z-index: 1000 !important;
  }
}

@media (min-width: 1221px) {
  .drake-main .left-sidebar {
    display: none !important;
  }
}

@media (max-width: 787px) {
  .hero-section .hero-content h1 {
    font-size: 58px !important;
    line-height: 1.25 !important;
  }
  .hero-section .hero-content .facts h1 {
    font-size: 52px !important;
  }
}

@media (max-width: 767px) {
  .global-color {
    top: auto !important;
    bottom: 25px !important;
    left: 0 !important;
  }
  .global-color .setting-toggle {
    border-radius: 0 8px 8px 0 !important;
    width: 44px !important;
    height: 44px !important;
  }
  .custom-container {
    padding: 0 16px !important;
  }
  .drake-main .left-sidebar {
    max-width: calc(100% - 30px) !important;
    margin: 25px auto 35px auto !important;
    width: calc(100% - 30px) !important;
    padding: 28px 20px !important;
    border-radius: 24px !important;
    box-sizing: border-box !important;
  }
  .drake-main .left-sidebar > img.me,
  .left-sidebar > img.me {
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    object-fit: cover !important;
  }
  .left-sidebar .sidebar-header {
    margin-bottom: 20px !important;
    width: 100% !important;
  }
  .left-sidebar .sidebar-header img {
    max-height: 24px !important;
    width: auto !important;
  }
  .left-sidebar .sidebar-header .designation {
    max-width: 130px !important;
    font-size: 11.5px !important;
    line-height: 1.25 !important;
    text-align: right !important;
  }
  .hero-section .hero-content h1 {
    font-size: 50px !important;
    line-height: 1.25 !important;
    margin-bottom: 28px !important;
  }
  .hero-section .hero-content .facts {
    gap: 30px !important;
  }
  .hero-section .hero-content .facts h1 {
    font-size: 50px !important;
    line-height: 1.1 !important;
  }
  .portfolio-items .portfolio-item .portfolio-item-inner {
    height: 280px !important;
  }
  .portfolio-items .portfolio-item.portfolio-full .portfolio-item-inner {
    height: 300px !important;
  }
}

@media (max-width: 584px) {
  .section-header h1 {
    font-size: 38px !important;
    line-height: 1.3 !important;
  }
  .hero-section .hero-content h1 {
    font-size: 42px !important;
    line-height: 1.2 !important;
  }
  .hero-section .hero-content .facts {
    flex-direction: column !important;
    gap: 20px !important;
  }
  .hero-section .hero-content .facts h1 {
    font-size: 42px !important;
    margin-bottom: 8px !important;
  }
  .portfolio-items .portfolio-item .portfolio-item-inner {
    height: 230px !important;
  }
  .hero-section .hero-content .go-to-project-btn {
    width: 140px !important;
    height: 140px !important;
  }
  .hero-section .hero-content .go-to-project-btn img {
    width: 110px !important;
    height: 110px !important;
  }
  .hero-section .hero-content .go-to-project-btn i {
    font-size: 30px !important;
  }
}

@media (max-width: 425px) {
  .hero-section .hero-content h1 {
    font-size: 34px !important;
    line-height: 1.2 !important;
  }
  .left-sidebar .sidebar-header .designation {
    font-size: 13px !important;
  }
  .left-sidebar h2.email {
    font-size: 20px !important;
  }
  .left-sidebar h2.address {
    font-size: 17px !important;
  }
  .left-sidebar .social-profile li a {
    width: 42px !important;
    height: 42px !important;
    font-size: 16px !important;
  }
}

/* ========================================================
   Floating Navigation Dock (Desktop & Laptop)
   Perfect capsule shape, generous breathing room (not congested)
   ======================================================== */
@media (min-width: 1221px) {
  body > .menu,
  ul.menu.scroll-nav {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 22px !important;
    padding: 26px 0 !important;
    width: 55px !important;
    height: auto !important;
    border: 1px solid #575757 !important;
    border-radius: 35px !important;
    position: fixed !important;
    right: 68px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    background: #141416 !important;
    z-index: 99 !important;
    box-sizing: border-box !important;
    visibility: visible !important;
    opacity: 1 !important;
    pointer-events: auto !important;
    list-style: none !important;
    margin: 0 !important;
  }

  .menu.scroll-nav li {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    list-style: none !important;
  }

  .menu.scroll-nav li a {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 55px !important;
    height: 24px !important;
    color: #999999 !important;
    transition: color 0.3s ease !important;
    position: relative !important;
    text-align: center !important;
    text-decoration: none !important;
  }

  .menu.scroll-nav li a i {
    font-size: 20px !important;
    line-height: 1 !important;
    display: block !important;
  }

  .menu.scroll-nav li a.active,
  .menu.scroll-nav li a:hover,
  .menu.scroll-nav li a.active i,
  .menu.scroll-nav li a:hover i {
    color: var(--primary_color) !important;
  }
}

@media (max-width: 1555px) and (min-width: 1221px) {
  body > .menu,
  ul.menu.scroll-nav {
    right: 30px !important;
  }
}

/* Mobile Drawer Menu */
.responsive-sidebar-menu .sidebar-menu-inner {
  background: #141416 !important;
}
.icon-menu {
  background: #141416 !important;
  border-color: #2e2e32 !important;
}
.global-color .setting-toggle {
  background: #141416 !important;
  border: 1px solid #2e2e32 !important;
}
.global-color .inner .global-color-option {
  background: #141416 !important;
  border-left: 1px solid #2e2e32 !important;
}

/* Body 3D Animated Background Overlay */
.body-overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  opacity: 0.35;
  pointer-events: none;
}

/* Rotating Project Badge */
.hero-section .hero-content .go-to-project-btn {
  width: 175px;
  height: 175px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #575757;
  border-radius: 50%;
  position: relative;
  margin-left: auto;
  margin-top: 40px;
  margin-bottom: 50px;
}
.hero-section .hero-content .go-to-project-btn img {
  animation: rotating 20s infinite linear !important;
  position: absolute;
  width: 140px;
  height: 140px;
}
.hero-section .hero-content .go-to-project-btn i {
  font-size: 40px;
  color: #fff;
}

/* Rotating theme settings cog */
.global-color .setting-toggle i {
  animation: rotating 3s infinite linear !important;
}

/* Portfolio Cards Fix & Zoom */
.portfolio-items .portfolio-item .portfolio-item-inner a {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
}
.portfolio-items .portfolio-item .portfolio-item-inner a img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.portfolio-items .portfolio-item:hover .portfolio-item-inner a img {
  transform: scale(1.05);
}
.portfolio-items .portfolio-item .portfolio-item-inner .portfolio-categories {
  z-index: 5;
  pointer-events: auto;
}

/* Skills Cards - Perfectly Centered Percentage and Logos */
.skills .skill {
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.skills .skill .skill-inner {
  border: 2px solid #565656;
  border-radius: 85px;
  padding: 54px 0 48px 0;
  margin-bottom: 20px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  width: 100%;
  max-width: 180px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #141416;
}
.skills .skill:hover .skill-inner {
  border-color: var(--primary_color) !important;
  box-shadow: 0 0 25px rgba(40, 233, 140, 0.15);
  transform: translateY(-4px);
}
.skills .skill .skill-inner img {
  display: block;
  margin: 0 auto 25px auto;
  max-height: 48px;
  width: auto;
}
.skills .skill .skill-inner h1.percent {
  font-size: 30px;
  color: var(--primary_color);
  font-weight: 300;
  margin: 0 auto;
  text-align: center !important;
  width: 100%;
  display: block;
  line-height: 1.2;
}
.skills .skill p.name {
  font-size: 14px;
  color: #fff;
  margin: 0 auto;
  text-align: center !important;
  width: 100%;
  display: block;
}

/* Service & Pricing Cards Deep Dark Styling */
.services-items .service-item {
  background: #141416;
  border-color: #2e2e32;
}
.services-items .service-item:hover {
  border-color: var(--primary_color) !important;
}
.pricing-table-items .pricing-table {
  background: #141416;
  border-color: #2e2e32;
}

/* Keyframes */
@keyframes rotating {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes bounceLoader {
  0% {
    top: 30px;
    height: 5px;
    border-radius: 60px 60px 20px 20px;
    transform: scaleX(2);
  }
  35% {
    height: 15px;
    border-radius: 50%;
    transform: scaleX(1);
  }
  100% {
    top: 0;
  }
}

/* Page Loader */
.page-loader {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.6s ease, visibility 0.6s ease;
}
.page-loader.loaded {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.page-loader .bounceball {
  position: relative;
  display: inline-block;
  height: 37px;
  width: 15px;
}
.page-loader .bounceball:before {
  position: absolute;
  content: '';
  display: block;
  top: 0;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #fff;
  transform-origin: 50%;
  animation: bounceLoader 500ms alternate infinite ease;
}

/* Lightbox Modal */
.portfolio-lightbox-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: modalFadeIn 0.25s ease-out;
}
.portfolio-lightbox-content {
  position: relative;
  max-width: 900px;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #333;
  background: #111;
}
.portfolio-lightbox-content img {
  width: 100%;
  height: auto;
  display: block;
}
.portfolio-lightbox-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border: 1px solid #555;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: 0.2s;
  z-index: 10;
}
.portfolio-lightbox-close:hover {
  background: var(--primary_color);
  color: #000;
}
.portfolio-lightbox-caption {
  padding: 16px 20px;
  background: #191919;
  color: #fff;
  font-size: 16px;
}

@keyframes modalFadeIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}

/* Testimonial Transitions */
.testimonial-item {
  width: 100%;
  display: block;
}
.testimonial-fade {
  animation: testFade 0.4s ease-in-out;
}
@keyframes testFade {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
`;

const combined = `/* Drake Pixel-Perfect Design System */
${style}

/* Responsive Media Queries */
${responsive}

${criticalFixesAndEnhancements}
`;

fs.writeFileSync(path.join(__dirname, '../src/app/globals.css'), combined, 'utf8');
console.log('globals.css rebuilt successfully. Length:', combined.length);
