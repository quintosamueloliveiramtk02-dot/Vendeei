import React from 'react';
import { ArrowUpRight, ChevronUp } from 'lucide-react';

export interface Product {
  id: string | number;
  title: string;
  description: string;
  price: number;
  image_url: string;
  affiliate_url: string;
  upvotes: number;
  category?: string;
  isUpvoted?: boolean;
}

interface ProductCardProps {
  key?: React.Key;
  id: string | number;
  title: string;
  description: string;
  price: number;
  image_url: string;
  affiliate_url: string;
  upvotes: number;
  isUpvoted?: boolean;
  onUpvote?: (id: string | number) => void;
}

export default function ProductCard({
  id,
  title,
  description,
  price,
  image_url,
  affiliate_url,
  upvotes,
  isUpvoted = false,
  onUpvote,
}: ProductCardProps) {
  
  // Format the price beautifully as Brazilian Real currency (R$)
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);

  return (
    <article 
      className="group flex flex-col bg-white border border-neutral-200 hover:border-black p-3 rounded-lg transition-all duration-300 md:hover:-translate-y-1"
      id={`product-card-${id}`}
    >
      {/* Product Image Panel */}
      <div className="aspect-[4/5] bg-neutral-50 rounded-md overflow-hidden relative mb-4">
        <img 
          src={image_url} 
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
        />
        
        {/* Upvote Interactive Badge */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onUpvote) onUpvote(id);
          }}
          className={`absolute top-3 right-3 flex flex-col items-center justify-center p-2 min-w-[44px] rounded border transition-colors cursor-pointer ${
            isUpvoted 
              ? 'bg-black border-black text-white' 
              : 'bg-white border-neutral-200 text-neutral-800 hover:border-black hover:text-black'
          }`}
          aria-label={`Votar em ${title}`}
        >
          <ChevronUp className={`w-5 h-5 ${isUpvoted ? 'text-white' : 'text-neutral-500'}`} />
          <span className="font-geist font-semibold text-xs tracking-wide leading-tight mt-0.5">
            {upvotes}
          </span>
        </button>
      </div>

      {/* Product Description Panel */}
      <div className="flex flex-col flex-grow">
        <h3 className="font-geist text-lg font-semibold text-neutral-900 group-hover:text-black mb-1 line-clamp-1 transition-colors">
          {title}
        </h3>
        
        <p className="text-neutral-500 text-xs font-sans leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Price & Affiliate Link Alignment */}
        <div className="mt-auto flex items-center justify-between pt-1 border-t border-dashed border-neutral-100">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold font-geist">Preço</span>
            <span className="font-geist text-base font-bold text-neutral-900">
              {formattedPrice}
            </span>
          </div>

          <a 
            href={affiliate_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-black text-white hover:bg-neutral-800 text-xs font-geist font-bold tracking-wide uppercase px-4 py-2.5 rounded flex items-center gap-1.5 transition-all duration-200"
          >
            <span>Ver Oferta</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
