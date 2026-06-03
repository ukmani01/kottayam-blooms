import React, { useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSearch, FiX, FiSliders, FiShoppingBag } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt, FaLeaf } from 'react-icons/fa';
import ProductCard from "../components/ProductCard";
import type { Product, CategoryType } from '../types';

/* ── Image Imports (unchanged) ── */
import img0 from '../ok1/img.jpeg';
import img1 from '../ok1/img15.png';
import img2 from '../ok1/img3.jpg';
import img3 from '../ok1/img16.jpg';
import img4 from '../ok1/img4.png';
import img5 from '../ok1/img5.png';
import img6 from '../ok1/img1.jpeg';
import img7 from '../cakeimg/cake2.png';
import img8 from '../ok1/img8.png';
import img9 from '../ok1/img9.jpg';
import img10 from '../ok1/img10.jpg';
import img11 from '../ok1/img11.jpg';
import img12 from '../ok1/img12.jpg';
import img13 from '../ok1/img13.jpg';
import img14 from '../ok1/img14.png';
import pyramid from "../ok1/pyramid.jpg";
import white from "../ok1/pyramid-shaped.png";
import dense from "../ok1/dense.jpg";
import whitewedding from "../ok1/white-chrysanthemums,.png";
import sympothimage from "../ok1/Gemini_Generated_Image_b5xfkbb5xfkbb5xf.jpg";
import sypothimage2 from "../ok1/Gemini_Generated_Image_waxrf5waxrf5waxr.jpg";

function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

const PRODUCTS: Product[] = [
  { id: 0, price: 0, image: img0, description: 'Vibrant Gerbera and Rose mixed bouquet', category: 'Birthday', badge: 'Bestseller', rating: 4.9, reviewCount: 234 },
  { id: 1, price: 0, image: img1, description: 'Classic red rose bouquet with baby\'s breath', category: 'Roses', rating: 4.8, reviewCount: 189 },
  { id: 2, price: 0, image: img2, description: 'Luxury vase with Orchids and Roses arrangement', category: 'Wedding', badge: 'New', rating: 4.9, reviewCount: 456 },
  { id: 3, price: 0, image: img3, description: 'Traditional Wedding flower garlands (Mullai & Samanthi)', category: 'Wedding', badge: 'Premium', rating: 4.7, reviewCount: 312 },
  { id: 4, price: 0, image: img4, description: 'Classic Red Rose hand-tied bouquet wrapped in white', category: 'Roses', rating: 4.6, reviewCount: 98 },
  { id: 5, price: 0, image: img5, description: 'Round pink and white bridal rose bouquet', category: 'Wedding', rating: 4.8, reviewCount: 267 },
  { id: 6, price: 0, image: img6, description: 'Pastel rose and white chrysanthemum bunch', category: 'Birthday', rating: 4.7, reviewCount: 145 },
  { id: 7, price: 0, image: img7, description: 'Birthday cake & Combo', category: 'Birthday', badge: 'New', rating: 5, reviewCount: 389 },
  { id: 8, price: 0, image: img8, description: 'Chocolate and pink rose gift bouquet', category: 'Gifts', rating: 4.6, reviewCount: 421 },
  { id: 9, price: 0, image: img9, description: 'Pink Rose bouquet with Ferrero Rocher gift basket', category: 'Gifts', badge: 'Trending', rating: 4.8, reviewCount: 267 },
  { id: 10, price: 0, image: img10, description: 'Pink Rose bouquet with Birthday Cake combo', category: 'Birthday', badge: 'Combo & Trending', rating: 5, reviewCount: 1523 },
  { id: 11, price: 0, image: img11, description: 'Elegant pink and white rose arrangement', category: 'Anniversary', rating: 4.7, reviewCount: 203 },
  { id: 12, price: 0, image: img12, description: 'Premium Pink Rose bouquet with baby\'s breath', category: 'Roses', rating: 4.5, reviewCount: 112 },
  { id: 13, price: 0, image: img13, description: 'Gift combo with roses and chocolates', category: 'Gifts', badge: 'Combo', rating: 4.8, reviewCount: 678 },
  { id: 14, price: 0, image: img14, description: 'Red Rose and Dairy Milk chocolate basket', category: 'Gifts', badge: 'Wedding Special', rating: 4.9, reviewCount: 456 },
  { id: 15, price: 0, image: pyramid, description: 'Loving Memory Pyramid Floral Tribute - Mixed Roses', category: 'Sympathy', rating: 4.8, reviewCount: 156 },
  { id: 16, price: 0, image: white, description: 'Elegance White Wreath with Pink Cross arrangement', category: 'Sympathy', badge: 'Custom', rating: 4.9, reviewCount: 210 },
  { id: 17, price: 0, image: dense, description: 'Serenity Rose and Lily Casket Sprays', category: 'Sympathy', rating: 4.7, reviewCount: 184 },
  { id: 18, price: 0, image: whitewedding, description: 'Grand White Chrysanthemum Wedding Arrangement', category: 'Wedding', badge: 'New', rating: 4.9, reviewCount: 132 },
  { id: 19, price: 0, image: sympothimage, description: 'Peaceful White Harmony Floral Set', category: 'Sympathy', rating: 4.8, reviewCount: 95 },
  { id: 20, price: 0, image: sypothimage2, description: 'Soothing Grace Sympathy Arrangement', category: 'Sympathy', rating: 4.7, reviewCount: 118 },
];

