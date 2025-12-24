import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlugOrId } from "@/lib/data/articles";

export const dynamic = "force-static";
export const dynamicParams = false;

type PageProps = {
  params: Promise<{ id: string }>;
};

function formatDate(dateString?: string) {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function readingTimeMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function toParagraphs(content: string) {
  const parts = content
    .split(/\n{2,}/g)
    .map((p) => p.trim())
    .filter(Boolean);
  return parts.length ? parts : [content];
}

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ id: a.slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { id } = await props.params;
  const article = getArticleBySlugOrId(id);

  if (!article) {
    return {
      title: "Project not found",
      robots: { index: false, follow: false },
    };
  }

  const title = article.metaTitle || article.title;
  const description = article.metaDescription || article.description;
  const canonical = `/articles/${article.slug}`;
  const images = [article.featuredImage, article.images?.[0]].filter(
    (x): x is string => Boolean(x)
  );

  return {
    title,
    description,
    keywords: article.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Odhav Enterprise",
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: images.length
        ? images.map((url) => ({ url, alt: article.title }))
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.length ? images : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function ArticleDetailPage(props: PageProps) {
  const { id } = await props.params;
  const article = getArticleBySlugOrId(id);

  if (!article) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const canonicalUrl = `${baseUrl}/articles/${article.slug}`;
  const featuredSrc = article.featuredImage || article.images?.[0] || "";
  const minutes = readingTimeMinutes(article.content);

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${baseUrl}/#projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonicalUrl,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription || article.description,
    image: [article.featuredImage, ...(article.images || [])].filter(Boolean),
    datePublished: article.publishedAt || article.createdAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: "Odhav Enterprise",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Odhav Enterprise",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    keywords: (article.keywords || []).join(", "),
  };

  const more = getAllArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="min-h-screen flex flex-col">
        <header className="border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
          <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-bold tracking-tight">
              Odhav Enterprise
            </Link>
            <nav className="text-sm text-muted-foreground">
              <Link href="/#projects" className="hover:text-foreground transition-colors">
                Projects
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          <article className="container mx-auto px-4 md:px-6 py-10 md:py-14">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <div className="text-sm text-muted-foreground mb-2">
                  <Link href="/" className="hover:text-foreground transition-colors">
                    Home
                  </Link>{" "}
                  <span aria-hidden="true">/</span>{" "}
                  <Link href="/#projects" className="hover:text-foreground transition-colors">
                    Projects
                  </Link>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                  {article.title}
                </h1>
                <p className="mt-3 text-base md:text-lg text-muted-foreground">
                  {article.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 font-medium ${
                      article.status === "ongoing"
                        ? "bg-yellow-500/15 text-yellow-800"
                        : "bg-green-500/15 text-green-800"
                    }`}
                  >
                    {article.status === "ongoing" ? "Ongoing" : "Completed"}
                  </span>
                  <span className="inline-flex items-center rounded-full px-3 py-1 bg-muted text-muted-foreground">
                    {article.location}
                  </span>
                  {article.projectValue && article.projectValue !== "Not specified" ? (
                    <span className="inline-flex items-center rounded-full px-3 py-1 bg-muted text-muted-foreground">
                      Project Value: {article.projectValue}
                    </span>
                  ) : null}
                </div>

                <dl className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="rounded-lg border bg-card px-4 py-3">
                    <dt className="text-muted-foreground">Published</dt>
                    <dd className="font-medium">
                      <time dateTime={article.publishedAt || article.createdAt}>
                        {formatDate(article.publishedAt || article.createdAt)}
                      </time>
                    </dd>
                  </div>
                  <div className="rounded-lg border bg-card px-4 py-3">
                    <dt className="text-muted-foreground">Updated</dt>
                    <dd className="font-medium">
                      <time dateTime={article.updatedAt}>
                        {formatDate(article.updatedAt)}
                      </time>
                    </dd>
                  </div>
                  <div className="rounded-lg border bg-card px-4 py-3">
                    <dt className="text-muted-foreground">Reading time</dt>
                    <dd className="font-medium">{minutes} min</dd>
                  </div>
                </dl>
              </div>

              {featuredSrc ? (
                <div className="relative w-full aspect-video overflow-hidden rounded-2xl border bg-muted mb-8">
                  <Image
                    src={featuredSrc}
                    alt={article.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full aspect-video rounded-2xl border bg-muted mb-8" />
              )}

              <div className="prose prose-neutral max-w-none dark:prose-invert">
                {toParagraphs(article.content).map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {article.images && article.images.length > 1 ? (
                <section className="mt-10">
                  <h2 className="text-xl font-semibold mb-4">Project Gallery</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {article.images
                      .filter((src) => src && src !== featuredSrc)
                      .slice(0, 6)
                      .map((src) => (
                        <div
                          key={src}
                          className="relative w-full aspect-4/3 overflow-hidden rounded-xl border bg-muted"
                        >
                          <Image
                            src={src}
                            alt={`${article.title} - image`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      ))}
                  </div>
                </section>
              ) : null}

              {more.length ? (
                <section className="mt-12 border-t pt-10">
                  <h2 className="text-xl font-semibold mb-4">More Projects</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {more.map((a) => (
                      <li key={a.slug} className="rounded-xl border bg-card p-4">
                        <Link
                          href={`/articles/${a.slug}`}
                          className="font-semibold hover:underline"
                        >
                          {a.title}
                        </Link>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                          {a.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          </article>
        </main>

        <footer className="border-t">
          <div className="container mx-auto px-4 md:px-6 py-8 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Odhav Enterprise. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
