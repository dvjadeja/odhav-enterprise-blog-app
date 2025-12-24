"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className='z-10 w-full border-b bg-transparent backdrop-blur-3xl supports-backdrop-filter:bg-background/60'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4 md:px-6'>
        {/* Logo */}
        <Link href='/' className='flex items-center space-x-2'>
          <div className='flex flex-col'>
            <span className='text-xl font-bold text-primary'>
              Odhav Enterprise
            </span>
            <span className='text-xs text-muted-foreground'>
              Renewable Energy Solutions
            </span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className='hidden md:flex flex-1 max-w-md mx-8'>
          <div className='relative w-full'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search projects...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pl-10 w-full'
            />
          </div>
        </div>

        {/* Login Button */}
        <div className='flex items-center gap-4'>
          <Button variant='outline' asChild>
            <Link href='/dashboard'>Login</Link>
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className='md:hidden border-t px-4 py-2'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Search projects...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='pl-10 w-full'
          />
        </div>
      </div>
    </header>
  );
}
