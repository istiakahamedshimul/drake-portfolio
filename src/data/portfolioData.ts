import {
  PersonalInfo,
  FactStat,
  ExperienceItem,
  ServiceItem,
  SkillItem,
  ProjectItem,
  TestimonialItem,
  ClientBrand,
  PricingPlan,
} from "@/types/portfolio";

export const personalInfo: PersonalInfo = {
  name: "Drake",
  designation: "Framer Designer & Developer",
  heroGreeting: "Say Hi from Drake, Framer Designer and Developer",
  heroRole: "Framer Designer and Developer",
  heroBio:
    "I design and code beautifully simple things and i love what i do. Just simple like that!",
  aboutStory:
    "Since beginning my journey as a freelance designer nearly 8 years ago, I've done remote work for agencies, consulted for startups, and collaborated with talented people to create digital products for both business and consumer use. I'm quietly confident, naturally curious, and perpetually working on improving my chops one design problem at a time.",
  email: "hello@drake.design",
  address: "Base in Los Angeles, CA",
  copyright: "© 2022 Drake. All Rights Reserved",
  avatarUrl: "/assets/images/me.jpg",
  logoUrl: "/assets/images/logo.png",
  socials: [
    { platform: "Twitter", icon: "lab la-twitter", url: "https://twitter.com" },
    { platform: "Dribbble", icon: "lab la-dribbble", url: "https://dribbble.com" },
    { platform: "Instagram", icon: "lab la-instagram", url: "https://instagram.com" },
    { platform: "GitHub", icon: "lab la-github", url: "https://github.com" },
  ],
};

export const stats: FactStat[] = [
  { number: "10+", label: "Years of Experience" },
  { number: "182+", label: "projects completed on 15 countries" },
];

export const experiences: ExperienceItem[] = [
  {
    id: "exp-1",
    period: "2020 - Present",
    roles: [
      { title: "Framer Designer & Developer", company: "Brunodee Agency" },
      { title: "Front-End WordPress Developer", company: "Envato Market" },
    ],
  },
  {
    id: "exp-2",
    period: "2013 - 2019",
    roles: [
      { title: "Webflow Developer & Co-Founder", company: "Designflow Studio" },
      { title: "Web Designer", company: "Freelance" },
      { title: "Leader Team of Marketing", company: "AHA Marketing Agency" },
    ],
  },
  {
    id: "exp-3",
    period: "2010 - 2013",
    roles: [
      {
        title: "Bachelor Degree of Information Technology",
        company: "US RMIT University",
      },
    ],
  },
];

export const services: ServiceItem[] = [
  {
    id: "srv-1",
    icon: "las la-bezier-curve",
    title: "Website Design",
    description:
      "I created digital products with unique ideas use Figma & Framer",
    projectCount: "24 Projects",
  },
  {
    id: "srv-2",
    icon: "las la-code",
    title: "Development",
    description: "I build website go live with Framer, Webflow or WordPress",
    projectCount: "126 Projects",
  },
  {
    id: "srv-3",
    icon: "las la-bezier-curve",
    title: "SEO/Marketing",
    description: "Increase the traffic for your website with SEO optimized",
    projectCount: "8 Projects",
  },
];

export const skills: SkillItem[] = [
  {
    id: "sk-1",
    name: "Figma",
    percent: 92,
    iconUrl: "/assets/images/figma.png",
  },
  {
    id: "sk-2",
    name: "Framer",
    percent: 85,
    iconUrl: "/assets/images/framer.png",
  },
  {
    id: "sk-3",
    name: "Webflow",
    percent: 80,
    iconUrl: "/assets/images/webflow.png",
  },
  {
    id: "sk-4",
    name: "React",
    percent: 90,
    iconUrl: "/assets/images/react.png",
  },
  {
    id: "sk-5",
    name: "WordPress",
    percent: 86,
    iconUrl: "/assets/images/wordpress.png",
  },
  {
    id: "sk-6",
    name: "Laravel/PHP",
    percent: 70,
    iconUrl: "/assets/images/laravel.png",
  },
];

