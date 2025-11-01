import { Article } from '../data/articles';
import { useNavigate } from 'react-router-dom';

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  const navigate = useNavigate();

  if (articles.length === 0) return null;

  return (
    <section className="mt-16 border-t-2 border-gray-200 pt-12">
      <h3 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article
            key={article.id}
            onClick={() => navigate(`/article/${article.slug}`)}
            className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="relative overflow-hidden h-40">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className={`absolute top-3 left-3 ${article.categoryColor === 'blue' ? 'bg-[#006ABA]' : 'bg-[#E60000]'} text-white px-3 py-1 text-xs font-bold uppercase tracking-wide`}>
                {article.category}
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#006ABA] transition-colors duration-200 line-clamp-2">
                {article.title}
              </h4>
              <p className="text-gray-600 text-sm line-clamp-2">
                {article.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
