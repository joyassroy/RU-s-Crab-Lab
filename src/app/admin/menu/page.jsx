"use client";
import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, Loader2, Image as ImageIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminMenuPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    nameBn: "",
    priceBDT: "",
    category: "",
    description: "",
    descriptionBn: "",
    img: "",
    isAvailable: true
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const json = await res.json();
      if (json.success) setProducts(json.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = (product = null) => {
    if (product) {
      setEditingId(product._id);
      setFormData({
        name: product.name || "",
        nameBn: product.nameBn || "",
        priceBDT: product.priceBDT !== undefined ? product.priceBDT : "",
        category: product.category || "",
        description: product.description || "",
        descriptionBn: product.descriptionBn || "",
        img: product.img || "",
        isAvailable: product.isAvailable !== false
      });
    } else {
      setEditingId(null);
      setFormData({ 
        name: "", nameBn: "", priceBDT: "", category: "", 
        description: "", descriptionBn: "", img: "", isAvailable: true 
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const method = editingId ? "PUT" : "POST";
    const bodyData = editingId ? { _id: editingId, ...formData } : formData;

    try {
      const res = await fetch("/api/admin/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData)
      });
      
      const json = await res.json();
      if (json.success) {
        setIsModalOpen(false);
        fetchProducts(); 
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setProducts(products.filter(p => p._id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center bg-transparent" style={{ colorScheme: 'light' }}>
        <Loader2 className="animate-spin text-[#E31B23]" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 bg-transparent" style={{ colorScheme: 'light' }}>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Menu Management</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Add, update or remove items from your live menu.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-[#E31B23] hover:bg-[#c9161e] text-white px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#E31B23]/20 flex items-center gap-2 w-fit"
        >
          <Plus size={20} /> Add New Item
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-[24px] border border-gray-200 overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_10px_40px_rgb(227,27,35,0.06)] transition-all group flex flex-col">
            
            {/* Image Section */}
            <div className="h-48 bg-gray-100 relative overflow-hidden shrink-0 flex items-center justify-center">
              {product.img ? (
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  onError={(e) => {
                    e.currentTarget.onerror = null; 
                    e.currentTarget.src = "/crab-logo.jpeg"; 
                  }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                  <ImageIcon size={40} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">No Image</span>
                </div>
              )}
              
              <div className="absolute top-3 left-3">
                <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm ${product.isAvailable !== false ? 'bg-green-500 text-white' : 'bg-[#E31B23] text-white'}`}>
                  {product.isAvailable !== false ? 'Available' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1 bg-white">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{product.category || "General"}</p>
              <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-1">{product.name}</h3>
              {product.nameBn && <p className="text-sm font-medium text-gray-500 mb-2">{product.nameBn}</p>}
              
              <p className="text-xl font-black text-[#E31B23] mb-4 mt-auto">Tk {product.priceBDT}</p>
              
              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <button onClick={() => openModal(product)} className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors">
                  <Edit3 size={16} /> Edit
                </button>
                <button onClick={() => handleDelete(product._id)} className="w-10 h-10 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* --- ADD/EDIT MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" style={{ colorScheme: 'light' }}>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-3xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-8 py-6 border-b border-gray-100 bg-white flex items-center justify-between shrink-0">
                <h2 className="text-xl font-black text-gray-900">{editingId ? "Edit Menu Item" : "Add New Item"}</h2>
                <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-[#E31B23] rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 bg-white overflow-y-auto custom-scrollbar">
                <form id="menu-form" onSubmit={handleSave} className="space-y-6">
                  
                  {/* Name Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Item Name (English) *</label>
                      <input required type="text" value={formData.name || ""} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 text-gray-900 border border-gray-200 px-4 py-3 rounded-xl focus:border-[#E31B23] focus:bg-white outline-none transition-all placeholder-gray-400" placeholder="e.g. Crab Fries" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Item Name (Bengali)</label>
                      <input type="text" value={formData.nameBn || ""} onChange={(e) => setFormData({...formData, nameBn: e.target.value})} className="w-full bg-gray-50 text-gray-900 border border-gray-200 px-4 py-3 rounded-xl focus:border-[#E31B23] focus:bg-white outline-none transition-all placeholder-gray-400" placeholder="e.g. কাঁকড়া ফ্রাইস" />
                    </div>
                  </div>
                  
                  {/* Category & Price */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Category</label>
                      <input type="text" value={formData.category || ""} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-gray-50 text-gray-900 border border-gray-200 px-4 py-3 rounded-xl focus:border-[#E31B23] focus:bg-white outline-none transition-all placeholder-gray-400" placeholder="e.g. Crabs" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Price (BDT) *</label>
                      <input required type="number" value={formData.priceBDT || ""} onChange={(e) => setFormData({...formData, priceBDT: Number(e.target.value)})} className="w-full bg-gray-50 text-gray-900 border border-gray-200 px-4 py-3 rounded-xl focus:border-[#E31B23] focus:bg-white outline-none transition-all placeholder-gray-400" placeholder="e.g. 240" />
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Description (English)</label>
                      <textarea rows="3" value={formData.description || ""} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 text-gray-900 border border-gray-200 px-4 py-3 rounded-xl focus:border-[#E31B23] focus:bg-white outline-none transition-all resize-none placeholder-gray-400" placeholder="Crispy fries loaded with..."></textarea>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Description (Bengali)</label>
                      <textarea rows="3" value={formData.descriptionBn || ""} onChange={(e) => setFormData({...formData, descriptionBn: e.target.value})} className="w-full bg-gray-50 text-gray-900 border border-gray-200 px-4 py-3 rounded-xl focus:border-[#E31B23] focus:bg-white outline-none transition-all resize-none placeholder-gray-400" placeholder="ক্রিস্পি ফ্রাইস, সাথে..."></textarea>
                    </div>
                  </div>

                  {/* Image & Availability */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Image URL</label>
                        <input type="url" value={formData.img || ""} onChange={(e) => setFormData({...formData, img: e.target.value})} className="w-full bg-gray-50 text-gray-900 border border-gray-200 px-4 py-3 rounded-xl focus:border-[#E31B23] focus:bg-white outline-none transition-all placeholder-gray-400" placeholder="https://i.postimg.cc/..." />
                      </div>
                      
                      <div className="space-y-2 pt-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <div className="relative">
                            <input type="checkbox" className="sr-only" checked={formData.isAvailable} onChange={(e) => setFormData({...formData, isAvailable: e.target.checked})} />
                            <div className={`block w-12 h-7 rounded-full transition-colors ${formData.isAvailable ? 'bg-[#E31B23]' : 'bg-gray-300'}`}></div>
                            <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${formData.isAvailable ? 'translate-x-5' : ''}`}></div>
                          </div>
                          <span className="text-sm font-bold text-gray-900">{formData.isAvailable ? "Available in Stock" : "Out of Stock"}</span>
                        </label>
                      </div>
                    </div>

                    {/* Live Preview */}
                    {formData.img && (
                      <div className="w-full h-32 rounded-xl border border-gray-200 overflow-hidden bg-gray-100 relative">
                        <img src={formData.img} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">Image Preview</span>
                      </div>
                    )}
                  </div>

                </form>
              </div>

              {/* Footer Actions */}
              <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-4 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                  Cancel
                </button>
                <button type="submit" form="menu-form" disabled={saving} className="px-8 py-3 rounded-xl text-sm font-bold text-white bg-[#E31B23] hover:bg-[#c9161e] shadow-lg shadow-[#E31B23]/20 transition-all flex items-center gap-2">
                  {saving ? <Loader2 size={18} className="animate-spin" /> : "Save Item"}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}