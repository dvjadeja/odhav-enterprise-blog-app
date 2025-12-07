import { ArticlesListResponse } from "@/lib/types/api";

export async function getArticles() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json() as Promise<ArticlesListResponse>;
}
