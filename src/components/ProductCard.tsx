import React, { memo, useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { FiShoppingBag, FiHeart, FiEye, FiCheck } from 'react-icons/fi';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  index: number;
  addToCart: (product: Product) => void;
  onReadMore: (product: Product) => void;
}

const BADGE_CONFIG: Record<string, { bg: string; text: string; dot: string }> = {
  'Bestseller': { bg: '#fef6e8', text: '#a06c10', dot: '#e8a020' },
  'New': { bg: '#eaf5e8', text: '#2e6b30', dot: '#4a9c4e' },
  'Premium': { bg: '#f0edfa', text: '#4a3a9a', dot: '#7060c0' },
  'Trending': { bg: '#fef0e8', text: '#a04828', dot: '#d46030' },
  'Wedding Special': { bg: '#fdf0f0', text: '#8a2a2a', dot: '#c04848' },
  'Combo': { bg: '#e8f0fe', text: '#2848a0', dot: '#4060d0' },
};

const Stars: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map(i => {
      const filled = i <= Math.floor(rating);
      const half = !filled && i === Math.ceil(rating) && rating % 1 !== 0;
      return filled
        ? <FaStar key={i} className="text-[#c49a3c] text-[10px]" />
        : half
          ? <FaStarHalfAlt key={i} className="text-[#c49a3c] text-[10px]" />
          : <FaRegStar key={i} className="text-[#d4dccc] text-[10px]" />;
    })}
  </div>
);

const ProductCard: React.FC<ProductCardProps> = memo(({ product, addToCart, onReadMore }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (added) return;
    setAdded(true);
    addToCart(product);
    setTimeout(() => setAdded(false), 2200);
  };

  const badge = product.badge ? BADGE_CONFIG[product.badge] : null;

  return (
    <article
      className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer"
      style={{
        transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s cubic-bezier(0.22,1,0.36,1)',
        transform: hovered ? 'translateY(-6px) scale(1.005)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? '0 24px 64px rgba(28,28,26,0.13), 0 4px 16px rgba(28,28,26,0.07)'
          : '0 1px 3px rgba(28,28,26,0.07), 0 0 0 1px rgba(28,28,26,0.055)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onReadMore(product)}
      aria-label={`View ${product.description}`}
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden bg-[#f0f5ea]" style={{ aspectRatio: '3/4' }}>
        <img
          src={product.image}
          alt={product.description}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{
            transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />

        {/* Dark gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1a]/55 via-[#1c1c1a]/10 to-transparent"
          style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.35s ease' }} />

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.16em]"
              style={{ background: badge.bg, color: badge.text }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: badge.dot }} />
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={e => { e.stopPropagation(); setWishlisted(w => !w); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.12)' }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
          <FiHeart
            size={14}
            className="transition-colors duration-200"
            style={{ color: wishlisted ? '#c04848' : '#6a7a60', fill: wishlisted ? '#c04848' : 'none' }}
          />
        </button>

        {/* Quick-view pill (hover) */}
        <div className="absolute bottom-3 inset-x-3"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.3s ease' }}>
          <button
            onClick={e => { e.stopPropagation(); onReadMore(product); }}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/95 backdrop-blur-sm rounded-xl text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2e3c27] hover:bg-white transition-all">
            <FiEye size={13} /> Quick View
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-4">
        {/* Category tag */}
        <div className="inline-flex items-center gap-1.5 mb-2.5">
          <span className="w-3 h-px bg-[#8aaa78]" />
          <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8aaa78]">{product.category}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif font-semibold text-[13.5px] text-[#1c1c1a] line-clamp-2 leading-snug mb-2.5">
          {product.description}
        </h3>

        {/* Stars + review count */}
        <div className="flex items-center gap-2 mb-3.5">
          <Stars rating={product.rating ?? 4.5} />
          <span className="text-[10px] text-[#8aaa78] font-medium">
            {product.reviewCount?.toLocaleString() ?? '2.3k'} reviews
          </span>
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between pt-3 border-t border-[#eaf0e2]">
          <div>
            <div className="text-[12px] font-semibold text-[#2e3c27]">Price on Request</div>
            <div className="text-[9.5px] text-[#6aaa58] font-medium mt-0.5">✓ Free delivery available</div>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300"
            style={{
              background: added ? '#3a7a3a' : '#2e3c27',
              color: '#ffffff',
              transform: added ? 'scale(0.95)' : 'scale(1)',
              boxShadow: added ? 'none' : '0 3px 12px rgba(46,60,39,0.25)',
            }}
            aria-label="Add to enquiry cart">
            {added
              ? <><FiCheck size={12} /> Added</>
              : <><FiShoppingBag size={12} /> Enquire</>
            }
          </button>
        </div>
      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;
