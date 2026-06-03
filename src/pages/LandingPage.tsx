import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { FaWhatsapp, FaStar, FaLeaf, FaQuoteLeft, FaHeart, FaGift, FaBirthdayCake, FaBox, FaRing, FaHandHoldingHeart } from 'react-icons/fa';
import { FiArrowRight, FiTruck, FiShield, FiClock } from 'react-icons/fi';
import Home from './Home';
import type { Product } from '../types';
import l2 from "./landingpageimg/img20.jpg";
import l3 from "./landingpageimg/img21.jpeg";
import l1 from "../cakeimg/cake2.png";
import l4 from "./landingpageimg/img22.jpeg";
import heroImg from "../heroimg/hero.png";

// Mobile carousel images
const mobileHeroImages = [
  "https://i.pinimg.com/736x/8a/70/a5/8a70a598134da0ec0722a13007298786.jpg",
  "https://i.pinimg.com/736x/ae/b8/18/aeb818d7482f0d88827625e3757b62ff.jpg",
  "https://i.pinimg.com/736x/bf/b9/01/bfb901ba529ea47665f15dadd9f94ff5.jpg"
];

interface LandingPageProps {
  addToCart: (product: Product) => void;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  count: number;
}

const CATEGORIES = [
  { slug: 'Wedding', label: 'Wedding Flowers', sub: 'Timeless & enchanting', img: l3 },
  { slug: 'Birthday', label: 'Birthday Blooms', sub: 'Celebrate every moment', img: l1 },
  { slug: 'Gifts', label: 'Gift Combos', sub: 'Thoughtful & curated', img: l2 },
  { slug: 'Anniversary', label: 'Anniversary', sub: 'Expressions of love', img: l4 },
];

const FEATURES = [
  { icon: <FiTruck size={16} />, title: 'Delivery Available', sub: 'Contact for details' },
  { icon: <FiShield size={16} />, title: 'Fresh Guarantee', sub: '100% assured' },
  { icon: <FiClock size={16} />, title: 'Same Day', sub: 'Contact for availability' },
];

const WHAT_WE_DO = [
  { icon: <FaHeart className="text-emerald-600 text-lg" />, title: "Wedding Floristry", description: "Complete wedding floral decoration including bridal bouquets, mandap decoration, table centerpieces, and venue transformation. Special marriage garlands available." },
  { icon: <FaBirthdayCake className="text-emerald-600 text-lg" />, title: "Birthday Celebrations", description: "Make every birthday unforgettable with specially curated floral arrangements, surprise deliveries, and designer cakes for any location." },
  { icon: <FaGift className="text-emerald-600 text-lg" />, title: "Premium Gift Solutions", description: "Premium chocolates of your choice, designer cakes, gift hampers, and curated combo deals for every occasion. Save up to 20% on combos." },
  { icon: <FaRing className="text-emerald-600 text-lg" />, title: "Anniversary & Love", description: "Celebrate your journey of love with timeless anniversary collections. Classic red roses, elegant orchids, and romantic gift sets." },
  { icon: <FaHandHoldingHeart className="text-emerald-600 text-lg" />, title: "Sympathy & Obituary", description: "Elegant obituary wreaths and sympathy flowers crafted with respect and compassion. Same-day delivery available." },
  { icon: <FaBox className="text-emerald-600 text-lg" />, title: "Combo Deals", description: "Signature combo deals pairing flowers with chocolates, cakes, and gifts. Perfect for those who want to make a lasting impression." },
];

const REVIEWS = [
  { quote: "The wedding decor was absolutely magical. Every guest asked about our florist.", name: "Meera Nair", rating: 5 },
  { quote: "Ordered anniversary flowers at 4 PM, delivered by 6 PM. Freshness blew us away.", name: "Rahul Menon", rating: 5 },
  { quote: "The birthday surprise combo made my wife emotional. Premium quality!", name: "Anoop Thomas", rating: 5 },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as any, // ✅ TypeScript fix
    },
  }),
};;

