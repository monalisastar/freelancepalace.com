// app/data.ts

export interface Testimonial {
  name: string;
  message: string;
  avatar?: string;
}

export interface Service {
  slug: string;
  name: string;
  description: string;
  image: string;
  testimonials: Testimonial[];
}

export const services: Service[] = [
  {
    slug: "graphic-design",
    name: "Graphic Design",
    description:
      "Get high-quality logos, social media assets, posters, and branding materials crafted by professional designers.",
    image: "/images/graphic-design.jpeg",
    testimonials: [
      {
        name: "Sarah K.",
        message: "Absolutely loved the logo design—clean, creative, and exactly what I needed.",
      },
      {
        name: "Tom B.",
        message: "Their attention to brand identity was spot-on. Will use again!",
      },
    ],
  },
  {
    slug: "anime-art",
    name: "Anime Art & Characters",
    description:
      "Custom anime-style characters and illustrations for games, avatars, or digital branding.",
    image: "/images/anime-character.png",
    testimonials: [
      {
        name: "Lina A.",
        message: "The anime avatar exceeded my expectations. So cute and detailed!",
      },
      {
        name: "Kenji M.",
        message: "Perfect for my VTuber channel. Fast delivery too!",
      },
    ],
  },
  {
    slug: "copywriting",
    name: "Copywriting",
    description:
      "Engaging and persuasive content for websites, ads, and social media. Tailored messaging that converts.",
    image: "/images/copywriting.jpeg",
    testimonials: [
      {
        name: "Mike L.",
        message: "Professional copy that boosted our conversions by 30%. Worth every penny.",
      },
    ],
  },
  {
    slug: "seo",
    name: "SEO Optimization",
    description:
      "Improve your Google rankings with expert keyword research, on-page optimization, and audit services.",
    image: "/images/seo.jpeg",
    testimonials: [
      {
        name: "Anna G.",
        message: "We're finally ranking on page 1. Amazing results after just a few weeks!",
      },
    ],
  },
  {
    slug: "fullstack-dev",
    name: "Full Stack Development",
    description:
      "Build scalable web apps from frontend to backend using modern frameworks and industry best practices.",
    image: "/images/fullstack-dev.jpeg",
    testimonials: [
      {
        name: "David C.",
        message: "Top-tier work on our SaaS platform. Clear communication and clean code.",
      },
    ],
  },
  {
    slug: "mobile-app",
    name: "Mobile App Development",
    description:
      "iOS and Android development using Flutter, React Native, or native SDKs. From MVP to production.",
    image: "/images/mobile-app.jpeg",
    testimonials: [
      {
        name: "Emma J.",
        message: "They built our cross-platform app in record time and under budget.",
      },
    ],
  },
  {
    slug: "ui-ux",
    name: "UI/UX Design",
    description:
      "Modern, user-friendly designs and prototypes for web and mobile apps. Figma, Adobe XD & more.",
    image: "/images/ui-ux.jpeg",
    testimonials: [
      {
        name: "Lucas F.",
        message: "Fantastic user experience—our users love the redesign!",
      },
    ],
  },
  {
    slug: "video-editing",
    name: "Video Editing",
    description:
      "Cinematic, social, or corporate edits using Premiere Pro, After Effects, and more.",
    image: "/images/video-editing.jpeg",
    testimonials: [
      {
        name: "Nina Z.",
        message: "The edit made my brand reel go viral. Great pacing and effects.",
      },
    ],
  },
  {
    slug: "web-development",
    name: "Web Development",
    description:
      "Responsive and performant websites using Next.js, React, TailwindCSS, and other modern stacks.",
    image: "/images/web-development.jpeg",
    testimonials: [
      {
        name: "Jake P.",
        message: "Smooth experience and pixel-perfect delivery. Highly recommend.",
      },
    ],
  },
];

