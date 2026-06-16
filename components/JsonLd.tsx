"use client";

import { useEffect } from "react";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KRELIMEDIA",
  url: "https://krelimedia.com",
  logo: "https://krelimedia.com/avatar.png",
  description:
    "Full-service digital marketing agency delivering ROI-driven campaigns, social media management, and creative content.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+92-332-4448164",
    contactType: "sales",
    availableLanguage: ["English", "Urdu"],
  },
  sameAs: [
    "https://www.facebook.com/krelimedia/",
    "https://www.instagram.com/krelimedia/",
    "https://twitter.com/krelimedia",
    "https://linkedin.com/company/krelimedia",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Office No.2, Naseem Arcade",
    addressCountry: "PK",
  },
};

export default function JsonLd() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "json-ld-organization";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById("json-ld-organization");
      if (existing) existing.remove();
    };
  }, []);

  return null;
}