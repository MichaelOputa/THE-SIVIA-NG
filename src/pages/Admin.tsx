import { useEffect, useState } from 'react';
import { ImagePlus, LogOut, Pencil, Plus, Trash2, X } from 'lucide-react';
import type { Product } from '@/data';
import { supabase } from '@/lib/supabase';

type StoreProduct = Omit<Product, 'id'> & {
  id: string;
  is_active: boolean;
};

type ProductForm = Omit<StoreProduct, 'id' | 'image' | 'images' | 'is_active'> & {
  image: string;
  is_active: boolean;
};

const emptyForm: ProductForm = {
  name: '', slug: '', category: '', categorySlug: '', detail: '', description: '', image: '',
  lengths: [], weights: [], price: '', priceNote: '', is_active: true,
};

const toForm = (product: StoreProduct): ProductForm => ({
  name: product.name,
  slug: product.slug,
  category: product.category,
  categorySlug: product.categorySlug,
  detail: product.detail,
  description: product.description,
  image: product.image,
  lengths: product.lengths,
  weights: product.weights,
  price: product.price,
  priceNote: product.priceNote,
  is_active: product.is_active,
});

export default function Admin() {
  const [session, setSession] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) return setSession(false);
    supabase.auth.getSession().then(({ data }) => setSession(Boolean(data.session)));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(Boolean(currentSession));
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) loadProducts();
  }, [session]);

  const loadProducts = async () => {
    if (!supabase) return;
    const { data, error } = await supabase.from('store_products').select('*').order('created_at', { ascending: false });
    if (error) setMessage(error.message);
    else setProducts((data || []) as StoreProduct[]);
  };

  const signIn = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase) return setMessage('Supabase is not configured. Check .env.local.');
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMessage(error?.message || '');
    setBusy(false);
  };

  const uploadImage = async () => {
    if (!supabase || !imageFile) return form.image;
    const path = `${crypto.randomUUID()}-${imageFile.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`;
    const { error } = await supabase.storage.from('product-images').upload(path, imageFile, { upsert: false });
    if (error) throw error;
    return supabase.storage.from('product-images').getPublicUrl(path).data.publicUrl;
  };

  const saveProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setMessage('');
    try {
      const image = await uploadImage();
      const payload = { ...form, image, images: image ? [image] : [], lengths: form.lengths, weights: form.weights };
      const query = editingId
        ? supabase.from('store_products').update(payload).eq('id', editingId)
        : supabase.from('store_products').insert(payload);
      const { error } = await query;
      if (error) throw error;
      setForm(emptyForm);
      setImageFile(null);
      setEditingId(null);
      setMessage('Product saved.');
      await loadProducts();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save product.');
    } finally {
      setBusy(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!supabase || !window.confirm('Delete this product?')) return;
    const { error } = await supabase.from('store_products').delete().eq('id', id);
    if (error) setMessage(error.message);
    else setProducts((current) => current.filter((product) => product.id !== id));
  };

  if (session === null) return <div className="page-pad empty-state"><p>Loading owner dashboard...</p></div>;
  if (!session) {
    return (
      <div className="page-pad admin-login">
        <p className="eyebrow">Owner access</p>
        <h1>Manage your <em>products.</em></h1>
        <p className="page-subtitle">Sign in to add new pieces, update prices, and manage your product images.</p>
        <form className="admin-form" onSubmit={signIn}>
          <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
          <button className="button button-gold" disabled={busy}>{busy ? 'Signing in...' : 'Sign in'}</button>
          {message && <p className="admin-message">{message}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="page-pad admin-page">
      <div className="admin-heading">
        <div><p className="eyebrow">Owner dashboard</p><h1>Product <em>studio.</em></h1></div>
        <button className="text-button dark" onClick={() => supabase?.auth.signOut()}><LogOut size={15} /> Sign out</button>
      </div>
      <div className="admin-layout">
        <form className="admin-form admin-product-form" onSubmit={saveProduct}>
          <div className="admin-form-heading"><h2>{editingId ? 'Edit product' : 'Add product'}</h2>{editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} aria-label="Cancel edit"><X size={18} /></button>}</div>
          <label>Product name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></label>
          <label>Slug<input value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} placeholder="example-product" required /></label>
          <div className="admin-form-row"><label>Category<input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} required /></label><label>Category slug<input value={form.categorySlug} onChange={(event) => setForm({ ...form, categorySlug: event.target.value })} required /></label></div>
          <label>Short detail<input value={form.detail} onChange={(event) => setForm({ ...form, detail: event.target.value })} /></label>
          <label>Description<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} rows={4} /></label>
          <div className="admin-form-row"><label>Price<input value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="₦150,000" required /></label><label>Price note<input value={form.priceNote} onChange={(event) => setForm({ ...form, priceNote: event.target.value })} /></label></div>
          <div className="admin-form-row"><label>Lengths<input value={form.lengths.join(', ')} onChange={(event) => setForm({ ...form, lengths: event.target.value.split(',').map((value) => value.trim()).filter(Boolean) })} placeholder={'10", 12"'} /></label><label>Weights<input value={form.weights.join(', ')} onChange={(event) => setForm({ ...form, weights: event.target.value.split(',').map((value) => value.trim()).filter(Boolean) })} placeholder="200g" /></label></div>
          <label className="admin-upload"><span><ImagePlus size={18} /> Product image</span><input type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] || null)} />{form.image && !imageFile && <img src={form.image} alt="Current product" />}</label>
          <label className="admin-check"><input type="checkbox" checked={form.is_active} onChange={(event) => setForm({ ...form, is_active: event.target.checked })} /> Visible in shop</label>
          <button className="button button-gold" disabled={busy}>{busy ? 'Saving...' : editingId ? 'Update product' : 'Publish product'}</button>
          {message && <p className="admin-message">{message}</p>}
        </form>
        <section className="admin-products"><div className="admin-list-heading"><h2>Your products</h2><span>{products.length} total</span></div>{products.length === 0 ? <p className="admin-empty">No database products yet. Add your first product.</p> : products.map((product) => <article className="admin-product" key={product.id}><img src={product.image} alt="" /><div><h3>{product.name}</h3><p>{product.price} · {product.is_active ? 'Visible' : 'Hidden'}</p></div><button onClick={() => { setEditingId(product.id); setForm(toForm(product)); }} aria-label={`Edit ${product.name}`}><Pencil size={16} /></button><button onClick={() => deleteProduct(product.id)} aria-label={`Delete ${product.name}`}><Trash2 size={16} /></button></article>)}</section>
      </div>
    </div>
  );
}
