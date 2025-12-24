import { getFeaturedArticles, getAllArticles } from "@/lib/data/articles";

export default function StructuredData() {
  const featuredArticles = getFeaturedArticles();
  const allArticles = getAllArticles();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Odhav Enterprise",
    description:
      "Leading provider of renewable energy construction and infrastructure solutions across India",
    url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    logo: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/logo.png`,
    sameAs: [
      "https://www.linkedin.com/company/odhav-enterprise",
      "https://twitter.com/odhaventerprise",
      "https://www.facebook.com/odhaventerprise",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-123-456-7890",
      contactType: "Customer Service",
      email: "info@odhaventerprise.com",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "Gujarat",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Odhav Enterprise",
    url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Projects",
    description: "Featured renewable energy projects by Odhav Enterprise",
    itemListElement: featuredArticles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Article",
        headline: article.title,
        description: article.description,
        image: article.featuredImage || article.images?.[0],
        datePublished: article.publishedAt,
        author: {
          "@type": "Organization",
          name: "Odhav Enterprise",
        },
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
