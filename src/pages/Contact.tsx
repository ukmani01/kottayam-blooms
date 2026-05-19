import React, { useState } from 'react';
import { FaWhatsapp, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Name: ${form.name}%0AEmail: ${form.email}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/918921123759?text=${msg}`, '_blank');
    setForm({ name: '', email: '', message: '' });
  };
  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-bold text-center mb-8">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-5">
          <div className="flex items-center gap-4 p-4 bg-[#f2f7ec] rounded-2xl"><FaWhatsapp className="text-green-600 text-xl" /><div><p className="font-semibold">WhatsApp</p><a href="https://wa.me/918921123759">+91 89211 23759</a></div></div>
          <div className="flex items-center gap-4 p-4 bg-[#f2f7ec] rounded-2xl"><FaPhone className="text-gray-600" /><div><p className="font-semibold">Phone</p><a href="tel:+918921123759">+91 89211 23759</a></div></div>
          <div className="flex items-center gap-4 p-4 bg-[#f2f7ec] rounded-2xl"><FaMapMarkerAlt /><div><p className="font-semibold">Address</p><p>Kottayam, Kerala</p></div></div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name" className="w-full p-3 border rounded-xl" onChange={e => setForm({ ...form, name: e.target.value })} required />
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl" onChange={e => setForm({ ...form, email: e.target.value })} required />
          <textarea rows={4} placeholder="Message" className="w-full p-3 border rounded-xl" onChange={e => setForm({ ...form, message: e.target.value })} required />
          <button type="submit" className="bg-[#2e3c27] text-white py-3 rounded-xl w-full">Send via WhatsApp</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
