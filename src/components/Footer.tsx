import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaFacebook, FaLeaf } from 'react-icons/fa';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1e2a18] text-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#3a4a32] flex items-center justify-center"><FaLeaf className="text-[#b8d4a0] text-sm" /></div>
              <div><div className="font-serif text-[16px] font-bold text-white">Kottayam Blooms</div><div className="text-[8px] tracking-[0.25em] uppercase text-[#7a9068]">Premium Florals · Kerala</div></div>
            </div>
            <p className="text-[13px] text-[#7a9878] leading-relaxed max-w-xs mb-6">
              Handcrafted floral arrangements for every occasion. Premium quality flowers,
              same-day delivery across Kerala, and a freshness guarantee on every order.
            </p>
            <div className="flex items-center gap-2">
              <a href="https://wa.me/918921123759" className="w-9 h-9 rounded-xl bg-[#2e3c27] flex items-center justify-center text-[#8aaa78] hover:bg-[#3a4a32] hover:text-white transition"><FaWhatsapp size={16} /></a>
              <a href="#" className="w-9 h-9 rounded-xl bg-[#2e3c27] flex items-center justify-center text-[#8aaa78] hover:bg-[#3a4a32] hover:text-white transition"><FaInstagram size={16} /></a>
              <a href="#" className="w-9 h-9 rounded-xl bg-[#2e3c27] flex items-center justify-center text-[#8aaa78] hover:bg-[#3a4a32] hover:text-white transition"><FaFacebook size={16} /></a>
            </div>
          </div>
          <div><h4 className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#5a7a4a] mb-5">Shop</h4><ul className="space-y-2.5">{['All Flowers','Wedding Flowers','Birthday Bouquets','Gift Combos','Anniversary'].map(l => <li key={l}><Link to={`/shop?category=${l === 'All Flowers' ? '' : l}`} className="text-[13px] text-[#7a9878] hover:text-[#b8d4a0]">{l}</Link></li>)}</ul></div>
          <div><h4 className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#5a7a4a] mb-5">Info</h4><ul className="space-y-2.5"><li><Link to="/contact" className="text-[13px] text-[#7a9878] hover:text-[#b8d4a0]">Contact Us</Link></li><li><Link to="/cart" className="text-[13px] text-[#7a9878] hover:text-[#b8d4a0]">My Cart</Link></li><li><a href="https://wa.me/918921123759" className="text-[13px] text-[#7a9878] hover:text-[#b8d4a0]">WhatsApp Order</a></li></ul></div>
          <div><h4 className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#5a7a4a] mb-5">Contact</h4><ul className="space-y-3"><li className="flex items-center gap-2.5"><FiMapPin size={13} /><span className="text-[13px] text-[#7a9878]">Kottayam, Kerala</span></li><li className="flex items-center gap-2.5"><FiPhone size={13} /><a href="tel:+918921123759" className="text-[13px] text-[#7a9878] hover:text-[#b8d4a0]">+91 89211 23759</a></li><li className="flex items-center gap-2.5"><FiMail size={13} /><a href="mailto:hello@kottayamblooms.in" className="text-[13px] text-[#7a9878] hover:text-[#b8d4a0]">hello@kottayamblooms.in</a></li></ul></div>
        </div>
      </div>
      <div className="border-t border-[#2e3c27] px-5 lg:px-8 py-5 text-center text-[11px] text-[#4a6040]">
        © 2025 Kottayam Blooms. All rights reserved. Crafted with 🌿 in Kerala, India
      </div>
    </footer>
  );
};

export default Footer;
