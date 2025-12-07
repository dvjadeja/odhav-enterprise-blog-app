import Article from '@/lib/models/Article';
import { ArticleQueryParams } from '@/lib/types/api';

/**
 * MongoDB query type compatible with Mongoose
 */
type ArticleQuery = {
  published?: boolean;
  clients?: { $in: string[] };
  projectTypes?: { $in: string[] };
  status?: 'ongoing' | 'completed';
  $text?: { $search: string };
  [key: string]: unknown; // Allow additional Mongoose query operators
};

/**
 * Build MongoDB query from API query parameters
 */
export function buildArticleQuery(params: ArticleQueryParams): ArticleQuery {
  const query: ArticleQuery = {};

  // Published filter
  if (params.published === undefined || params.published === null) {
    query.published = true; // Default: only published articles
  } else if (params.published === 'false') {
    query.published = false;
  } else if (params.published === 'all') {
    // Show all articles (for admin)
    delete query.published;
  }

  // Filter by client
  if (params.client) {
    const clientIds = params.client.split(',').filter((id) => id.trim());
    if (clientIds.length > 0) {
      query.clients = { $in: clientIds };
    }
  }

  // Filter by project type
  if (params.projectType) {
    const projectTypeIds = params.projectType
      .split(',')
      .filter((id) => id.trim());
    if (projectTypeIds.length > 0) {
      query.projectTypes = { $in: projectTypeIds };
    }
  }

  // Filter by status
  if (params.status && (params.status === 'ongoing' || params.status === 'completed')) {
    query.status = params.status;
  }

  // Text search
  if (params.search) {
    query.$text = { $search: params.search };
  }

  return query;
}

/**
 * Build sort object from query parameters
 */
export function buildSortObject(
  sortBy?: string,
  sortOrder?: string
): Record<string, 1 | -1> {
  const sort: Record<string, 1 | -1> = {};

  if (sortBy === 'title') {
    sort.title = sortOrder === 'asc' ? 1 : -1;
  } else if (sortBy === 'publishedAt') {
    sort.publishedAt = sortOrder === 'asc' ? 1 : -1;
  } else if (sortBy === 'createdAt') {
    sort.createdAt = sortOrder === 'asc' ? 1 : -1;
  } else {
    sort.publishedAt = -1; // Default sort
  }

  return sort;
}

/**
 * Get unique values for filters (clients, project types, etc.)
 */
export async function getFilterOptions() {
  const clients = await Article.distinct('clients');
  const projectTypes = await Article.distinct('projectTypes');
  const statuses = await Article.distinct('status');

  return {
    clients,
    projectTypes,
    statuses,
  };
}

