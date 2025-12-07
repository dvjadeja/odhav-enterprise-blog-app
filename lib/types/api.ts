import { IArticle } from '../models/Article';
import { IClient } from '../models/Client';
import { IProjectType } from '../models/ProjectType';

export interface ArticleWithPopulatedFields extends Omit<IArticle, 'clients' | 'projectTypes'> {
  clients: IClient[];
  projectTypes: IProjectType[];
}

export interface ArticlesListResponse {
  success: boolean;
  data: ArticleWithPopulatedFields[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    search?: string;
    client?: string;
    projectType?: string;
    status?: string;
  };
}

export interface ArticleQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  client?: string;
  projectType?: string;
  status?: 'ongoing' | 'completed';
  published?: 'true' | 'false' | 'all';
  sortBy?: 'title' | 'publishedAt' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

