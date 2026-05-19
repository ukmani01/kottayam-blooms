import React, { useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiX, FiTrash2, FiShoppingBag, FiArrowUpRight } from 'react-icons/fi';
import type{ Product } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Product[];
  onRemove: (id: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, onRemove }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const encoded = cart.map(i => `• ${i.description}`).join('%0A');
  const waLink  = `https://wa.me/918921123759?text=🌸 Enquiry from Kottayam Blooms%0A%0A${encoded}%0A%0AKindly share pricing. Thank you!`;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50"
        style={{
          background:    isOpen ? 'rgba(28,28,26,0.42)' : 'transparent',
          backdropFilter: isOpen ? 'blur(5px)' : 'none',
          pointerEvents: isOpen ? 'auto' : 'none',
          transition:    'background 0.35s ease, backdrop-filter 0.35s ease',
        }}
      />

      {/* Panel */}
      <aside
        className="fixed top-0 right-0 h-full z-50 flex flex-col bg-white"
        style={{
          width: 'min(420px, 100vw)',
          transform:  isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
          boxShadow:  '-16px 0 64px rgba(0,0,0,0.14)',
        }}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#dce8d0] bg-[#f4f9f0]">
          <div>
            <h2 className="font-serif text-[16px] font-bold text-[#1c1c1a]">
              Enquiry Cart
            </h2>
            <p className="text-[10.5px] text-[#7a9068] mt-0.5">
              {cart.length} {cart.length === 1 ? 'item' : 'items'} · Price requested via WhatsApp
            </p>
          </div>
          <button onClick={onClose}
            className="p-2 rounded-xl hover:bg-[#dce8d0] transition-colors group"
            aria-label="Close cart">
            <FiX size={18} className="text-[#445038] group-hover:text-[#1c1c1a] transition-colors" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-[#f0f5ea] flex items-center justify-center mb-4">
                <FiShoppingBag size={26} className="text-[#a0b890]" />
              </div>
              <p className="font-serif font-semibold text-[15px] text-[#1c1c1a] mb-1">Your cart is empty</p>
              <p className="text-[12px] text-[#7a9068]">Browse our collection and add items</p>
              <button onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-[#2e3c27] text-white text-[12px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#233020] transition-all">
                Browse Flowers
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.id}-${idx}`}
                className="group/item flex gap-3 p-3.5 bg-[#f8f7f4] rounded-2xl border border-[#e8eddf] hover:border-[#c8d4be] transition-all duration-200">
                {/* Thumbnail */}
                <div className="w-[62px] h-[62px] rounded-xl overflow-hidden flex-shrink-0 bg-[#eaf0e2]">
                  <img src={item.image} alt={item.description}
                    className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-[#8aaa78] mb-0.5">
                        {item.category}
                      </div>
                      <p className="text-[12px] font-semibold text-[#1c1c1a] line-clamp-2 leading-snug">
                        {item.description}
                      </p>
                    </div>
                    <button onClick={() => onRemove(item.id)}
                      className="flex-shrink-0 p-1.5 rounded-lg opacity-0 group-hover/item:opacity-100 hover:bg-[#fde8e8] transition-all"
                      aria-label={`Remove ${item.description}`}>
                      <FiTrash2 size={13} className="text-[#c04848]" />
                    </button>
                  </div>
                  <div className="mt-1.5 text-[10.5px] text-[#7a9068] font-medium">Price on Request</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer CTA */}
        {cart.length > 0 && (
          <div className="px-5 py-5 border-t border-[#dce8d0] bg-[#f4f9f0]">
            {/* Summary strip */}
            <div className="flex items-center justify-between text-[11px] mb-4 px-1">
              <span className="text-[#7a9068]">{cart.length} {cart.length === 1 ? 'item' : 'items'} in enquiry</span>
              <span className="text-[#5a8a50] font-semibold">🚚 Free above ₹999</span>
            </div>

            {/* WhatsApp CTA */}
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-bold text-[14px] uppercase tracking-wider transition-all hover:scale-[1.01] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #2e3c27 0%, #3d5232 100%)',
                boxShadow: '0 6px 24px rgba(46,60,39,0.3)',
              }}>
              <FaWhatsapp size={20} />
              Request Price on WhatsApp
              <FiArrowUpRight size={16} />
            </a>

            <p className="text-center text-[10px] text-[#8aaa78] mt-3">
              We respond within minutes · No spam, ever
            </p>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
