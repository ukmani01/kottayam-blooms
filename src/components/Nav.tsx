import React, { useState, useEffect, memo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiMenu, FiX, FiShoppingBag, FiSearch,
  FiChevronDown, FiHeart, FiUser, FiPhone
} from 'react-icons/fi';

interface NavProps { count: number; onCartClick: () => void; }

const CATEGORIES = ['Roses', 'Wedding', 'Birthday', 'Gifts', 'Anniversary', 'Sympathy'];

const Nav: React.FC<NavProps> = memo(({ count, onCartClick }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropOpen, setDropOpen]     = useState(false);
  const [query, setQuery]           = useState('');
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    return () => {
      document.body.style.overflowX = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setDrawerOpen(false); setSearchOpen(false); }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) { navigate('/shop?search=' + encodeURIComponent(query.trim())); setSearchOpen(false); }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-50 bg-[#2e3c27] h-9 flex items-center justify-center px-4">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#b8ccaa] font-medium text-center">
          🌿&nbsp; Free delivery  &nbsp;·&nbsp; Same‑day orders before 5 PM &nbsp;·&nbsp;
          <a href="https://wa.me/918921123759" target="_blank" rel="noreferrer"
            className="underline underline-offset-2 hover:text-white transition-colors">WhatsApp us</a>
        </p>
      </div>

      <header className={`fixed top-9 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/96 backdrop-blur-md shadow-[0_2px_28px_rgba(0,0,0,0.07)] border-b border-[#dce8d0]'
          : 'bg-[#f8f7f4] border-b border-[#dce8d0]'
      }`}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center h-[68px] gap-5">
          <button onClick={() => setDrawerOpen(true)}
            className="lg:hidden p-2 -ml-1.5 rounded-xl hover:bg-[#eaf0e2] transition-colors"
            aria-label="Open menu">
            <FiMenu size={20} className="text-[#2e3c27]" />
          </button>

          {/* Logo container - Updated alignment */}
          <Link to="/" className="flex-shrink-0 group">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 mt-0.5 rounded-xl bg-[#2e3c27] flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 14C8 14 2 10 2 5.5C2 3.0 4.7 1 8 1C11.3 1 14 3.0 14 5.5C14 10 8 14 8 14Z" fill="#b8ccaa"/>
                  <path d="M8 14V7" stroke="#2e3c27" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className="font-serif text-[16px] font-bold tracking-tight leading-none text-[#1c1c1a]">
                  Kottayam Blooms
                </div>
                <div className="text-[10px] sm:text-[11px] font-medium text-[#2e3c27] mt-1.5 flex items-center gap-1.5 leading-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b8ccaa] flex-shrink-0"></span>
                  <span className="leading-tight">Our Associates: Puliyeril Agencies – Flowers & Bouquets, Ferns Petals</span>
                </div>
                <div className="text-[7px] tracking-[0.2em] uppercase text-[#7a9068] mt-1 leading-none">
                  Premium Florals · Kerala
                </div>
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5 ml-4">
            <div className="relative" onMouseEnter={() => setDropOpen(true)} onMouseLeave={() => setDropOpen(false)}>
              <button className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all ${dropOpen ? 'bg-[#eaf0e2] text-[#2e3c27]' : 'text-[#445038] hover:bg-[#eaf0e2] hover:text-[#2e3c27]'}`}>
                Collections
                <FiChevronDown size={13} className={`transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-54 bg-white rounded-2xl shadow-[0_12px_48px_rgba(0,0,0,0.1)] border border-[#dce8d0] py-2.5 z-50 animate-fade-in">
                  <p className="px-4 pt-0.5 pb-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#8aaa78] border-b border-[#eaf0e2] mb-1.5">Browse by occasion</p>
                  {CATEGORIES.map(cat => (
                    <Link key={cat} to={`/shop?category=${cat}`} onClick={() => setDropOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 text-[13px] text-[#3a3830] hover:bg-[#f2f7ec] hover:text-[#2e3c27] transition-colors group/item">
                      {cat}
                      <span className="text-[#b0c8a0] group-hover/item:text-[#5a7a4a] transition-colors text-xs">→</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {[
              { to: '/shop', label: 'All Flowers' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <Link key={to} to={to} className={`px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all ${isActive(to) ? 'bg-[#eaf0e2] text-[#2e3c27]' : 'text-[#445038] hover:bg-[#eaf0e2] hover:text-[#2e3c27]'}`}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex-1" />

          <div className="flex items-center gap-1">
            <button onClick={() => setSearchOpen(s => !s)}
              className={`p-2.5 rounded-xl transition-colors ${searchOpen ? 'bg-[#eaf0e2] text-[#2e3c27]' : 'hover:bg-[#eaf0e2] text-[#445038]'}`}
              aria-label="Search">
              <FiSearch size={18} />
            </button>
            <button className="hidden sm:flex p-2.5 rounded-xl hover:bg-[#eaf0e2] text-[#445038] transition-colors" aria-label="Wishlist"><FiHeart size={18} /></button>
            <button className="hidden sm:flex p-2.5 rounded-xl hover:bg-[#eaf0e2] text-[#445038] transition-colors" aria-label="Account"><FiUser size={18} /></button>
            <button onClick={onCartClick} className="relative flex items-center gap-2 ml-1 pl-3.5 pr-4.5 pr-5 py-2.5 bg-[#2e3c27] text-white rounded-xl text-[13px] font-semibold hover:bg-[#233020] transition-all hover:scale-[1.02] active:scale-[0.97]"
              style={{ boxShadow: '0 4px 16px rgba(46,60,39,0.3)' }} aria-label={`Open cart – ${count} items`}>
              <FiShoppingBag size={16} />
              <span className="hidden sm:inline">Cart</span>
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-[#c97b4b] text-white text-[9.5px] font-bold rounded-full flex items-center justify-center px-1 animate-scale-in">{count}</span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
});

Nav.displayName = 'Nav';
export default Nav;
