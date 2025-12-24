"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Article } from "@/lib/data/articles";
import { MapPin, Calendar, CheckCircle2, Clock } from "lucide-react";

interface BlogCardProps {
  article: Article;
  index?: number;
}

export default function BlogCard({ article, index = 0 }: BlogCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card
      ref={cardRef}
      className={`group overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full p-0 gap-0 ${
        isVisible
          ? "animate-fade-in-up opacity-100"
          : "opacity-0 translate-y-4"
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      <Link href={`/articles/${article.slug}`} className='flex flex-col h-full'>
        {/* Image - No padding, flush with top edge of card */}
        <div className='relative w-full h-48 md:h-56 overflow-hidden bg-muted'>
          <Image
            src={
              article.featuredImage || article.images?.[0] || "/placeholder.jpg"
            }
            alt={article.title}
            fill
            className='object-cover group-hover:scale-105 transition-transform duration-300'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
          <div className='absolute top-4 right-4'>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                article.status === "ongoing"
                  ? "bg-yellow-500/90 text-yellow-900"
                  : "bg-green-500/90 text-green-900"
              }`}
            >
              {article.status === "ongoing" ? (
                <>
                  <Clock className='h-3 w-3' />
                  Ongoing
                </>
              ) : (
                <>
                  <CheckCircle2 className='h-3 w-3' />
                  Completed
                </>
              )}
            </span>
          </div>
        </div>

        {/* Content Container - Flex to push footer to bottom */}
        <div className='flex flex-col flex-1 px-6 pt-6 pb-6'>
          <CardHeader className='p-0 pb-4 shrink-0'>
            <h3 className='text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors min-h-14'>
              {article.title}
            </h3>
            <p className='text-muted-foreground text-sm line-clamp-3 overflow-hidden text-ellipsis min-h-18'>
              {article.description}
            </p>
          </CardHeader>

          <CardContent className='p-0 pb-4 space-y-2 shrink-0 min-h-[60px]'>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <MapPin className='h-4 w-4 shrink-0' />
              <span className='line-clamp-1'>{article.location}</span>
            </div>
            {article.projectValue &&
            article.projectValue !== "Not specified" ? (
              <div className='text-sm font-medium text-primary line-clamp-1'>
                Project Value: {article.projectValue}
              </div>
            ) : (
              <div className='text-sm font-medium text-primary line-clamp-1 opacity-0'>
                {/* Invisible placeholder to maintain consistent height */}
                &nbsp;
              </div>
            )}
          </CardContent>

          {/* Footer - Always aligned at bottom */}
          <CardFooter className='p-0 mt-auto pt-4 border-t flex items-center justify-between text-xs text-muted-foreground'>
            <div className='flex items-center gap-1.5'>
              <Calendar className='h-3.5 w-3.5 shrink-0' />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <span className='text-primary font-medium group-hover:underline'>
              Read More →
            </span>
          </CardFooter>
        </div>
      </Link>
    </Card>
  );
}
