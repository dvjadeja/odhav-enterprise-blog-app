import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Article from '@/lib/models/Article';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;

    // Query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const client = searchParams.get('client') || '';
    const projectType = searchParams.get('projectType') || '';
    const status = searchParams.get('status') || '';
    const published = searchParams.get('published'); // For admin access
    const sortBy = searchParams.get('sortBy') || 'publishedAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Define a specific type for the query object (compatible with Mongoose)
    type ArticleQuery = {
      published?: boolean;
      clients?: { $in: string[] };
      projectTypes?: { $in: string[] };
      status?: 'ongoing' | 'completed';
      $text?: { $search: string };
      [key: string]: unknown; // Allow additional Mongoose query operators
    };

    // Build query with explicit typing
    const query: ArticleQuery = {};

    // Only show published articles by default (unless admin specifies otherwise)
    if (published === null || published === undefined) {
      query.published = true;
    } else if (published === 'false') {
      query.published = false;
    } else if (published === 'all') {
      // Show all articles (for admin)
      delete query.published;
    }

    // Filter by client (can be comma-separated IDs)
    if (client) {
      const clientIds = client.split(',').filter((id) => id.trim());
      if (clientIds.length > 0) {
        query.clients = { $in: clientIds };
      }
    }

    // Filter by project type (can be comma-separated IDs)
    if (projectType) {
      const projectTypeIds = projectType.split(',').filter((id) => id.trim());
      if (projectTypeIds.length > 0) {
        query.projectTypes = { $in: projectTypeIds };
      }
    }

    // Filter by status
    if (status && (status === 'ongoing' || status === 'completed')) {
      query.status = status;
    }

    // Text search across title, description, and content
    if (search) {
      query.$text = { $search: search };
    }

    // Build sort object with proper typing
    type SortObject = Record<string, 1 | -1>;
    const sort: SortObject = {};
    if (sortBy === 'title') {
      sort.title = sortOrder === 'asc' ? 1 : -1;
    } else if (sortBy === 'publishedAt') {
      sort.publishedAt = sortOrder === 'asc' ? 1 : -1;
    } else if (sortBy === 'createdAt') {
      sort.createdAt = sortOrder === 'asc' ? 1 : -1;
    } else {
      sort.publishedAt = -1; // Default sort
    }

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Execute query with population
    const articles = await Article.find(query)
      .populate('clients', 'name slug logo website')
      .populate('projectTypes', 'name slug description')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Article.countDocuments(query);

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json(
      {
        success: true,
        data: articles,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage,
          hasPrevPage,
        },
        filters: {
          search,
          client,
          projectType,
          status,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch articles',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

