"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Article } from "@/lib/data/articles";
import Image from "next/image";
import Link from "next/link";

interface FeaturedCarouselProps {
  articles: Article[];
}

export default function FeaturedCarousel({ articles }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("right");
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % articles.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [articles.length]);

  const goToPrevious = () => {
    setDirection("left");
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToNext = () => {
    setDirection("right");
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  if (articles.length === 0) return null;

  const currentArticle = articles[currentIndex];

  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-linear-to-br from-primary/10 to-primary/5">
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {/* Image Background with fade animation */}
        <div className="absolute inset-0">
          <Image
            src={currentArticle.featuredImage || currentArticle.images?.[0] || "/placeholder.jpg"}
            alt={currentArticle.title}
            fill
            className={`object-cover transition-opacity duration-500 ease-in-out ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
            priority={currentIndex === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Content with slide animation */}
        <div className="relative z-2 container mx-auto h-full flex items-center px-4 md:px-6">
          <div
            className={`max-w-2xl text-white transition-all duration-500 ease-in-out ${
              isTransitioning
                ? direction === "right"
                  ? "translate-x-8 opacity-0"
                  : "-translate-x-8 opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            <div className="mb-4 animate-fade-in">
              <span className="inline-block px-3 py-1 text-sm font-semibold bg-primary/90 text-primary-foreground rounded-full animate-slide-down [animation-delay:100ms]">
                {currentArticle.status === "ongoing" ? "Ongoing Project" : "Completed Project"}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fade-in [animation-delay:200ms]">
              {currentArticle.title}
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-200 line-clamp-3 animate-fade-in [animation-delay:300ms]">
              {currentArticle.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in [animation-delay:400ms]">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span>📍</span>
                <span>{currentArticle.location}</span>
              </div>
              {currentArticle.projectValue && (
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span>💰</span>
                  <span>{currentArticle.projectValue}</span>
                </div>
              )}
            </div>
            <div className="mt-8 animate-fade-in [animation-delay:500ms]">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 transition-transform hover:scale-105">
                <Link href={`/articles/${currentArticle.slug}`}>
                  View Project Details
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-3 bg-black/50 hover:bg-black/70 text-white rounded-full h-12 w-12"
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-3 bg-black/50 hover:bg-black/70 text-white rounded-full h-12 w-12"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-3 flex gap-2">
          {articles.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