const WhatWeDoCard: React.FC<{ item: typeof WHAT_WE_DO[0]; index: number }> = ({ item, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-emerald-50/0 to-emerald-100/0 rounded-2xl transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-emerald-50/20 group-hover:via-emerald-50/10 group-hover:to-emerald-100/30" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:bg-emerald-50">
          {item.icon}
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-3 tracking-tight">{item.title}</h3>
        <p className="text-sm text-neutral-600 leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
};

const LandingPage: React.FC<LandingPageProps> = ({ addToCart, setCount, count }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % mobileHeroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="bg-white">
      {/* ==================== HERO SECTION ==================== */}
      {!isMobile ? (
        /* Desktop hero - COLOR SWAPPED: Fresh Flowers = green, Premium Gifts = white */
        <section className="relative bg-neutral-50 min-h-[75vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Luxury floral arrangement" className="w-full h-full object-cover shadow-2xl" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent z-10 hidden md:block" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 z-20 w-full">
            <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left">
              <div className="inline-flex items-center gap-2 mb-4 justify-center md:justify-start">
                <span className="text-[10px] tracking-[0.2em] uppercase text-emerald-600 font-medium">Est. 2018</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-neutral-900 leading-[1.2] tracking-tight mb-4">
                <span className="text-emerald-700">Fresh Flowers</span>,
                <br />
                <span className="text-white drop-shadow-md">Premium Gifts</span>
              </h1>
              <p className="text-green-900 text-sm sm:text-base leading-relaxed max-w-md mx-auto md:mx-0 mb-6">
                Handcrafted floral arrangements for weddings, birthdays, and every moment worth celebrating.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-all hover:-translate-y-0.5 active:scale-[0.98] focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 min-h-[44px]"
                >
                  Shop Collection <FiArrowRight size={14} />
                </Link>
                <a
                  href="https://wa.me/918921123759"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-neutral-200 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-all active:scale-[0.98] focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 min-h-[44px]"
                  aria-label="Contact us on WhatsApp"
                >
                  <FaWhatsapp className="text-emerald-600 text-base" /> WhatsApp Order
                </a>
              </div>
              <div className="flex items-center gap-4 mt-6 justify-center md:justify-start">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <FaStar key={i} className="text-amber-400 text-xs" />)}
                  <span className="text-neutral-500 text-xs ml-1">4.9 ★</span>
                </div>
                <div className="w-px h-3 bg-neutral-200" />
                <span className="text-neutral-500 text-xs">Trusted by 5,000+ customers</span>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Mobile hero - COLOR SWAPPED: Fresh Flowers = green (text-emerald-300), Premium Gifts = white */
        <div className="relative h-[85vh] w-full overflow-hidden">
          {mobileHeroImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src={img}
                alt={`Floral ${idx + 1}`}
                className="w-full h-full object-cover"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

          {/* ========== SLOW MOTION ANIMATION ADDED HERE ========== */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-sm rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] p-6 pb-8 text-white"
          >
            <div className="flex flex-row gap-3 mb-6">
              <Link
                to="/shop"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-neutral-900 rounded-xl text-sm font-semibold shadow-lg active:scale-[0.98] focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2"
              >
                Shop Collection <FiArrowRight size={14} />
              </Link>
              <a
                href="https://wa.me/918921123759"
                target="_blank"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold shadow-lg active:scale-[0.98] focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2"
                aria-label="Contact us on WhatsApp"
              >
                <FaWhatsapp className="text-base" /> WhatsApp Order
              </a>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium">Est. 2018</p>
              <h1 className="text-xl font-semibold leading-tight">
                <span className="text-white">Fresh Flowers &</span>
                <span className="text-emerald-300">Premium Gifts</span>
              </h1>
              <p className="text-lg leading-relaxed max-w-sm text-white pt-1">
                Handcrafted floral arrangements for weddings, birthdays, and Fresh &{" "}
                <span className="text-emerald-300">
                  silk flowers, bouquets, cakes,{" "}
                </span>{" "}
                confectionery, fashion gifts – delivered to your doorstep.
              </p>
            </div>
          </motion.div>
          {/* ==================================================== */}

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 pb-2">
            {mobileHeroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-3 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-6 bg-emerald-300' : 'w-3 bg-white/50'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ==================== FEATURES BAR ==================== */}
      <section className="bg-white border-b border-neutral-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {FEATURES.map((f, idx) => (
              <div key={idx} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-emerald-100 transition-colors duration-200 cursor-default">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">{f.icon}</div>
                <div>
                  <div className="text-xs font-medium text-neutral-900">{f.title}</div>
                  <div className="text-[11px] text-neutral-400">{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHAT WE DO ==================== */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-[10px] tracking-[0.2em] uppercase text-emerald-600 font-semibold">Our Expertise</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} className="text-2xl sm:text-3xl font-semibold text-neutral-900 mt-2 mb-3">What We Do</motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="text-sm text-neutral-500">Complete floral and gifting solutions for every occasion</motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {WHAT_WE_DO.map((item, idx) => <WhatWeDoCard key={idx} item={item} index={idx} />)}
          </div>
        </div>
      </section>

      {/* ==================== SHOP BY OCCASION ==================== */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-emerald-600 font-semibold">Browse</span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mt-1">Shop by Occasion</h2>
            </div>
            <Link to="/shop" className="flex items-center gap-1 text-sm text-neutral-500 hover:text-emerald-600 transition-colors mt-2 sm:mt-0">View All <FiArrowRight size={12} /></Link>
          </div>

          {isMobile ? (
            <div className="relative flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 scrollbar-hide after:absolute after:right-0 after:top-0 after:h-full after:w-12 after:bg-gradient-to-l after:from-white after:to-transparent after:pointer-events-none">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/shop?category=${cat.slug}`}
                  className="group relative overflow-hidden rounded-xl bg-neutral-100 flex-shrink-0 w-[85vw] snap-start aspect-[4/5] transition-all duration-300 hover:shadow-xl"
                >
                  <img src={cat.img} alt={cat.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-white/30 ring-inset rounded-xl pointer-events-none" />
                  <div className="absolute bottom-4 left-4">
                    <div className="text-[10px] font-medium uppercase tracking-wide text-emerald-300 mb-0.5">{cat.sub}</div>
                    <div className="font-semibold text-white/90 text-sm drop-shadow-sm">{cat.label}</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {CATEGORIES.map((cat) => (
                <Link key={cat.slug} to={`/shop?category=${cat.slug}`} className="group relative overflow-hidden rounded-xl aspect-[4/5] bg-neutral-100 transition-all duration-300 hover:shadow-xl">
                  <img src={cat.img} alt={cat.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-white/30 ring-inset rounded-xl pointer-events-none" />
                  <div className="absolute bottom-4 left-4">
                    <div className="text-[10px] font-medium uppercase tracking-wide text-emerald-300 mb-0.5">{cat.sub}</div>
                    <div className="font-semibold text-white/90 text-sm drop-shadow-sm">{cat.label}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==================== PRODUCTS SECTION ==================== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-[10px] tracking-[0.2em] uppercase text-emerald-600 font-semibold">Our Collection</span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mt-1">Featured Arrangements</h2>
          </div>
          <Home addToCart={addToCart} setCount={setCount} count={count} />
        </div>
      </section>

      {/* ==================== REVIEWS ==================== */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] tracking-[0.2em] uppercase text-emerald-600 font-semibold">Testimonials</span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mt-2">What Our Customers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                <FaQuoteLeft className="text-neutral-200 text-xl mb-3 opacity-30" />
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => <FaStar key={i} className="text-amber-400 text-xs" />)}
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed mb-4">{review.quote}</p>
                <p className="font-medium text-neutral-900 text-sm">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PHILOSOPHY SECTION (added client's text in green) ==================== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-prose mx-auto text-center">
            <span className="text-[10px] tracking-[0.2em] uppercase text-emerald-600 font-semibold">Our Philosophy</span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mt-2 mb-6">The Art of Floral Storytelling</h2>
            <p className="text-neutral-500 leading-relaxed mb-6">At Kottayam Blooms, we believe every moment deserves to be celebrated with nature's finest. Our master florists handcraft each arrangement using premium blooms sourced from eco-friendly farms. From intimate gatherings to grand celebrations, we create floral experiences that leave lasting impressions.</p>
            <p className="text-neutral-500 leading-relaxed">Discover our luxury gift collection featuring premium chocolates of your choice, designer cakes for any location, special marriage garlands, obituary wreaths, and curated combo deals. Save up to 20% on signature combo deals – perfect for those who want to make a lasting impression.</p>
            {/* NEW: Client's requested text in green, well readable */}
            <p className="text-emerald-700 font-medium leading-relaxed mt-6 pt-2 border-t border-emerald-100">
              Fresh flowers, Silk flowers, Bouquets, Cakes, Confectionery, Fashion Gift items for all occasions - delivered at your door step
            </p>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaLeaf className="text-green-500 text-3xl mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">Need a Custom Arrangement?</h2>
          <p className="text-green-900 text-sm max-w-md mx-auto mb-6">Tell us your vision, occasion, and preferences. Our florists will create something extraordinary for you.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/918921123759"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-all active:scale-[0.98] focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 min-h-[44px]"
              aria-label="Contact us on WhatsApp"
            >
              <FaWhatsapp size={16} /> Start Your Journey
            </a>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-neutral-900 rounded-xl text-sm font-medium hover:bg-neutral-100 transition-all active:scale-[0.98] focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 min-h-[44px]"
            >
              Browse Collection <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp button */}
      <a href="https://wa.me/918921123759" target="_blank" className="fixed bottom-6 right-6 z-50" aria-label="Contact us on WhatsApp">
        <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer">
          <FaWhatsapp size={20} />
        </div>
      </a>
    </div>
  );
};

export default LandingPage;
