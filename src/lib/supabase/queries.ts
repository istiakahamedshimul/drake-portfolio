import { supabase, isSupabaseConfigured } from "./client";
import {
  personalInfo as defaultPersonalInfo,
  stats as defaultStats,
  experiences as defaultExperiences,
  services as defaultServices,
  skills as defaultSkills,
  projects as defaultProjects,
  testimonials as defaultTestimonials,
  clientBrands as defaultClientBrands,
  pricingPlans as defaultPricingPlans,
} from "@/data/portfolioData";
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

export async function getPortfolioData() {
  if (!isSupabaseConfigured || !supabase) {
    return {
      personalInfo: defaultPersonalInfo,
      stats: defaultStats,
      experiences: defaultExperiences,
      services: defaultServices,
      skills: defaultSkills,
      projects: defaultProjects,
      testimonials: defaultTestimonials,
      clientBrands: defaultClientBrands,
      pricingPlans: defaultPricingPlans,
    };
  }

  try {
    const [
      profileRes,
      projectsRes,
      skillsRes,
      servicesRes,
      experiencesRes,
      testimonialsRes,
      brandsRes,
      pricingRes,
    ] = await Promise.all([
      supabase.from("profiles").select("*").limit(1).single(),
      supabase.from("projects").select("*").order("order_index", { ascending: true }),
      supabase.from("skills").select("*").order("order_index", { ascending: true }),
      supabase.from("services").select("*").order("order_index", { ascending: true }),
      supabase.from("experiences").select("*").order("order_index", { ascending: true }),
      supabase.from("testimonials").select("*").order("order_index", { ascending: true }),
      supabase.from("client_brands").select("*").order("order_index", { ascending: true }),
      supabase.from("pricing_plans").select("*").order("order_index", { ascending: true }),
    ]);

    // Map profile
    let personalInfo: PersonalInfo = defaultPersonalInfo;
    let stats: FactStat[] = defaultStats;

    if (profileRes.data) {
      const p = profileRes.data;
      personalInfo = {
        name: p.name || defaultPersonalInfo.name,
        designation: p.designation || defaultPersonalInfo.designation,
        heroGreeting: p.hero_greeting || defaultPersonalInfo.heroGreeting,
        heroRole: p.hero_role || defaultPersonalInfo.heroRole,
        heroBio: p.hero_bio || defaultPersonalInfo.heroBio,
        aboutStory: p.about_story || defaultPersonalInfo.aboutStory,
        email: p.email || defaultPersonalInfo.email,
        address: p.address || defaultPersonalInfo.address,
        copyright: p.copyright || defaultPersonalInfo.copyright,
        avatarUrl: p.avatar_url || defaultPersonalInfo.avatarUrl,
        logoUrl: p.logo_url || defaultPersonalInfo.logoUrl,
        socials: Array.isArray(p.socials) && p.socials.length > 0 ? p.socials : defaultPersonalInfo.socials,
      };

      if (Array.isArray(p.stats) && p.stats.length > 0) {
        stats = p.stats;
      }
    }

    // Map projects
    let projects: ProjectItem[] = defaultProjects;
    if (projectsRes.data && projectsRes.data.length > 0) {
      projects = projectsRes.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        categories: item.categories || [],
        imageUrl: item.image_url,
        isWide: Boolean(item.is_wide),
        projectUrl: item.project_url || "#",
      }));
    }

    // Map skills
    let skills: SkillItem[] = defaultSkills;
    if (skillsRes.data && skillsRes.data.length > 0) {
      skills = skillsRes.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        percent: item.percent,
        iconUrl: item.icon_url,
      }));
    }

    // Map services
    let services: ServiceItem[] = defaultServices;
    if (servicesRes.data && servicesRes.data.length > 0) {
      services = servicesRes.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        icon: item.icon || "las la-bezier-curve",
        projectCount: `${item.project_count || 0} Projects`,
      }));
    }

    // Map experiences
    let experiences: ExperienceItem[] = defaultExperiences;
    if (experiencesRes.data && experiencesRes.data.length > 0) {
      // Group by period or map directly
      experiences = experiencesRes.data.map((item: any) => ({
        id: item.id,
        period: item.period,
        roles: [
          {
            title: item.title,
            company: item.company,
          },
        ],
      }));
    }

    // Map testimonials
    let testimonials: TestimonialItem[] = defaultTestimonials;
    if (testimonialsRes.data && testimonialsRes.data.length > 0) {
      testimonials = testimonialsRes.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        role: item.role,
        company: item.company,
        avatarUrl: item.avatar_url,
        quote: item.quote,
        projectUrl: "#",
      }));
    }

    // Map client brands
    let clientBrands: ClientBrand[] = defaultClientBrands;
    if (brandsRes.data && brandsRes.data.length > 0) {
      clientBrands = brandsRes.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        logoUrl: item.logo_url,
      }));
    }

    // Map pricing plans
    let pricingPlans: PricingPlan[] = defaultPricingPlans;
    if (pricingRes.data && pricingRes.data.length > 0) {
      pricingPlans = pricingRes.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        subtitle: item.tagline,
        price: `$${item.price}`,
        unit: `/ ${item.billing_period || "hour"}`,
        features: item.features || [],
        isPopular: Boolean(item.is_popular),
      }));
    }

    return {
      personalInfo,
      stats,
      experiences,
      services,
      skills,
      projects,
      testimonials,
      clientBrands,
      pricingPlans,
    };
  } catch (error) {
    console.error("Error fetching portfolio data from Supabase:", error);
    return {
      personalInfo: defaultPersonalInfo,
      stats: defaultStats,
      experiences: defaultExperiences,
      services: defaultServices,
      skills: defaultSkills,
      projects: defaultProjects,
      testimonials: defaultTestimonials,
      clientBrands: defaultClientBrands,
      pricingPlans: defaultPricingPlans,
    };
  }
}

export async function submitContactMessage(messageData: {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  budget?: string;
  message: string;
  attachmentUrl?: string;
}) {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: "Supabase is not configured." };
  }

  const { data, error } = await supabase.from("contact_messages").insert([
    {
      full_name: messageData.fullName,
      email: messageData.email,
      phone: messageData.phone || null,
      subject: messageData.subject || null,
      budget: messageData.budget || null,
      message: messageData.message,
      attachment_url: messageData.attachmentUrl || null,
    },
  ]);

  if (error) {
    console.error("Error inserting contact message:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
