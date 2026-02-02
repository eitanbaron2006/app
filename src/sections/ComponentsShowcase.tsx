import { useEffect, useRef, useState } from 'react';
import { 
  Check, 
  ChevronDown, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Info,
  Bell,
  Search,
  Calendar,
  Upload,
  Download,
  Copy,
  Trash2,
  Edit3,
  Star,
  Heart,
  Share2,
  MoreHorizontal,
  Filter,
  Grid,
  List,
  Settings,
  User,
  LogOut,
  Shield,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Link,
  Paperclip,
  Image as ImageIcon,
  Video,
  Music,
  FileText,
  Folder,
  Bookmark,
  Tag,
  Clock,
  Lock,
  RefreshCw,
  Save,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown as ChevronDownIcon,
  Moon,
  Menu,
  Maximize2,
  Minimize2,
  ExternalLink,
  Loader2
} from 'lucide-react';

const ComponentsShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('option1');
  const [selectedRadio, setSelectedRadio] = useState('radio1');
  const [checkedItems, setCheckedItems] = useState({
    checkbox1: true,
    checkbox2: false,
    checkbox3: true,
  });
  const [sliderValue, setSliderValue] = useState(50);
  const [brightnessValue, setBrightnessValue] = useState(75);
  const [toggleStates, setToggleStates] = useState({
    toggle1: true,
    toggle2: false,
    toggle3: true,
  });
  const [activeTab, setActiveTab] = useState('tab1');
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCheckboxChange = (name: string) => {
    setCheckedItems(prev => ({ ...prev, [name]: !prev[name as keyof typeof checkedItems] }));
  };

  const handleToggleChange = (name: string) => {
    setToggleStates(prev => ({ ...prev, [name]: !prev[name as keyof typeof toggleStates] }));
  };

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <section ref={sectionRef} id="components" className="relative py-32">
      <div className="w-full px-8 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-sm tracking-[0.3em] uppercase mb-6 block" style={{ color: 'var(--text-muted)' }}>
            Design System
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display mb-6" style={{ color: 'var(--text-primary)' }}>
            UI Components
            <span style={{ color: 'var(--text-muted)' }} className="italic block mt-2">Library</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto font-light" style={{ color: 'var(--text-secondary)' }}>
            A comprehensive collection of beautifully crafted interface elements
          </p>
        </div>

        {/* Components Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          
          {/* Buttons Section */}
          <div className={`elegant-card rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '100ms' }}>
            <h3 className="text-lg font-display mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-input)' }}>
                <Grid className="w-4 h-4" />
              </div>
              Buttons
            </h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <button className="btn-elegant-primary text-xs">Primary</button>
                <button className="btn-elegant text-xs">Secondary</button>
                <button 
                  className="px-4 py-2 rounded-lg text-xs transition-colors"
                  style={{ 
                    background: 'var(--bg-input)',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  Ghost
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="btn-elegant-primary text-xs flex items-center gap-2">
                  <Plus className="w-3 h-3" />
                  Add New
                </button>
                <button className="btn-elegant text-xs flex items-center gap-2">
                  <Save className="w-3 h-3" />
                  Save
                </button>
                <button 
                  onClick={handleLoadingClick}
                  disabled={isLoading}
                  className="btn-elegant-primary text-xs flex items-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                  {isLoading ? 'Loading...' : 'Refresh'}
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors" style={{ background: 'var(--bg-input)', color: 'var(--text-muted)' }}>
                  <Heart className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors" style={{ background: 'var(--bg-input)', color: 'var(--text-muted)' }}>
                  <Star className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors" style={{ background: 'var(--bg-input)', color: 'var(--text-muted)' }}>
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors" style={{ background: 'var(--bg-input)', color: 'var(--text-muted)' }}>
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Form Inputs */}
          <div className={`elegant-card rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '150ms' }}>
            <h3 className="text-lg font-display mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-input)' }}>
                <Edit3 className="w-4 h-4" />
              </div>
              Form Inputs
            </h3>
            <div className="space-y-4">
              <div>
                <label className="form-label text-xs mb-1">Text Input</label>
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  className="form-input text-sm"
                />
              </div>
              <div>
                <label className="form-label text-xs mb-1">With Icon</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none z-10" style={{ color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="form-input text-sm !pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="form-label text-xs mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none z-10" style={{ color: 'var(--text-muted)' }} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="form-input text-sm !pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="form-label text-xs mb-1">Textarea</label>
                <textarea 
                  placeholder="Enter your message..." 
                  className="textarea-elegant text-sm"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Select & Dropdown */}
          <div className={`elegant-card rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
            <h3 className="text-lg font-display mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-input)' }}>
                <ChevronDown className="w-4 h-4" />
              </div>
              Select & Dropdown
            </h3>
            <div className="space-y-4">
              <div>
                <label className="form-label text-xs mb-1">Select Option</label>
                <select 
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="select-elegant text-sm"
                >
                  <option value="option1">Option One</option>
                  <option value="option2">Option Two</option>
                  <option value="option3">Option Three</option>
                  <option value="option4">Option Four</option>
                </select>
              </div>
              <div>
                <label className="form-label text-xs mb-1">Country</label>
                <select className="select-elegant text-sm">
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Germany</option>
                  <option>France</option>
                </select>
              </div>
              <div>
                <label className="form-label text-xs mb-1">Category</label>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Photos', 'Videos', 'Documents', 'Music'].map((cat) => (
                    <button 
                      key={cat}
                      className="px-3 py-1.5 rounded-full text-xs transition-colors"
                      style={{ 
                        background: cat === 'All' ? 'var(--text-primary)' : 'var(--bg-input)',
                        color: cat === 'All' ? 'var(--bg-primary)' : 'var(--text-muted)',
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Checkboxes */}
          <div className={`elegant-card rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '250ms' }}>
            <h3 className="text-lg font-display mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-input)' }}>
                <Check className="w-4 h-4" />
              </div>
              Checkboxes
            </h3>
            <div className="space-y-3">
              {[
                { key: 'checkbox1', label: 'Enable notifications' },
                { key: 'checkbox2', label: 'Subscribe to newsletter' },
                { key: 'checkbox3', label: 'Auto-save changes' },
              ].map(({ key, label }) => (
                <label key={key} className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={checkedItems[key as keyof typeof checkedItems]}
                    onChange={() => handleCheckboxChange(key)}
                  />
                  <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                </label>
              ))}
              <div className="pt-2">
                <label className="checkbox-wrapper">
                  <input type="checkbox" disabled />
                  <span style={{ color: 'var(--text-muted)' }}>Disabled option</span>
                </label>
              </div>
            </div>
          </div>

          {/* Radio Buttons */}
          <div className={`elegant-card rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
            <h3 className="text-lg font-display mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-input)' }}>
                <div className="w-2 h-2 rounded-full" style={{ background: 'var(--text-muted)' }} />
              </div>
              Radio Buttons
            </h3>
            <div className="space-y-3">
              {[
                { key: 'radio1', label: 'Standard Delivery (5-7 days)' },
                { key: 'radio2', label: 'Express Delivery (2-3 days)' },
                { key: 'radio3', label: 'Same Day Delivery' },
              ].map(({ key, label }) => (
                <label key={key} className="radio-wrapper">
                  <input
                    type="radio"
                    name="delivery"
                    value={key}
                    checked={selectedRadio === key}
                    onChange={() => setSelectedRadio(key)}
                  />
                  <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Toggle Switches */}
          <div className={`elegant-card rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '350ms' }}>
            <h3 className="text-lg font-display mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-input)' }}>
                <Settings className="w-4 h-4" />
              </div>
              Toggle Switches
            </h3>
            <div className="space-y-4">
              {[
                { key: 'toggle1', label: 'Dark Mode', icon: Moon },
                { key: 'toggle2', label: 'Auto-sync', icon: RefreshCw },
                { key: 'toggle3', label: 'Notifications', icon: Bell },
              ].map(({ key, label, icon: Icon }) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                  </div>
                  <button
                    onClick={() => handleToggleChange(key)}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 border ${
                      toggleStates[key as keyof typeof toggleStates] ? 'bg-black' : 'bg-gray-300'
                    }`}
                    style={{
                      background: toggleStates[key as keyof typeof toggleStates]
                        ? 'var(--text-primary)'
                        : 'var(--bg-input)',
                      borderColor: 'var(--border-color)'
                    }}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${
                        toggleStates[key as keyof typeof toggleStates] ? 'translate-x-7' : 'translate-x-1'
                      }`}
                      style={{
                        background: toggleStates[key as keyof typeof toggleStates]
                          ? 'var(--bg-primary)'
                          : 'var(--text-primary)'
                      }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Slider */}
          <div className={`elegant-card rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '400ms' }}>
            <h3 className="text-lg font-display mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-input)' }}>
                <Minus className="w-4 h-4" />
              </div>
              Slider
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Volume</span>
                  <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{sliderValue}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="slider-elegant"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Brightness</span>
                  <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{brightnessValue}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={brightnessValue}
                  onChange={(e) => setBrightnessValue(Number(e.target.value))}
                  className="slider-elegant"
                />
              </div>
            </div>
          </div>

          {/* Progress Bars */}
          <div className={`elegant-card rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '450ms' }}>
            <h3 className="text-lg font-display mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-input)' }}>
                <RefreshCw className="w-4 h-4" />
              </div>
              Progress
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Uploading...</span>
                  <span className="text-xs" style={{ color: 'var(--text-primary)' }}>75%</span>
                </div>
                <div className="progress-elegant">
                  <div className="progress-fill" style={{ width: '75%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Processing</span>
                  <span className="text-xs" style={{ color: 'var(--text-primary)' }}>45%</span>
                </div>
                <div className="progress-elegant">
                  <div className="progress-fill" style={{ width: '45%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Complete</span>
                  <span className="text-xs" style={{ color: 'var(--text-primary)' }}>100%</span>
                </div>
                <div className="progress-elegant">
                  <div className="progress-fill" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className={`elegant-card rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '500ms' }}>
            <h3 className="text-lg font-display mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-input)' }}>
                <List className="w-4 h-4" />
              </div>
              Tabs
            </h3>
            <div className="space-y-4">
              <div className="flex gap-1 p-1 rounded-lg" style={{ background: 'var(--bg-input)' }}>
                {[
                  { key: 'tab1', label: 'General' },
                  { key: 'tab2', label: 'Security' },
                  { key: 'tab3', label: 'Billing' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className="flex-1 py-2 px-3 rounded-md text-xs font-medium transition-all"
                    style={{
                      background: activeTab === key ? 'var(--bg-card)' : 'transparent',
                      color: activeTab === key ? 'var(--text-primary)' : 'var(--text-muted)',
                      boxShadow: activeTab === key ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="p-4 rounded-lg" style={{ background: 'var(--bg-input)' }}>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {activeTab === 'tab1' && 'General settings and preferences for your account.'}
                  {activeTab === 'tab2' && 'Manage your security settings and two-factor authentication.'}
                  {activeTab === 'tab3' && 'View and manage your billing information and subscriptions.'}
                </p>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className={`elegant-card rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '550ms' }}>
            <h3 className="text-lg font-display mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-input)' }}>
                <Tag className="w-4 h-4" />
              </div>
              Badges
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="badge-elegant">Default</span>
              <span className="badge-elegant" style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' }}>Primary</span>
              <span className="badge-elegant flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Success
              </span>
              <span className="badge-elegant flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Pending
              </span>
              <span className="badge-elegant flex items-center gap-1">
                <Star className="w-3 h-3" />
                Featured
              </span>
              <span className="badge-elegant flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Pro
              </span>
            </div>
          </div>

          {/* Alerts */}
          <div className={`elegant-card rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
            <h3 className="text-lg font-display mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-input)' }}>
                <AlertCircle className="w-4 h-4" />
              </div>
              Alerts
            </h3>
            <div className="space-y-3">
              <div className="alert-elegant flex items-center gap-3">
                <Info className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>This is an informational message.</span>
              </div>
              <div className="alert-elegant alert-success flex items-center gap-3">
                <CheckCircle className="w-4 h-4 flex-shrink-0 text-green-500" />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Your changes have been saved successfully.</span>
              </div>
              <div className="alert-elegant alert-error flex items-center gap-3">
                <XCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Something went wrong. Please try again.</span>
              </div>
            </div>
          </div>

          {/* File Types */}
          <div className={`elegant-card rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '650ms' }}>
            <h3 className="text-lg font-display mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-input)' }}>
                <Folder className="w-4 h-4" />
              </div>
              File Types
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: ImageIcon, label: 'Image' },
                { icon: Video, label: 'Video' },
                { icon: Music, label: 'Audio' },
                { icon: FileText, label: 'Doc' },
                { icon: Folder, label: 'Folder' },
                { icon: Bookmark, label: 'Bookmark' },
                { icon: Paperclip, label: 'Attach' },
                { icon: Link, label: 'Link' },
              ].map(({ icon: Icon, label }) => (
                <div 
                  key={label}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg transition-colors cursor-pointer hover:opacity-80"
                  style={{ background: 'var(--bg-input)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Icons */}
          <div className={`elegant-card rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '700ms' }}>
            <h3 className="text-lg font-display mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-input)' }}>
                <ArrowRight className="w-4 h-4" />
              </div>
              Navigation
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                ArrowLeft, ArrowRight, ArrowUp, ArrowDown,
                ChevronLeft, ChevronRight, ChevronUp, ChevronDownIcon,
                Menu, Maximize2, Minimize2, ExternalLink
              ].map((Icon, i) => (
                <button 
                  key={i}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                  style={{ background: 'var(--bg-input)', color: 'var(--text-muted)' }}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* User Actions */}
          <div className={`elegant-card rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '750ms' }}>
            <h3 className="text-lg font-display mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-input)' }}>
                <User className="w-4 h-4" />
              </div>
              User Actions
            </h3>
            <div className="space-y-2">
              {[
                { icon: User, label: 'Profile' },
                { icon: Settings, label: 'Settings' },
                { icon: CreditCard, label: 'Billing' },
                { icon: Shield, label: 'Security' },
                { icon: LogOut, label: 'Sign Out' },
              ].map(({ icon: Icon, label }) => (
                <button 
                  key={label}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-left"
                  style={{ 
                    background: 'var(--bg-input)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className={`elegant-card rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '800ms' }}>
            <h3 className="text-lg font-display mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-input)' }}>
                <Mail className="w-4 h-4" />
              </div>
              Contact
            </h3>
            <div className="space-y-3">
              {[
                { icon: Mail, label: 'hello@albumart.com' },
                { icon: Phone, label: '+1 (555) 123-4567' },
                { icon: MapPin, label: 'New York, NY' },
                { icon: Calendar, label: 'Mon - Fri, 9am - 6pm' },
              ].map(({ icon: Icon, label }) => (
                <div 
                  key={label}
                  className="flex items-center gap-3"
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--bg-input)' }}
                  >
                    <Icon className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  </div>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Search & Filter */}
          <div className={`elegant-card rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '850ms' }}>
            <h3 className="text-lg font-display mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-input)' }}>
                <Search className="w-4 h-4" />
              </div>
              Search & Filter
            </h3>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="form-input text-sm !pl-10"
                />
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs transition-colors" style={{ background: 'var(--bg-input)', color: 'var(--text-muted)' }}>
                  <Filter className="w-3 h-3" />
                  Filter
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs transition-colors" style={{ background: 'var(--bg-input)', color: 'var(--text-muted)' }}>
                  <Grid className="w-3 h-3" />
                  Grid
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs transition-colors" style={{ background: 'var(--bg-input)', color: 'var(--text-muted)' }}>
                  <List className="w-3 h-3" />
                  List
                </button>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className={`elegant-card rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '900ms' }}>
            <h3 className="text-lg font-display mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-input)' }}>
                <Upload className="w-4 h-4" />
              </div>
              File Upload
            </h3>
            <div 
              className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <Upload className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
              <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Drop files here or click to upload</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>PNG, JPG, PDF up to 10MB</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs transition-colors" style={{ background: 'var(--bg-input)', color: 'var(--text-muted)' }}>
                <Download className="w-3 h-3" />
                Download
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs transition-colors" style={{ background: 'var(--bg-input)', color: 'var(--text-muted)' }}>
                <Copy className="w-3 h-3" />
                Copy
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs transition-colors" style={{ background: 'var(--bg-input)', color: 'var(--text-muted)' }}>
                <Trash2 className="w-3 h-3" />
                Delete
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ComponentsShowcase;
