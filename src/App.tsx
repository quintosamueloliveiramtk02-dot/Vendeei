import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  ArrowUpRight, 
  Search, 
  SlidersHorizontal, 
  Database, 
  FileCode, 
  Check, 
  Terminal, 
  ExternalLink,
  ChevronRight,
  Info,
  X,
  Sparkles,
  Trash2,
  Lock
} from 'lucide-react';
import { getSupabaseClient } from './lib/supabase';
import ProductCard, { Product } from './components/ProductCard';

// Initial Curated Products matching the design mockup perfectly
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Studio Master 500",
    description: "Referência em áudio profissional com cancelamento de ruído ativo de última geração e acabamento luxuoso em alumínio escovado.",
    price: 1299.00,
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjgFwQ2HoozVt9soa1r2EjWHO6EhO3YUww32rlZLe2K6cZL2365hi-dZeZvK8JgvS1YXqRAZEj7pM1VZv77fkyg5igWGEWU3Vv4x0dXh8FoQP0tBrj5OtxB_YUBdpe2Y4eGaPDUxEOE01NWt98l8UwNDCf1oOWPILeDMM6a6F23pGHzYNpxo-etHxKcK9wxpJgi0crv32z0ks3Nc4rmhc4UULo5M8VzyXxrMjum3XLTwG2hZ28dBcyScuOPSIBEK7zBXpPOqV2rp8",
    affiliate_url: "https://vendeei.com.br/studio-master-500",
    upvotes: 128,
    category: "Tech"
  },
  {
    id: 2,
    title: "Ultra-Slim Mechanical",
    description: "Teclado mecânico ultra-fino de alta precisão com switches ópticos de perfil baixo e layout minimalista otimizado para programadores.",
    price: 849.90,
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6MYWiKW9-3bpMXALw1J0sctvDO45J1n4Ht1u6mIsHg3T6LGlJT6QhU9jVInLBCDVC5EGf6V7beWGaWZp4LP_9JbEXdtuSZzt9uu0cxdZVdqC_ossG91HSMg5BS04FqvnReWUeh4EQq5jksJv4WWtTmVnpvGNQbv33C7KHUNGSXv-hOdBq81RBrlkqEq4jeemYYgUoCvduClNQKpNTsSYLEeDEHywQwmxHnsOF17wJTQR22zJd79vf6UgtjL1Z15toHWgxrm9813A",
    affiliate_url: "https://vendeei.com.br/ultra-slim-mechanical",
    upvotes: 84,
    category: "Tools"
  },
  {
    id: 3,
    title: "Canvas Pro 12",
    description: "Tablet profissional dedicado para artistas e designers digitais, com tela Liquid Retina antirreflexo e caneta de latência zero.",
    price: 5499.00,
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8MwRr8eKQ4Jh8Xyg1podWt2k0GwYYKN9qza1rFyrCngStZKKHQx7ZsPZeSEu_LNCzBtfYTyLX9mFMuML0UMqza3zQicdJFSjW2bNbadEIigtYTT_cerUF62raFkzdF434nLllaQtZ2Q3cNGOU3P4Ni-tPt0Rrr_P6_D_NjO86Z8CqbLxi2QBjEZshxEMu_2yXFCQO74Bylf8gwp9Sb3joVrLvAgkiRIoKxjD9bFhRf5LUeH5TfdqZHXvFeKa1dqedPZZMpEY-1NI",
    affiliate_url: "https://vendeei.com.br/canvas-pro-12",
    upvotes: 215,
    category: "Tech"
  },
  {
    id: 4,
    title: "Nomad Watch Gen 3",
    description: "Relógio analógico clássico com estética Bauhaus, vidro de safira antirrisco e movimento automático preciso. Uma joia atemporal.",
    price: 750.00,
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuARebpQRiQKRPMByzAg8bUIbtukfg3_DI5FOi4tGFEtvLVPS56fSiplkBbByAu434Uf3bomi-69ccYVh9AK13tImblE2Nu7wM6rRSRJ2CcfoJFOUOTchjhjHL1fvd8wwUceS01zx7BCAYQ-kvTWdcvwXOscW6czjUwYZdN_vvfoRssiGAIwkaH5zfQbyAieDfL_orwATEhyMpF4clYH4XzEzOhAhwaI-ovDUu4eNzna4SB7q6Ggq2BUvXPLjJBXWNzICw8WMPGR-4Y",
    affiliate_url: "https://vendeei.com.br/nomad-watch-gen-3",
    upvotes: 56,
    category: "Curated"
  },
  {
    id: 5,
    title: "Minimalist Desk Light",
    description: "Luminária de mesa em alumínio anodizado preto, com controle de temperatura de luz e feixe direcional perfeito para leitura noturna.",
    price: 389.00,
    image_url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop",
    affiliate_url: "https://vendeei.com.br/desk-light",
    upvotes: 42,
    category: "Home"
  },
  {
    id: 6,
    title: "Leather Travel Backpack",
    description: "Mochila de viagem compacta em couro legítimo impermeável, com compartimento acolchoado suspenso para notebook de até 16 polegadas.",
    price: 649.00,
    image_url: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=600&auto=format&fit=crop",
    affiliate_url: "https://vendeei.com.br/leather-backpack",
    upvotes: 79,
    category: "Curated"
  },
];

