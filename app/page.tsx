import { Button } from "@/components/ui/button";
import { getArticles } from "@/lib/actions/article";

export default async function ArticlesListingPage() {
  const articles = await getArticles();
  console.log(articles);
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