const CATEGORIES: CategoryType[] = ['All', 'Roses', 'Wedding', 'Birthday', 'Gifts', 'Anniversary', 'Sympathy'];
const SORT_OPTIONS = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'popular', label: 'Most Popular' },
];

interface HomeProps {
  addToCart: (product: Product) => void;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  count: number;
}

const Home: React.FC<HomeProps> = ({ addToCart, setCount }) => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<CategoryType>('All');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedProduct, setSelected] = useState<Product | null>(null);

  const debouncedSearch = useDebounce(search, 280);

  const filtered = useMemo(() => {
    let r = PRODUCTS.filter(p => {
      const matchSearch = p.description.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchCat = activeFilter === 'All' || p.category === activeFilter;
      return matchSearch && matchCat;
    });
    if (sortBy === 'rating') r = [...r].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    if (sortBy === 'popular') r = [...r].sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
    return r;
  }, [debouncedSearch, activeFilter, sortBy]);

  const handleAdd = useCallback((product: Product) => {
    addToCart(product);
    setCount(prev => prev + 1);
  }, [addToCart, setCount]);

  const isFilterActive = search !== '' || activeFilter !== 'All';
  const clearAllFilters = () => {
    setSearch('');
    setActiveFilter('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-1 sm:px-5 lg:px-8 py-6 md:py-10">
      {/* Filter bar */}
      <div className="mb-6">
        <div className="flex flex-col gap-4">
          {/* Category filters */}
          <div className="relative w-full overflow-x-auto md:overflow-visible scrollbar-hide pb-2 -mb-2">
            <div className="flex gap-2 min-w-max md:min-w-0 md:flex-wrap md:justify-start">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  aria-label={`Filter by ${cat}`}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap
                    hover:scale-105 active:scale-95 transform
                    ${activeFilter === cat
                      // ↓ Active: added ring-2 ring-emerald-200/70 ring-offset-1
                      ? 'bg-[#2e3c27] text-white shadow-md shadow-black/5 ring-2 ring-emerald-200/70 ring-offset-1'
                      : 'bg-[#eaf0e2] text-[#445038] hover:bg-[#dfe8d6]'
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Second row: sort + clear filters */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 flex-shrink-0">
              <FiSliders size={14} className="text-[#8aaa78]" />
              {/* ↓ Increased padding to py-2.5 px-4, added hover:bg-[#dfe8d6] transition-colors */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                aria-label="Sort products by"
                className="text-[12px] font-semibold text-[#2e3c27] bg-[#eaf0e2] border-0 rounded-xl py-2.5 px-4 focus:outline-none cursor-pointer appearance-none pr-8 min-h-[38px] hover:bg-[#dfe8d6] transition-colors"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%238aaa78' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 10px center'
                }}
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {isFilterActive && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-medium text-[#8aaa78] hover:text-[#2e3c27] transition-colors flex items-center gap-1"
                aria-label="Clear all filters and search"
              >
                <FiX size={12} /> Clear all filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mb-5">
        <FiSearch size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8aaa78]" />
        {/* ↓ Added focus:ring-2 focus:ring-emerald-200 focus:border-transparent */}
        <input
          type="text"
          placeholder="Search arrangements…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-9 py-2.5 bg-[#eaf0e2] border border-transparent rounded-xl text-[13px] text-[#1c1c1a] placeholder-[#8aaa78] focus:outline-none focus:bg-white focus:border-transparent focus:ring-2 focus:ring-emerald-200 transition-all"
        />
        {search && (
          // ↓ Added hover:scale-110 hover:text-emerald-700 transition
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8aaa78] hover:text-emerald-700 hover:scale-110 transition-all"
          >
            <FiX size={14} />
          </button>
        )}
      </div>

      <p className="text-[11px] text-[#8aaa78] font-medium mb-5">
        Showing <span className="text-[#2e3c27] font-bold">{filtered.length}</span> of <span className="text-[#2e3c27] font-bold">{PRODUCTS.length}</span> arrangements
      </p>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <FaLeaf className="text-5xl text-[#c8d8b8] mb-4" />
          <p className="font-serif font-semibold text-[18px] text-[#3a3830] mb-1">No results found</p>
          <p className="text-[13px] text-[#8aaa78]">Try a different search or browse all flowers</p>
          <button
            onClick={clearAllFilters}
            className="mt-6 px-6 py-2.5 bg-[#2e3c27] text-white text-[12px] font-bold uppercase tracking-wider rounded-xl active:scale-95 transition-all"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        // ↓ Updated gap to gap-5 on md: and above
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
          {filtered.map((product, idx) => (
            // ↓ Wrapper div for hover lift + shadow if ProductCard cannot be edited directly
            <div
              key={product.id}
              className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-xl overflow-hidden"
            >
              <ProductCard
                product={product}
                index={idx}
                addToCart={handleAdd}
                onReadMore={setSelected}
              />
            </div>
          ))}
        </div>
      )}

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            // ↓ backdrop-blur-md, darker bg-black/60
            style={{ background: 'rgba(28,28,26,0.6)', backdropFilter: 'blur(12px)' }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Product quick view"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              // ↓ Added shadow-2xl and border border-white/20
              className="bg-white w-full sm:max-w-md sm:rounded-3xl overflow-hidden rounded-t-3xl shadow-2xl border border-white/20"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] bg-[#f8faf4] overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.description}
                  className="w-full h-full object-cover bg-[#fafaf5]"
                />
                {/* ↓ Added hover:bg-black/5 transition to close button */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/5 transition-all"
                  aria-label="Close quick view"
                >
                  <FiX size={16} className="text-[#2e3c27]" />
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-px bg-[#8aaa78]" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8aaa78]">{selectedProduct.category}</span>
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1c1c1a] leading-snug mb-3">
                  {selectedProduct.description}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(4)].map((_, i) => <FaStar key={i} className="text-[#c49a3c] text-sm" />)}
                    <FaStarHalfAlt className="text-[#c49a3c] text-sm" />
                  </div>
                  <span className="text-[11px] text-[#8aaa78]">({selectedProduct.reviewCount?.toLocaleString()} reviews)</span>
                </div>
                <p className="text-[13px] text-[#6a7a60] leading-relaxed mb-6">
                  Custom pricing available. Contact us for the best price based on your occasion and flower availability.
                </p>
                {/* ↓ border-t border-neutral-100 above button, hover:bg-[#1f2c1a] focus:ring-2 */}
                <div className="border-t border-neutral-100 pt-4">
                  <button
                    onClick={() => { handleAdd(selectedProduct); setSelected(null); }}
                    className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-[13px] uppercase tracking-wider text-white transition-all active:scale-[0.98] focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 hover:opacity-90"
                    style={{ background: '#2e3c27' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#1f2c1a')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#2e3c27')}
                  >
                    <FiShoppingBag size={16} /> Add to Enquiry Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
