"use client";
import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, Loader2, X, Shield, User as UserIcon, Phone, Key } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    role: "customer"
  });

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const json = await res.json();
      if (json.success) setUsers(json.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (user = null) => {
    if (user) {
      setEditingId(user._id);
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        password: user.password || "",
        role: user.role || "customer"
      });
    } else {
      setEditingId(null);
      setFormData({ name: "", phone: "", password: "", role: "customer" });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const method = editingId ? "PUT" : "POST";
    const bodyData = editingId ? { _id: editingId, ...formData } : formData;

    try {
      const res = await fetch("/api/admin/users", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData)
      });
      
      const json = await res.json();
      if (json.success) {
        setIsModalOpen(false);
        fetchUsers(); 
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setUsers(users.filter(u => u._id !== id));
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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">User Management</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Manage customers, chefs, and admins.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-[#E31B23] hover:bg-[#c9161e] text-white px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#E31B23]/20 flex items-center gap-2 w-fit"
        >
          <Plus size={20} /> Add New User
        </button>
      </div>

      {/* Users List */}
      <div className="bg-white border border-gray-100 rounded-[32px] shadow-[0_4px_20px_rgb(0,0,0,0.02)] overflow-hidden">
        
        {/* Table Header (Hidden on small mobile) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-5 bg-gray-50 border-b border-gray-100 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          <div className="col-span-4">User Details</div>
          <div className="col-span-3">Contact</div>
          <div className="col-span-3">Access Role</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* User Rows */}
        <div className="divide-y divide-gray-50">
          {users.map((user) => (
            <div key={user._id} className="group grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 md:px-8 py-5 hover:bg-red-50/30 transition-colors">
              
              {/* Name & Avatar */}
              <div className="col-span-4 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg shrink-0 border ${
                  user.role === 'admin' ? 'bg-red-100 text-[#E31B23] border-red-200' :
                  user.role === 'chef' ? 'bg-orange-100 text-orange-600 border-orange-200' :
                  'bg-gray-100 text-gray-600 border-gray-200'
                }`}>
                  {user.name ? user.name.charAt(0).toUpperCase() : <UserIcon size={20} />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-[#E31B23] transition-colors">{user.name}</h3>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">ID: {user._id.slice(-6).toUpperCase()}</p>
                </div>
              </div>

              {/* Contact */}
              <div className="col-span-3 flex flex-col md:block mt-2 md:mt-0">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Phone size={14} className="text-gray-400" />
                  {user.phone}
                </div>
              </div>

              {/* Role */}
              <div className="col-span-3 flex items-center mt-2 md:mt-0">
                <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1.5 ${
                  user.role === 'admin' ? 'bg-[#E31B23] text-white' :
                  user.role === 'chef' ? 'bg-orange-500 text-white' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {user.role === 'admin' && <Shield size={12} />}
                  {user.role}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center md:justify-end gap-2 mt-4 md:mt-0">
                <button onClick={() => openModal(user)} className="p-2.5 bg-white border border-gray-100 hover:bg-gray-50 hover:border-gray-200 text-gray-600 rounded-xl transition-all shadow-sm">
                  <Edit3 size={16} />
                </button>
                <button onClick={() => handleDelete(user._id)} className="p-2.5 bg-white border border-red-100 hover:bg-red-50 text-red-500 rounded-xl transition-all shadow-sm">
                  <Trash2 size={16} />
                </button>
              </div>

            </div>
          ))}
          
          {users.length === 0 && (
            <div className="p-12 text-center text-gray-400 font-medium">No users found in the database.</div>
          )}
        </div>
      </div>

      {/* --- ADD/EDIT MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" style={{ colorScheme: 'light' }}>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between shrink-0">
                <h2 className="text-xl font-black text-gray-900">{editingId ? "Edit User Profile" : "Create New User"}</h2>
                <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-[#E31B23] rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto">
                <form id="user-form" onSubmit={handleSave} className="space-y-5">
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"><UserIcon size={14}/> Full Name</label>
                    <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 text-gray-900 border border-gray-200 px-4 py-3 rounded-xl focus:border-[#E31B23] focus:bg-white outline-none transition-all" placeholder="e.g. John Doe" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"><Phone size={14}/> Phone Number</label>
                    <input required type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50 text-gray-900 border border-gray-200 px-4 py-3 rounded-xl focus:border-[#E31B23] focus:bg-white outline-none transition-all" placeholder="e.g. 017XXXXXXXX" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"><Key size={14}/> Password</label>
                    <input required type="text" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-gray-50 text-gray-900 border border-gray-200 px-4 py-3 rounded-xl focus:border-[#E31B23] focus:bg-white outline-none transition-all" placeholder="Set a strong password" />
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"><Shield size={14}/> Account Role</label>
                    <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-gray-50 text-gray-900 border border-gray-200 px-4 py-3 rounded-xl focus:border-[#E31B23] focus:bg-white outline-none transition-all appearance-none cursor-pointer">
                      <option value="customer">Customer</option>
                      <option value="chef">Chef</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                </form>
              </div>

              <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-4 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" form="user-form" disabled={saving} className="px-8 py-3 rounded-xl text-sm font-bold text-white bg-[#E31B23] hover:bg-[#c9161e] shadow-lg shadow-[#E31B23]/20 transition-all flex items-center gap-2">
                  {saving ? <Loader2 size={18} className="animate-spin" /> : "Save Changes"}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}