export default function App() {
  // State for products list
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('vendeei_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_PRODUCTS;
  });

  // State for user's upvoted array
  const [upvotedIds, setUpvotedIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('vendeei_upvoted');
    return saved ? JSON.parse(saved) : [];
  });

  // Filter/Search states
  const [currentTab, setCurrentTab] = useState<'catalog' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const search = window.location.search;
      const path = window.location.pathname;
      if (hash === '#admin' || hash === '#/admin' || search.includes('tab=admin') || search.includes('page=admin') || path === '/admin') {
        return 'admin';
      }
    }
    return 'catalog';
  });

  // Keep path/hash and tab synchronized when clicking back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash;
        const search = window.location.search;
        const path = window.location.pathname;
        if (hash === '#admin' || hash === '#/admin' || search.includes('tab=admin') || search.includes('page=admin') || path === '/admin') {
          setCurrentTab('admin');
        } else {
          setCurrentTab('catalog');
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const handleSetTab = (tab: 'catalog' | 'admin') => {
    setCurrentTab(tab);
    if (typeof window !== 'undefined') {
      if (tab === 'admin') {
        window.location.hash = 'admin';
      } else {
        if (window.location.pathname === '/admin') {
          window.history.pushState({ tab }, '', '/');
        } else {
          window.location.hash = '';
          // Clean up the hash symbol from URL bar
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      }
    }
  };
  const [activeCategory, setActiveCategory] = useState<string>('Tudo');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'votes' | 'priceAsc' | 'priceDesc'>('votes');
  const [tagFilter, setTagFilter] = useState<string>('Tudo'); // Tudo, Novidades, Mais Votados, Black Friday

  // Modal states
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isDevGuideOpen, setIsDevGuideOpen] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Submit product form states
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('Tech');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newAffiliateUrl, setNewAffiliateUrl] = useState('');

  // Supabase client connection state (for real data check simulation)
  const isSupabaseConfigured = !!getSupabaseClient();

  // Synchronize localStorage
  useEffect(() => {
    localStorage.setItem('vendeei_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('vendeei_upvoted', JSON.stringify(upvotedIds));
  }, [upvotedIds]);

  // Handle local simulation of Supabase data fetching on load if client exists
  useEffect(() => {
    async function fetchSupabaseProducts() {
      const client = getSupabaseClient();
      if (client) {
        try {
          const { data, error } = await client
            .from('produtos')
            .select('*');
          
          if (error) throw error;
          if (data && data.length > 0) {
            // Map table columns to match component naming perfectly
            const mapped: Product[] = (data as any[]).map((item: any) => ({
              id: item.id,
              title: item.title || item.titulo || item.razao_social || 'Produto sem nome',
              description: item.description || item.descricao || 'Sem descrição',
              price: Number(item.price || item.preco || item.valor_total || 0),
              image_url: item.image_url || item.imagem_url || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
              affiliate_url: item.affiliate_url || item.link_afiliado || 'https://vendei.com.br',
              upvotes: Number(item.upvotes || item.votos || 0),
              category: item.category || item.categoria || 'Curated'
            }));
            setProducts(mapped);
          }
        } catch (err) {
          console.warn('Real Supabase query threw an error (is table structure created?). Falling back to client-preserved state.', err);
        }
      }
    }
    fetchSupabaseProducts();
  }, [isSupabaseConfigured]);

  // Handle interactive upvoting with live Supabase synchronization
  const handleUpvote = async (id: string | number) => {
    const numId = Number(id);
    const alreadyUpvoted = upvotedIds.includes(numId);
    let targetUpvotes = 0;

    // 1. Calculate the new vote value and update optimistic local React state immediately
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        targetUpvotes = alreadyUpvoted ? p.upvotes - 1 : p.upvotes + 1;
        return { ...p, upvotes: targetUpvotes };
      }
      return p;
    }));

    if (alreadyUpvoted) {
      setUpvotedIds(prev => prev.filter(item => item !== numId));
    } else {
      setUpvotedIds(prev => [...prev, numId]);
    }

    // 2. Synchronize to Supabase asynchronously if the client is configured
    const client = getSupabaseClient();
    if (client) {
      try {
        const { error } = await (client.from('produtos') as any)
          .update({ upvotes: targetUpvotes })
          .eq('id', id);
        
        if (error) {
          console.error('Erro ao salvar voto no Supabase:', error.message);
        } else {
          console.log(`Voto sincronizado com sucesso no Supabase para o produto ID: ${id}`);
        }
      } catch (err) {
        console.error('Erro de rede ao conectar com o banco de dados Supabase:', err);
      }
    }
  };

  // Handle deleting a product from Supabase & local state
  const handleDeleteProduct = async (id: string | number) => {
    // 1. Optimistic delete immediately to make it instant for the admin user
    setProducts(prev => prev.filter(p => p.id !== id));
    setUpvotedIds(prev => prev.filter(pId => pId !== Number(id)));

    // 2. Database delete if client is available
    const client = getSupabaseClient();
    if (client) {
      try {
        const { error } = await (client.from('produtos') as any)
          .delete()
          .eq('id', id);
        if (error) {
          console.error('Erro ao deletar no Supabase:', error.message);
        } else {
          console.log(`Deletado com sucesso no Supabase: ID ${id}`);
        }
      } catch (err) {
        console.error('Erro de rede ao deletar do Supabase:', err);
      }
    }
  };

  // Handle submit form with direct Supabase saving and local state preservation
  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim() || !newPrice.trim()) {
      setSubmitError('Preencha os campos obrigatórios (Título, Descrição e Preço).');
      return;
    }

    const priceNum = parseFloat(newPrice.replace(',', '.'));
    if (isNaN(priceNum) || priceNum <= 0) {
      setSubmitError('Por favor, informe um preço numérico válido.');
      return;
    }

    // Default image if empty
    const imgUrl = newImageUrl.trim() || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop';
    // Default affiliate url if empty
    const affUrl = newAffiliateUrl.trim() || `https://vendeei.com.br/product-${Date.now()}`;

    const rawId = Date.now();
    const newProduct: Product = {
      id: rawId,
      title: newTitle,
      description: newDescription,
      price: priceNum,
      image_url: imgUrl,
      affiliate_url: affUrl,
      upvotes: 1, // begins with 1 upvote
      category: newCategory,
    };

    // Attempt Supabase insert if client exists
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await (client.from('produtos') as any)
          .insert([
            {
              title: newTitle,
              description: newDescription,
              price: priceNum,
              image_url: imgUrl,
              affiliate_url: affUrl,
              upvotes: 1,
              category: newCategory
            }
          ])
          .select();
        
        if (error) {
          console.error('Erro ao inserir no Supabase:', error);
          setSubmitError(`Erro ao salvar no Supabase: ${error.message}. Mas adicionamos localmente para você ver na tela.`);
        } else if (data && data.length > 0) {
          const dbItem = data[0];
          const mapped: Product = {
            id: dbItem.id,
            title: dbItem.title || dbItem.titulo || dbItem.razao_social || newTitle,
            description: dbItem.description || dbItem.descricao || newDescription,
            price: Number(dbItem.price || dbItem.preco || dbItem.valor_total || priceNum),
            image_url: dbItem.image_url || dbItem.imagem_url || imgUrl,
            affiliate_url: dbItem.affiliate_url || dbItem.link_afiliado || affUrl,
            upvotes: Number(dbItem.upvotes || dbItem.votos || 1),
            category: dbItem.category || dbItem.categoria || newCategory
          };
          setProducts(prev => [mapped, ...prev]);
          setUpvotedIds(prev => [...prev, Number(mapped.id)]);
          
          // Reset fields
          setNewTitle('');
          setNewDescription('');
          setNewPrice('');
          setNewCategory('Tech');
          setNewImageUrl('');
          setNewAffiliateUrl('');
          setSubmitError('');
          setIsSubmitModalOpen(false);
          return;
        }
      } catch (err: any) {
        console.error('Erro de conexão ao inserir:', err);
        setSubmitError(`Erro de conexão: ${err.message || err}. Cadastrado localmente para demonstração.`);
      }
    }

    // Fallback to local sandbox tracking if Supabase is still simulated
    const updated = [newProduct, ...products];
    setProducts(updated);
    setUpvotedIds(prev => [...prev, Number(newProduct.id)]);

    // Clear form & close
    setNewTitle('');
    setNewDescription('');
    setNewPrice('');
    setNewCategory('Tech');
    setNewImageUrl('');
    setNewAffiliateUrl('');
    setSubmitError('');
    setIsSubmitModalOpen(false);
  };

  // Filter products criteria
  const filteredProducts = products.filter(p => {
    // 1. Category Filter (Tech, Home, Tools, Curated) from Navbar
    if (activeCategory !== 'Tudo' && p.category?.toLowerCase() !== activeCategory.toLowerCase()) {
      return false;
    }

    // 2. Tag Filter (Tudo, Novidades, Mais Votados, Black Friday)
    if (tagFilter === 'Novidades') {
      // simulate newest by ID or default behavior
      if (Number(p.id) < 5) return false;
    } else if (tagFilter === 'Mais Votados') {
      if (p.upvotes < 80) return false;
    } else if (tagFilter === 'Black Friday') {
      // items with promo price or simulate
      if (p.price < 800) return false;
    }

    // 3. Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCat = p.category?.toLowerCase().includes(q) || false;
      return matchTitle || matchDesc || matchCat;
    }

    return true;
  });

  // Sort criteria
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'votes') {
      return b.upvotes - a.upvotes;
    }
    if (sortBy === 'priceAsc') {
      return a.price - b.price;
    }
    if (sortBy === 'priceDesc') {
      return b.price - a.price;
    }
    return 0;
  });

  // Help quickly reset database to pristine condition
  const handleResetCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    setUpvotedIds([]);
    localStorage.removeItem('vendeei_products');
    localStorage.removeItem('vendeei_upvoted');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans select-none antialiased selection:bg-neutral-900 selection:text-white">
      
      {/* Styled Brand Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-neutral-200">
        <nav id="header-navbar" className="max-w-6xl mx-auto h-16 px-4 md:px-6 flex justify-between items-center">
          
          {/* Logo */}
          <div 
            onClick={() => { setActiveCategory('Tudo'); setTagFilter('Tudo'); setSearchQuery(''); }}
            className="font-geist text-2xl font-black text-black leading-none cursor-pointer tracking-tight flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <span>Vendeei</span>
            <span className="text-black">.</span>
          </div>

          {/* Navigation - Tech, Home, Tools, Curated */}
          <div className="hidden md:flex items-center space-x-8 font-sans">
            {['Tudo', 'Tech', 'Home', 'Tools', 'Curated'].map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setTagFilter('Tudo'); // Reset secondary tags
                  }}
                  className={`relative font-medium text-sm tracking-wide transition-all duration-200 pb-1 cursor-pointer ${
                    isActive 
                      ? 'text-black font-semibold' 
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {cat}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Call-to-action Button */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => handleSetTab(currentTab === 'catalog' ? 'admin' : 'catalog')}
              className={`font-geist font-bold text-[11px] tracking-wider uppercase px-4 py-2.5 rounded transition-all duration-150 flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 border ${
                currentTab === 'admin'
                  ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{currentTab === 'admin' ? 'Ver Site' : 'Painel Admin'}</span>
            </button>

            <button 
              onClick={() => setIsSubmitModalOpen(true)}
              className="bg-black text-white hover:bg-neutral-800 font-geist font-bold text-[11px] tracking-wider uppercase px-4 py-2.5 rounded transition-all duration-150 flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>CADASTRAR</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 flex-grow py-10 md:py-14 w-full">
        
        {currentTab === 'admin' ? (
          <div className="animate-in fade-in duration-200">
            {/* Admin Header */}
            <div className="mb-8 border-b border-neutral-200 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-in slide-in-from-top duration-300">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="bg-rose-100 text-rose-800 text-[10px] uppercase tracking-widest font-black px-2.5 py-1 rounded flex items-center gap-1 font-geist">
                    <Lock className="w-3 h-3" />
                    <span>ÁREA PRIVADA ADMINISTRATIVA</span>
                  </span>
                  <span className={`text-[10px] uppercase tracking-widest font-black px-2.5 py-1 rounded ${isSupabaseConfigured ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-800'}`}>
                    {isSupabaseConfigured ? '⚡ SUPABASE CONECTADO' : 'SANDBOX LOCAL'}
                  </span>
                </div>
                <h1 className="font-geist text-3xl font-black text-neutral-900 tracking-tight">
                  Painel de Controle do Administrador
                </h1>
                <p className="text-neutral-500 font-sans text-xs mt-1.5 leading-relaxed max-w-xl">
                  Aqui você pode cadastrar e excluir as ofertas diretamente no Supabase em tempo real. Os dados cadastrados aparecem instantaneamente na página principal.
                </p>
              </div>

              <button
                onClick={() => { handleSetTab('catalog'); }}
                className="bg-neutral-900 hover:bg-black text-white px-5 py-2.5 rounded text-xs font-bold tracking-wide transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>Voltar ao Catálogo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Form Column - Left */}
              <div className="lg:col-span-5">
                <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm sticky top-24">
                  <div className="flex items-center gap-2 mb-5 border-b border-neutral-100 pb-3">
                    <Plus className="w-5 h-5 text-neutral-800" />
                    <h3 className="font-geist font-black text-neutral-900 text-base">Cadastrar Novo Produto</h3>
                  </div>

                  <form onSubmit={handleSubmitProduct} className="space-y-4">
                    {submitError && (
                      <div className="bg-amber-50 border border-amber-200 text-amber-950 p-3 rounded text-xs leading-relaxed">
                        {submitError}
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-sans font-bold uppercase text-neutral-500 tracking-wide mb-1.5">
                        Título do Produto *
                      </label>
                      <input 
                        type="text"
                        required
                        placeholder="Ex: Teclado Mecânico Compacto RGB"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full text-xs bg-neutral-50 focus:bg-white border border-neutral-200 focus:border-black rounded p-3 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans font-bold uppercase text-neutral-500 tracking-wide mb-1.5">
                        Descrição Curta *
                      </label>
                      <textarea 
                        rows={3}
                        required
                        placeholder="Teclado mecânico ultra-fino de alta precisão com switches de perfil baixo e layout otimizado."
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="w-full text-xs bg-neutral-50 focus:bg-white border border-neutral-200 focus:border-black rounded p-3 outline-none transition-all resize-none leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-sans font-bold uppercase text-neutral-500 tracking-wide mb-1.5">
                          Preço (R$) *
                        </label>
                        <input 
                          type="text"
                          required
                          placeholder="Ex: 489.90"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          className="w-full text-xs bg-neutral-50 focus:bg-white border border-neutral-200 focus:border-black rounded p-3 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-sans font-bold uppercase text-neutral-500 tracking-wide mb-1.5">
                          Categoria *
                        </label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="w-full text-xs bg-neutral-50 focus:bg-white border border-neutral-200 focus:border-black rounded p-3 outline-none transition-all cursor-pointer font-medium"
                        >
                          <option value="Tech">Tech</option>
                          <option value="Home">Home</option>
                          <option value="Tools">Tools</option>
                          <option value="Curated">Curated</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans font-bold uppercase text-neutral-500 tracking-wide mb-1.5">
                        URL da Imagem
                      </label>
                      <input 
                        type="url"
                        placeholder="https://images.unsplash.com/... (Deixe vazio para usar padrão)"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        className="w-full text-xs bg-neutral-50 focus:bg-white border border-neutral-200 focus:border-black rounded p-3 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans font-bold uppercase text-neutral-500 tracking-wide mb-1.5">
                        Link de Afiliado *
                      </label>
                      <input 
                        type="url"
                        placeholder="https://vendeei.com.br/product-slug"
                        value={newAffiliateUrl}
                        onChange={(e) => setNewAffiliateUrl(e.target.value)}
                        className="w-full text-xs bg-neutral-50 focus:bg-white border border-neutral-200 focus:border-black rounded p-3 outline-none transition-all"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-black text-white hover:bg-neutral-800 font-geist font-black text-xs tracking-widest uppercase py-3 rounded-md transition-all cursor-pointer shadow-sm active:scale-98"
                    >
                      Cadastrar Produto
                    </button>
                  </form>
                </div>
              </div>

              {/* List Column - Right */}
              <div className="lg:col-span-7">
                <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-5 border-b border-neutral-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-neutral-800" />
                      <h3 className="font-geist font-black text-neutral-900 text-base">Produtos Ativos ({products.length})</h3>
                    </div>
                    {products.length > 0 && products.length !== INITIAL_PRODUCTS.length && (
                      <button 
                        onClick={handleResetCatalog}
                        className="text-xs text-rose-600 hover:underline cursor-pointer font-mono"
                      >
                        Resetar Tudo
                      </button>
                    )}
                  </div>

                  {products.length === 0 ? (
                    <div className="text-center py-12 text-neutral-400 text-xs">
                      Nenhum produto no catálogo atualmente.
                    </div>
                  ) : (
                    <div className="space-y-3.5 max-h-[640px] overflow-y-auto pr-1">
                      {products.map((item) => (
                        <div key={item.id} className="flex gap-4 p-3 border border-neutral-100 hover:border-neutral-200 rounded-lg transition-all items-center">
                          <img 
                            src={item.image_url} 
                            alt={item.title} 
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded object-cover border border-neutral-200 bg-neutral-100 flex-shrink-0"
                          />
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-bold text-xs text-neutral-900 truncate">{item.title}</h4>
                              <span className="bg-neutral-100 text-neutral-800 text-[9px] px-1.5 py-0.5 rounded uppercase font-bold text-center">
                                {item.category}
                              </span>
                            </div>
                            <p className="text-[10px] text-neutral-500 truncate mt-0.5 max-w-md">{item.description}</p>
                            <div className="flex items-center gap-3 mt-1 text-[10px] text-neutral-400 font-mono">
                              <span>R$ {item.price.toFixed(2)}</span>
                              <span>•</span>
                              <span>{item.upvotes} votos</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <a 
                              href={item.affiliate_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-black hover:bg-neutral-100 p-1.5 rounded transition-all"
                              title="Ver Link de Afiliado"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                            <button
                              onClick={() => handleDeleteProduct(item.id)}
                              className="text-neutral-400 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded transition-all cursor-pointer"
                              title="Remover Produto"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 pt-5 border-t border-neutral-100">
                    <h5 className="font-geist font-bold text-xs text-neutral-800 mb-2 flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5 text-amber-500" />
                      <span>Sincronização Direta do Banco:</span>
                    </h5>
                    <p className="text-[10px] text-neutral-500 leading-relaxed font-sans">
                      O formulário utiliza comandos SQL direct types, enviando inserções reais para o schema Supabase. Se houver falha de rede/credenciais, a interface salva localmente na memória RAM de forma isolada mantendo o sandbox utilizável.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <>
            {/* Mobile Category Navigation slider */}
            <div className="md:hidden flex items-center space-x-1 overflow-x-auto pb-4 mb-4 scrollbar-thin border-b border-neutral-200">
              {['Tudo', 'Tech', 'Home', 'Tools', 'Curated'].map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setTagFilter('Tudo');
                    }}
                    className={`whitespace-nowrap px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                      isActive 
                        ? 'bg-black text-white' 
                        : 'bg-white text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Hero Branding Section */}
            <section className="mb-10 text-left relative animate-in fade-in slide-in-from-bottom duration-300">
              <div className="flex justify-between items-start flex-col lg:flex-row lg:items-end gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-amber-100 text-amber-800 text-[10px] uppercase tracking-widest font-black font-geist px-2 py-0.5 rounded">
                      PORTAL AFILIADOS PREMIUM
                    </span>
                    <span className="bg-neutral-100 text-neutral-800 text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded">
                      BRASIL
                    </span>
                  </div>
                  <h1 className="font-geist text-4xl md:text-5xl font-black text-neutral-900 leading-none tracking-tight mb-3">
                    Vendeei<span className="text-black">.</span>
                  </h1>
                  <p className="text-neutral-500 font-sans text-base max-w-2xl leading-relaxed">
                    As melhores ofertas curadas para você. Uma seleção premium de tecnologia, ferramentas e utilitários domésticos com design elegante, pronto para conversão.
                  </p>
                </div>
              </div>
            </section>

            {/* Controls Panel: Filters, Searching & Sorting */}
            <div className="bg-white border border-neutral-200 rounded-lg p-4 md:p-6 mb-8 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                
                {/* Tag Badges filter in row */}
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  {[
                    { name: 'Tudo', label: 'Tudo' },
                    { name: 'Novidades', label: '✨ Novidades' },
                    { name: 'Mais Votados', label: '🔥 Mais Votados' },
                    { name: 'Black Friday', label: '⚡ Black Friday' }
                  ].map((tag) => {
                    const isActive = tagFilter === tag.name;
                    return (
                      <button
                        key={tag.name}
                        onClick={() => setTagFilter(tag.name)}
                        className={`px-3.5 py-1.5 text-xs font-geist font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                          isActive 
                            ? 'bg-black text-white' 
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        {tag.label}
                      </button>
                    );
                  })}
                </div>

                {/* Live Search and Sort selection */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:max-w-md lg:max-w-lg justify-end">
                  {/* Search block */}
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input 
                      type="text"
                      placeholder="Buscar produtos, descrição..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white text-xs border border-neutral-200 focus:border-black rounded-md pl-9 pr-4 py-2.5 outline-none transition-all"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Sorting */}
                  <div className="flex items-center gap-1.5 min-w-[140px]">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-white text-xs border border-neutral-200 focus:border-black rounded-md p-2 outline-none cursor-pointer flex-grow font-geist font-medium"
                    >
                      <option value="votes">Mais Votos Primeiro</option>
                      <option value="priceAsc">Menor Preço</option>
                      <option value="priceDesc">Maior Preço</option>
                    </select>
                  </div>
                </div>

              </div>
            </div>

            {/* Dynamic List counter / state helper */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="font-geist text-xs font-bold uppercase tracking-wider text-neutral-400">
                  {activeCategory} {tagFilter !== 'Tudo' ? `/ ${tagFilter}` : ''}
                </span>
                <span className="bg-neutral-200 text-neutral-800 text-[10px] font-mono px-2 py-0.5 rounded font-black">
                  {sortedProducts.length} itens encontrados
                </span>
              </div>

              <div className="flex items-center gap-2">
                {products.length !== INITIAL_PRODUCTS.length && (
                  <button 
                    onClick={handleResetCatalog}
                    className="text-[11px] font-mono text-rose-600 hover:underline cursor-pointer"
                  >
                    Reset To Sandbox Defaults
                  </button>
                )}
              </div>
            </div>

            {/* Product Grid Layout */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-350">
                {sortedProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    description={p.description}
                    price={p.price}
                    image_url={p.image_url}
                    affiliate_url={p.affiliate_url}
                    upvotes={p.upvotes}
                    isUpvoted={upvotedIds.includes(Number(p.id))}
                    onUpvote={handleUpvote}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-dashed border-neutral-200 rounded-lg p-16 text-center shadow-sm">
                <SlidersHorizontal className="w-8 h-8 text-neutral-300 mx-auto mb-3" />
                <h3 className="text-sm font-geist font-bold text-neutral-800 mb-1">Nenhum produto atende aos filtros</h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-4">
                  Tente redefinir suas seleções de tags, categoria ou digitação do campo de busca.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('Tudo');
                    setTagFilter('Tudo');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 border border-neutral-200 hover:border-black text-xs font-bold rounded-md transition-all cursor-pointer bg-white"
                >
                  Limpar Filtros e Ver Todos
                </button>
              </div>
            )}
          </>
        )}

      </main>

      {/* Structured Developer Guidelines drawer/guide block */}
      {isDevGuideOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end transition-opacity">
          <div className="bg-white w-full max-w-2xl h-full flex flex-col shadow-2xl relative animate-in slide-in-from-right duration-300">
            
            {/* Control Header */}
            <div className="border-b border-neutral-200 p-5 flex justify-between items-center bg-black text-white">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-amber-500" />
                <div>
                  <h3 className="font-geist font-black text-base">Vendeei.com.br — Guia da Arquitetura</h3>
                  <p className="text-[10px] text-neutral-400 font-mono">Estrutura de Pastas e Configurações de Banco</p>
                </div>
              </div>
              <button 
                onClick={() => setIsDevGuideOpen(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Document Container */}
            <div className="flex-grow p-6 overflow-y-auto font-sans leading-relaxed text-sm text-neutral-700">
              
              <div className="bg-neutral-50 border-l-4 border-amber-500 p-4 mb-6 rounded">
                <p className="text-xs font-mono text-amber-800">
                  <strong>IMPORTANTE:</strong> O código aqui apresentado utiliza a arquitetura <strong>Next.js (App Router)</strong> de acordo com suas instruções de Desenvolvedor Sênior. Abaixo está a distribuição exata dos caminhos e scripts de suporte!
                </p>
              </div>

              {/* SECTION: Directories structure */}
              <div className="mb-6">
                <h4 className="font-geist font-bold text-neutral-900 text-sm flex items-center gap-1.5 mb-2.5">
                  <span className="bg-neutral-900 text-white text-[11px] px-1.5 py-0.5 rounded">1</span>
                  ESTRUTURA DE PASTAS (Next.js Application Layout)
                </h4>
                
                <div className="bg-neutral-900 text-neutral-200 p-4 rounded-md font-mono text-xs overflow-x-auto leading-relaxed shadow-inner">
                  {`vendeei-affiliate-portal/
├── public/                 # Assets estáticos (logos, favicons)
├── src/
│   ├── app/                # Next.js App Router (Páginas)
│   │   ├── page.tsx        # Página Principal (Listagem Curada)
│   │   ├── layout.tsx      # Configuração global de layout / HTML e fontes
│   │   └── globals.css     # Diretivas Tailwind e fontes Geist/Inter
│   │
│   ├── components/         # Componentes compartilhados reutilizáveis
│   │   └── ProductCard.tsx # Visual Card do Produto e upvote triggers
│   │
│   ├── lib/                # Configurações de SDKs de Serviços Externos
│   │   └── supabase.ts     # Supabase Client Wrapper (Lazy Init)
│   │
│   └── types.ts            # Definição comum de interfaces TypeScript
├── .env.local              # Credenciais Supabase (Segredos do Cliente)
└── tailwind.config.js      # Layouts, fonts Geist/Inter e custom values`}
                </div>
              </div>

              {/* SECTION: Supabase configuration */}
              <div className="mb-6">
                <h4 className="font-geist font-bold text-neutral-900 text-sm flex items-center gap-1.5 mb-2.5">
                  <span className="bg-neutral-900 text-white text-[11px] px-1.5 py-0.5 rounded">2</span>
                  CONFIGURAÇÃO SUPABASE — CLIENT INITIALIZER
                </h4>
                <p className="text-xs text-neutral-500 mb-3">
                  Local recomendado: <code className="bg-neutral-100 text-neutral-800 px-1 py-0.5 rounded text-[11px]">src/lib/supabase.ts</code>
                </p>

                <div className="bg-neutral-900 text-neutral-200 p-4 rounded-md font-mono text-xs overflow-x-auto shadow-inner">
                  {`import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Variáveis do Supabase ausentes no arquivo .env.local!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);`}
                </div>
              </div>

              {/* SECTION: Supabase Database Table SQL */}
              <div className="mb-6 border-t border-neutral-100 pt-5">
                <h4 className="font-geist font-bold text-neutral-900 text-sm flex items-center gap-1.5 mb-2">
                  <Database className="w-4 h-4 text-neutral-600" />
                  SCHEMA DE TABELAS SQL DA BASE DE DADOS
                </h4>
                <p className="text-xs text-neutral-500 mb-3">
                  Execute este comando SQL dentro do painel do Supabase editor SQL para estruturar a tabela <code className="bg-neutral-100 text-neutral-800 px-1 py-0.5 rounded text-[11px]">produtos</code>:
                </p>

                <div className="bg-neutral-900 text-neutral-200 p-4 rounded-md font-mono text-xs overflow-x-auto shadow-inner">
                  {`-- Criação da Tabela de Produtos/Ofertas de Afiliados
create table produtos (
  id bigint generated by default as identity primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  price numeric(10, 2) not null,
  image_url text,
  affiliate_url text not null,
  upvotes integer default 0,
  category text default 'Tech'
);

-- Ativação de RLS (Row Level Security) para segurança adicional do banco
alter table produtos enable row level security;

-- Criar política pública de leitura (Qualquer visitante lê os produtos do portal)
create policy "Qualquer um pode ver as ofertas" 
on produtos for select using (true);`}
                </div>
              </div>

              {/* SECTION: Environment Credentials Setup instruction */}
              <div className="p-4 bg-teal-50 text-teal-900 rounded-lg border border-teal-100 text-xs">
                <span className="font-semibold block mb-1">🔥 Integração Amigável</span>
                Defina <code className="bg-teal-100 text-teal-800 px-1 rounded font-bold">VITE_SUPABASE_URL</code> e <code className="bg-teal-100 text-teal-800 px-1 rounded font-bold">VITE_SUPABASE_ANON_KEY</code> na sua aba de segredos ou arquivo .env para que o applet conecte automaticamente com o seu banco real! Se as variáveis estiverem vazias, o portal continuará ativo no modo Sandbox, atualizando dados de forma 100% interativa na tela.
              </div>

            </div>

            {/* Control Footer */}
            <div className="border-t border-neutral-200 p-4 bg-neutral-100 flex justify-end">
              <button 
                onClick={() => setIsDevGuideOpen(false)}
                className="bg-black hover:bg-neutral-800 text-white font-geist font-bold text-xs tracking-wider uppercase px-5 py-2.5 rounded cursor-pointer transition-all"
              >
                Entendi, Fechar Guia
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Styled Interactive SUBMIT PRODUCT MODAL */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-300 w-full max-w-lg rounded-xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            <div className="border-b border-neutral-100 p-5 flex justify-between items-center bg-black text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="font-geist font-bold text-sm tracking-widest uppercase">ENVIAR NOVA OFERTA</h3>
              </div>
              <button 
                onClick={() => { setIsSubmitModalOpen(false); setSubmitError(''); }}
                className="text-neutral-400 hover:text-white p-1 rounded-full cursor-pointer focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitProduct} className="p-6 space-y-4">
              
              {submitError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded font-semibold font-sans">
                  ⚠️ {submitError}
                </div>
              )}

              {/* Title */}
              <div>
                <label className="text-[11px] font-geist font-bold uppercase text-neutral-400 block mb-1">
                  Nome do Produto <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  required
                  placeholder="Ex: Studio Master 500"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs bg-neutral-50 focus:bg-white border border-neutral-200 focus:border-black rounded p-3 outline-none transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-[11px] font-geist font-bold uppercase text-neutral-400 block mb-1">
                  Descrição Curta <span className="text-red-500">*</span>
                </label>
                <textarea 
                  required
                  rows={2}
                  maxLength={160}
                  placeholder="Ex: Referência em áudio profissional com cancelamento de ruído..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full text-xs bg-neutral-50 focus:bg-white border border-neutral-200 focus:border-black rounded p-3 outline-none transition-all resize-none"
                />
                <span className="text-[10px] text-neutral-300 block text-right mt-0.5 font-mono">
                  {newDescription.length}/160 caracteres
                </span>
              </div>

              {/* Row Grid: Price & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-geist font-bold uppercase text-neutral-400 block mb-1">
                    Preço (R$) <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="Ex: 1299.00"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full text-xs bg-neutral-50 focus:bg-white border border-neutral-200 focus:border-black rounded p-3 outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label className="text-[11px] font-geist font-bold uppercase text-neutral-400 block mb-1">
                    Categoria
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full text-xs bg-neutral-50 focus:bg-white border border-neutral-200 focus:border-black rounded p-3 outline-none transition-all cursor-pointer"
                  >
                    <option value="Tech">Tech</option>
                    <option value="Home">Home</option>
                    <option value="Tools">Tools</option>
                    <option value="Curated">Curated</option>
                  </select>
                </div>
              </div>

              {/* Image URL with quick options */}
              <div>
                <label className="text-[11px] font-geist font-bold uppercase text-neutral-400 block mb-1">
                  URL da Imagem
                </label>
                <input 
                  type="url"
                  placeholder="Deixe vazio para usar imagem padrão ou insira link público"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full text-xs bg-neutral-50 focus:bg-white border border-neutral-200 focus:border-black rounded p-3 outline-none transition-all"
                />
                
                {/* Optional sample presets to make it fun */}
                <div className="flex gap-2 mt-2 items-center">
                  <span className="text-[10px] text-neutral-400 font-semibold font-geist">Opções sugeridas:</span>
                  <button 
                    type="button"
                    onClick={() => setNewImageUrl("https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop")}
                    className="text-[10px] bg-neutral-100 hover:bg-neutral-200 px-2 py-0.5 rounded text-neutral-700 cursor-pointer"
                  >
                    Smartwatch
                  </button>
                  <button 
                    type="button"
                    onClick={() => setNewImageUrl("https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop")}
                    className="text-[10px] bg-neutral-100 hover:bg-neutral-200 px-2 py-0.5 rounded text-neutral-700 cursor-pointer"
                  >
                    Tênis Sneaker
                  </button>
                  <button 
                    type="button"
                    onClick={() => setNewImageUrl("https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop")}
                    className="text-[10px] bg-neutral-100 hover:bg-neutral-200 px-2 py-0.5 rounded text-neutral-700 cursor-pointer"
                  >
                    Monitor Pro
                  </button>
                </div>
              </div>

              {/* Affiliate URL */}
              <div>
                <label className="text-[11px] font-geist font-bold uppercase text-neutral-400 block mb-1">
                  Link de Afiliado (CTA Link)
                </label>
                <input 
                  type="url"
                  placeholder="https://vendeei.com.br/seu-link-afiliado"
                  value={newAffiliateUrl}
                  onChange={(e) => setNewAffiliateUrl(e.target.value)}
                  className="w-full text-xs bg-neutral-50 focus:bg-white border border-neutral-200 focus:border-black rounded p-3 outline-none transition-all"
                />
              </div>

              {/* Footer Buttons */}
              <div className="pt-4 border-t border-neutral-100 flex gap-3 justify-end">
                <button 
                  type="button"
                  onClick={() => { setIsSubmitModalOpen(false); setSubmitError(''); }}
                  className="px-5 py-2.5 text-xs text-neutral-500 hover:text-black font-semibold rounded cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="bg-black hover:bg-neutral-800 text-white font-geist font-bold text-xs tracking-wider uppercase px-6 py-2.5 rounded cursor-pointer transition-all active:scale-95 shadow-md"
                >
                  Confirmar Cadastro
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Structured Minimalist Footer */}
      <footer className="bg-white border-t border-neutral-200 mt-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            
            <div className="flex flex-col gap-2">
              <div className="font-geist text-2xl font-black text-black leading-none tracking-tight">
                Vendeei<span className="text-black">.</span>
              </div>
              <p className="text-neutral-400 font-sans text-xs tracking-wide">
                © 2026 Vendeei. High-Contrast Curated Products Core.
              </p>
            </div>

            {/* Quick footer interaction panel */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-semibold text-neutral-500 font-geist">
              <button onClick={() => setIsDevGuideOpen(true)} className="hover:text-black transition-colors cursor-pointer flex items-center gap-1.5 text-neutral-800">
                <FileCode className="w-3.5 h-3.5" />
                <span>Instruções da Pasta</span>
              </button>
              <a href="#" className="hover:text-black transition-colors">Sobre</a>
              <a href="#" className="hover:text-black transition-colors">Privacidade</a>
              <a href="#" className="hover:text-black transition-colors">Termos</a>
              <a href="#" className="hover:text-black transition-colors">Anunciar</a>
              <a href="#" className="hover:text-black transition-colors">Contato</a>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}