export const projects: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Bureau - Architecture Studio Website",
    categories: ["Figma", "Framer", "WordPress"],
    imageUrl: "/assets/images/portfolio1.jpg",
    isWide: true,
    projectUrl: "#",
  },
  {
    id: "proj-2",
    title: "Moonex WordPress Theme",
    categories: ["WordPress", "Laravel/PHP"],
    imageUrl: "/assets/images/portfolio2.jpg",
    isWide: false,
    projectUrl: "#",
  },
  {
    id: "proj-3",
    title: "Taskly Dashboard",
    categories: ["Figma", "Webflow"],
    imageUrl: "/assets/images/portfolio3.jpg",
    isWide: false,
    projectUrl: "#",
  },
  {
    id: "proj-4",
    title: "Hinterland - Real Estate Site Redesign",
    categories: ["Figma", "React"],
    imageUrl: "/assets/images/portfolio4.jpg",
    isWide: true,
    projectUrl: "#",
  },
  {
    id: "proj-5",
    title: "Lewis Portfolio Framer Template",
    categories: ["Framer"],
    imageUrl: "/assets/images/portfolio5.jpg",
    isWide: true,
    projectUrl: "#",
  },
];

export const testimonials: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Paublo Dybala",
    role: "CEO",
    company: "IBM Global",
    avatarUrl: "/assets/images/testimonial-1.jpg",
    quote:
      "“Drake - A Developer with the creativity, professional and master of code. Much more than what i'm expect. High quality product & flexiable price. Recommended!.”",
    projectUrl: "#",
  },
  {
    id: "test-2",
    name: "Christina Morillo",
    role: "Product Management",
    company: "Invision App Inc",
    avatarUrl: "/assets/images/testimonial-2.jpg",
    quote:
      "“Drake was a real pleasure to work with and we look forward to working with him again. He's definitely the kind of designer that you can trust with any project from A-Z.”",
    projectUrl: "#",
  },
  {
    id: "test-3",
    name: "Phil Foden",
    role: "Director",
    company: "Envato LLC",
    avatarUrl: "/assets/images/testimonial-3.jpg",
    quote:
      "“Extremely profressional and fast service!. Drake is a master of code and he also very creative. We done 3 projects with him and certain will continue.”",
    projectUrl: "#",
  },
];

export const clientBrands: ClientBrand[] = [
  { id: "c-1", name: "Client 1", logoUrl: "/assets/images/client-1.png" },
  { id: "c-2", name: "Client 2", logoUrl: "/assets/images/client-2.png" },
  { id: "c-3", name: "Client 3", logoUrl: "/assets/images/client-3.png" },
  { id: "c-4", name: "Client 4", logoUrl: "/assets/images/client-4.png" },
  { id: "c-5", name: "Client 5", logoUrl: "/assets/images/client-5.png" },
  { id: "c-6", name: "Client 6", logoUrl: "/assets/images/client-6.png" },
  { id: "c-7", name: "Client 7", logoUrl: "/assets/images/client-7.png" },
  { id: "c-8", name: "Client 8", logoUrl: "/assets/images/client-8.png" },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "plan-1",
    name: "basic",
    subtitle: "Have design ready to build? or small budget",
    price: "$59",
    unit: "/ hour",
    features: [
      "Need your wireframe",
      "Design with Figma, Framer",
      "Implement with Webflow, React, WordPress, Laravel/PHP",
      "Remote/Online",
      "Work in business days, no weekend.",
      "Support 6 months",
    ],
  },
  {
    id: "plan-2",
    name: "premium",
    subtitle: "Not have any design? Leave its for me",
    price: "$129",
    unit: "/ hour",
    isPopular: true,
    features: [
      "Don't need wireframe or anything",
      "Design with Figma, Framer from scratch",
      "Implement with Webflow, React, WordPress, Laravel/PHP",
      "Remote/Online",
      "Work with both weekend",
      "Support 12 months",
      "Your project alway be priority",
      "Customer care gifts",
    ],
  },
];
