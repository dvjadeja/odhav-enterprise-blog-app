"use client";

import { useState, useEffect, useMemo } from "react";
import { Article, getAllArticles } from "@/lib/data/articles";
import BlogCard from "./BlogCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export default function BlogListing() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [displayedCount, setDisplayedCount] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "ongoing" | "completed">("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");

  const allArticles = useMemo(() => getAllArticles(), []);

  // Get unique locations
  const locations = useMemo(() => {
    const locs = new Set(allArticles.map((a) => a.location));
    return Array.from(locs).sort();
  }, [allArticles]);

  // Filter articles
  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchesSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || article.status === statusFilter;
      const matchesLocation = locationFilter === "all" || article.location === locationFilter;

      return matchesSearch && matchesStatus && matchesLocation;
    });
  }, [allArticles, searchQuery, statusFilter, locationFilter]);

  // Load more articles
  useEffect(() => {
    setArticles(filteredArticles.slice(0, displayedCount));
  }, [filteredArticles, displayedCount]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 1000 &&
        displayedCount < filteredArticles.length
      ) {
        setDisplayedCount((prev) => Math.min(prev + 6, filteredArticles.length));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayedCount, filteredArticles.length]);

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setLocationFilter("all");
  };

  const hasActiveFilters = searchQuery !== "" || statusFilter !== "all" || locationFilter !== "all";

  return (
    <section className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Projects</h2>
        <p className="text-muted-foreground">
          Explore our portfolio of renewable energy projects across India
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects by title, description, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              <option value="all">All</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Location Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Location:</label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm min-w-[200px]"
            >
              <option value="all">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          )}

          {/* Results Count */}
          <div className="ml-auto text-sm text-muted-foreground">
            Showing {articles.length} of {filteredArticles.length} projects
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <BlogCard key={article._id} article={article} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
          {hasActiveFilters && (
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      )}

      {/* Load More Indicator */}
      {displayedCount < filteredArticles.length && (
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Scroll down to load more projects...
          </p>
        </div>
      )}
    </section>
  );
}
