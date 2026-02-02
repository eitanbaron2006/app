import { useState, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Eye,
  Layout,
  RotateCw,
  Trash2,
  Download,
  Share2,
  X,
  Sparkles,
  Image as ImageIcon,
  Settings,
  ImagePlus,
  Upload,
  Shuffle,
  RotateCcw,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import justifiedLayout from 'justified-layout';

// Mock album data
const mockAlbum = {
  id: 1,
  title: 'Eitan baron',
  status: 'Editing',
  config: {
    size: '20 x 20',
    photoGap: 2,
    pageMargin: 0,
    cornerRadius: 0,
    backgroundColor: '#ffffff',
    backgroundImage: null,
  },
  photos: Array.from({ length: 30 }, (_, i) => {
    // Create varied aspect ratios for realistic justified layout
    const aspectRatios = [
      { width: 400, height: 300 },  // 4:3 landscape
      { width: 300, height: 400 },  // 3:4 portrait
      { width: 500, height: 300 },  // 5:3 wide landscape
      { width: 400, height: 400 },  // 1:1 square
      { width: 350, height: 500 },  // tall portrait
      { width: 600, height: 400 },  // 3:2 landscape
    ];
    const ratio = aspectRatios[i % aspectRatios.length];
    return {
      id: i + 1,
      url: `https://picsum.photos/${ratio.width}/${ratio.height}?random=${i + 1}`,
      width: ratio.width,
      height: ratio.height,
      aspectRatio: ratio.width / ratio.height,
      used: i < 20,
    };
  }),
  pages: [
    { id: 'cover', type: 'cover', photos: [] },
    { id: 1, type: 'page', photos: [] },
    { id: 2, type: 'page', photos: [] },
    { id: 3, type: 'page', photos: [] },
  ],
};

const AlbumEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [album] = useState(mockAlbum);
  const [currentPage, setCurrentPage] = useState(0);
  const [config, setConfig] = useState(album.config);
  const [isSaved, setIsSaved] = useState(true);
  const [galleryView, setGalleryView] = useState<'hidden' | 'cols-2' | 'cols-3'>('cols-2');
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const [filterMultiple, setFilterMultiple] = useState(false);
  const [filterUsed, setFilterUsed] = useState(false);
  const [filterWide, setFilterWide] = useState(false);
  const [filterAll, setFilterAll] = useState(true);

  // Calculate justified layout
  const justifiedGalleryLayout = useMemo(() => {
    // Container width based on gallery view
    const containerWidth = galleryView === 'cols-2' ? 256 : 384; // w-64 = 256px, w-96 = 384px

    // Use actual aspect ratios from photos
    const aspectRatios = album.photos.map(photo => photo.aspectRatio || 1);

    // Calculate layout
    const geometry = justifiedLayout(aspectRatios, {
      containerWidth: containerWidth - 24, // Subtract padding
      containerPadding: 0,
      boxSpacing: 6, // gap-1.5 = 6px
      targetRowHeight: 120,
      targetRowHeightTolerance: 0.25,
    });

    return geometry;
  }, [album.photos, galleryView]);

  const handleConfigChange = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    setIsSaved(false);
  };

  const handleSave = () => {
    // TODO: Save album
    setIsSaved(true);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header 
        className="border-b sticky top-0 z-30"
        style={{ 
          background: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)'
        }}
      >
        <div className="px-6 py-3 flex items-center justify-between">
          {/* Left: Back button and title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/albums')}
              className="p-1.5 rounded-lg transition-all hover:scale-105"
              style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)'
              }}
            >
              <ArrowLeft className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
            </button>

            <div>
              <h1 className="text-base font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
                {album.title}
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider"
                  style={{
                    background: isSaved ? 'rgba(34, 197, 94, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                    color: isSaved ? 'rgb(34, 197, 94)' : 'rgb(251, 191, 36)',
                    border: `1px solid ${isSaved ? 'rgba(34, 197, 94, 0.3)' : 'rgba(251, 191, 36, 0.3)'}`
                  }}
                >
                  {isSaved ? 'Saved' : 'Editing'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Action buttons */}
          <div className="flex items-center gap-2">
            <button className="btn-elegant !text-[10px] !px-2.5 !py-1 flex items-center gap-1">
              <Eye className="w-3 h-3" />
              Deck View
            </button>

            <button className="btn-elegant !text-[10px] !px-2.5 !py-1 flex items-center gap-1">
              <Layout className="w-3 h-3" />
              Custom Layout
            </button>

            <button className="btn-elegant !text-[10px] !px-2.5 !py-1 flex items-center gap-1">
              <Download className="w-3 h-3" />
              Export Images
            </button>

            <button className="btn-elegant !text-[10px] !px-2.5 !py-1 flex items-center gap-1">
              <Download className="w-3 h-3" />
              Export to PDF
            </button>

            <button
              onClick={handleSave}
              className="btn-elegant-primary !text-[10px] !px-2.5 !py-1 flex items-center gap-1"
            >
              <Save className="w-3 h-3" />
              Save
            </button>

            <button className="btn-elegant-primary !text-[10px] !px-2.5 !py-1 flex items-center gap-1">
              <Share2 className="w-3 h-3" />
              Share
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Album Config */}
        <div
          className="w-56 border-r overflow-y-auto"
          style={{
            background: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)'
          }}
        >
          <div className="p-4 space-y-4">
            <h2 className="text-base font-display font-semibold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
              Album Config
            </h2>

            {/* Size */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                Size (cm)
              </label>
              <select
                value={config.size}
                onChange={(e) => handleConfigChange('size', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg text-xs"
                style={{
                  background: 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <option value="20 x 20">20 x 20</option>
                <option value="30 x 30">30 x 30</option>
                <option value="40 x 40">40 x 40</option>
              </select>
            </div>

            {/* Photo Gap */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Photo Gap
                </label>
                <span className="text-xs font-mono" style={{ color: 'var(--text-primary)' }}>
                  {config.photoGap}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={config.photoGap}
                onChange={(e) => handleConfigChange('photoGap', parseInt(e.target.value))}
                className="w-full slider-elegant"
              />
            </div>

            {/* Page Margin */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Page Margin
                </label>
                <span className="text-xs font-mono" style={{ color: 'var(--text-primary)' }}>
                  {config.pageMargin}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={config.pageMargin}
                onChange={(e) => handleConfigChange('pageMargin', parseInt(e.target.value))}
                className="w-full slider-elegant"
              />
            </div>

            {/* Corner Radius */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Corner Radius
                </label>
                <span className="text-xs font-mono" style={{ color: 'var(--text-primary)' }}>
                  {config.cornerRadius}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={config.cornerRadius}
                onChange={(e) => handleConfigChange('cornerRadius', parseInt(e.target.value))}
                className="w-full slider-elegant"
              />
            </div>

            {/* Background Color */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                Background Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={config.backgroundColor}
                  onChange={(e) => handleConfigChange('backgroundColor', e.target.value)}
                  className="w-9 h-8 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={config.backgroundColor}
                  onChange={(e) => handleConfigChange('backgroundColor', e.target.value)}
                  className="flex-1 px-2.5 py-1.5 rounded-lg text-xs font-mono"
                  style={{
                    background: 'var(--bg-input)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)'
                  }}
                />
              </div>
            </div>

            {/* Background Image */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                Background Image
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <button
                    key={i}
                    className="aspect-square rounded-md overflow-hidden border transition-all hover:scale-105"
                    style={{
                      borderColor: config.backgroundImage === i ? 'var(--accent-primary)' : 'var(--border-color)',
                      borderWidth: config.backgroundImage === i ? '2px' : '1px'
                    }}
                    onClick={() => handleConfigChange('backgroundImage', i)}
                  >
                    <img
                      src={`https://picsum.photos/100/100?random=${100 + i}`}
                      alt={`Background ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Generate with AI */}
            <button
              className="w-full px-3 py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none'
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Generate with AI
            </button>
          </div>
        </div>

        {/* Center - Canvas/Page Viewer */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Canvas Toolbar */}
          <div
            className="border-b px-6 py-2 flex items-center justify-between gap-2"
            style={{
              background: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)'
            }}
          >
            <div className="flex items-center gap-2">
              <button
                className="p-1.5 rounded-lg transition-all hover:scale-105"
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)'
                }}
                title="Layout"
              >
                <Layout className="w-3.5 h-3.5" style={{ color: 'var(--text-primary)' }} />
              </button>

              <button
                className="p-1.5 rounded-lg transition-all hover:scale-105"
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)'
                }}
                title="Rotate"
              >
                <RotateCw className="w-3.5 h-3.5" style={{ color: 'var(--text-primary)' }} />
              </button>

              <button
                className="p-1.5 rounded-lg transition-all hover:scale-105"
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)'
                }}
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" style={{ color: 'var(--text-primary)' }} />
              </button>
            </div>

            {/* Gallery view controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setGalleryView(galleryView === 'cols-2' ? 'cols-3' : 'cols-2')}
                className="px-2 py-1 rounded text-[10px] transition-all hover:scale-105"
                style={{
                  background: 'var(--bg-input)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-color)'
                }}
                title="Toggle Gallery Width"
              >
                {galleryView === 'cols-2' ? '2 cols' : '3 cols'}
              </button>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 overflow-auto p-6 flex items-center justify-center">
            <div
              className="elegant-card rounded-xl p-6 shadow-xl"
              style={{
                width: '600px',
                height: '450px',
                background: config.backgroundColor
              }}
            >
              {/* Page content placeholder */}
              <div className="w-full h-full flex items-center justify-center border border-dashed rounded-lg"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Drag photos here or click to add
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Page Navigation */}
          <div
            className="border-t px-6 py-2.5 flex items-center justify-center gap-2"
            style={{
              background: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)'
            }}
          >
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="p-1.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)'
              }}
            >
              <span className="text-xs" style={{ color: 'var(--text-primary)' }}>←</span>
            </button>

            <div className="flex items-center gap-1.5">
              {album.pages.map((page, index) => (
                <button
                  key={page.id}
                  onClick={() => setCurrentPage(index)}
                  className="px-2.5 py-1 rounded-lg text-xs transition-all hover:scale-105"
                  style={{
                    background: currentPage === index ? 'var(--accent-primary)' : 'var(--bg-input)',
                    color: currentPage === index ? 'white' : 'var(--text-primary)',
                    border: currentPage === index ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)'
                  }}
                >
                  {page.type === 'cover' ? 'Cover' : index}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(album.pages.length - 1, currentPage + 1))}
              disabled={currentPage === album.pages.length - 1}
              className="p-1.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)'
              }}
            >
              <span className="text-xs" style={{ color: 'var(--text-primary)' }}>→</span>
            </button>
          </div>
        </div>

        {/* Right Sidebar - Photo Gallery */}
        {galleryView !== 'hidden' ? (
          <div
            className={`border-l transition-all duration-300 flex flex-col ${
              galleryView === 'cols-2' ? 'w-64' : 'w-96'
            }`}
            style={{
              background: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)'
            }}
          >
            <div className="p-3 space-y-2 flex-shrink-0">
              {/* Header with controls */}
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-display font-semibold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
                  Photo Gallery
                </h2>

                {/* Gallery view toggle */}
                <button
                  onClick={() => setGalleryView('hidden')}
                  className="p-1 rounded transition-all hover:scale-105"
                  style={{
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)'
                  }}
                  title="Hide Gallery"
                >
                  <ChevronRight className="w-3 h-3" style={{ color: 'var(--text-primary)' }} />
                </button>
              </div>

              {/* Toolbar */}
              <div className="flex items-center gap-1 pb-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
                {/* Left side controls */}
                <div className="flex items-center gap-1">
                  <button
                    className="p-1 rounded transition-all hover:scale-105"
                    style={{
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-color)'
                    }}
                    title="Settings"
                  >
                    <Settings className="w-3 h-3" style={{ color: 'var(--text-primary)' }} />
                  </button>

                  <button
                    className="p-1 rounded transition-all hover:scale-105"
                    style={{
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-color)'
                    }}
                    title="Add Photos"
                  >
                    <ImagePlus className="w-3 h-3" style={{ color: 'var(--text-primary)' }} />
                  </button>

                  <button
                    className="p-1 rounded transition-all hover:scale-105"
                    style={{
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-color)'
                    }}
                    title="Upload"
                  >
                    <Upload className="w-3 h-3" style={{ color: 'var(--text-primary)' }} />
                  </button>

                  <button
                    className="p-1 rounded transition-all hover:scale-105"
                    style={{
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-color)'
                    }}
                    title="Shuffle"
                  >
                    <Shuffle className="w-3 h-3" style={{ color: 'var(--text-primary)' }} />
                  </button>

                  <button
                    className="p-1 rounded transition-all hover:scale-105"
                    style={{
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-color)'
                    }}
                    title="Reset"
                  >
                    <RotateCcw className="w-3 h-3" style={{ color: 'var(--text-primary)' }} />
                  </button>

                  <button
                    className="p-1 rounded transition-all hover:scale-105"
                    style={{
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-color)'
                    }}
                    title="Sort"
                  >
                    <ArrowUpDown className="w-3 h-3" style={{ color: 'var(--text-primary)' }} />
                  </button>
                </div>

                {/* Right side - Delete button */}
                <div className="ml-auto">
                  <button
                    className="px-2 py-1 rounded text-[10px] transition-all hover:scale-105 flex items-center gap-1"
                    style={{
                      background: 'rgb(239, 68, 68)',
                      color: 'white',
                      border: '1px solid rgb(239, 68, 68)'
                    }}
                    title="Delete Selected"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete ({selectedPhotos.length})
                  </button>
                </div>
              </div>

              {/* Filter checkboxes */}
              <div className="flex items-center gap-3 text-[10px]">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterMultiple}
                    onChange={(e) => setFilterMultiple(e.target.checked)}
                    className="w-3 h-3 rounded"
                    style={{ accentColor: 'var(--accent-primary)' }}
                  />
                  <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Multiple Selection</span>
                </label>

                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterUsed}
                    onChange={(e) => setFilterUsed(e.target.checked)}
                    className="w-3 h-3 rounded"
                    style={{ accentColor: 'var(--accent-primary)' }}
                  />
                  <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Hide Used</span>
                </label>

                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterWide}
                    onChange={(e) => setFilterWide(e.target.checked)}
                    className="w-3 h-3 rounded"
                    style={{ accentColor: 'var(--accent-primary)' }}
                  />
                  <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Wide Image</span>
                </label>

                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterAll}
                    onChange={(e) => setFilterAll(e.target.checked)}
                    className="w-3 h-3 rounded"
                    style={{ accentColor: 'var(--accent-primary)' }}
                  />
                  <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>All</span>
                </label>
              </div>
            </div>

            {/* Scrollable Photos Area */}
            <div className="flex-1 overflow-y-auto px-3">
              {/* Stats */}
              <div className="text-center text-[10px] py-1" style={{ color: 'var(--text-muted)' }}>
                {album.photos.length} photos total • {album.photos.filter(p => p.used).length} used • {album.photos.length - album.photos.filter(p => p.used).length} empty
              </div>

              {/* Photo Grid - Justified Layout */}
              <div
                className="relative pb-2"
                style={{
                  height: `${justifiedGalleryLayout.containerHeight}px`,
                }}
              >
                {album.photos.map((photo, index) => {
                  const box = justifiedGalleryLayout.boxes[index];
                  return (
                    <div
                      key={photo.id}
                      className="absolute group rounded overflow-hidden cursor-move"
                      draggable
                      onClick={() => {
                        if (selectedPhotos.includes(photo.id)) {
                          setSelectedPhotos(selectedPhotos.filter(id => id !== photo.id));
                        } else {
                          setSelectedPhotos([...selectedPhotos, photo.id]);
                        }
                      }}
                      style={{
                        top: `${box.top}px`,
                        left: `${box.left}px`,
                        width: `${box.width}px`,
                        height: `${box.height}px`,
                        animation: `fadeInUp 0.3s ease-out ${index * 0.01}s both`,
                        border: selectedPhotos.includes(photo.id)
                          ? '2px solid var(--accent-primary)'
                          : '1px solid var(--border-color)'
                      }}
                    >
                      <img
                        src={photo.url}
                        alt={`Photo ${photo.id}`}
                        className="w-full h-full object-cover transition-all duration-200 group-hover:scale-105"
                      />

                    {/* Photo number badge */}
                    <div
                      className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[10px] font-bold"
                      style={{
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white'
                      }}
                    >
                      #{photo.id}
                    </div>

                    {/* Selection checkbox */}
                    <div
                      className="absolute top-1 right-1 w-4 h-4 rounded border-2 flex items-center justify-center transition-all"
                      style={{
                        background: selectedPhotos.includes(photo.id) ? 'var(--accent-primary)' : 'rgba(0, 0, 0, 0.5)',
                        borderColor: selectedPhotos.includes(photo.id) ? 'var(--accent-primary)' : 'white'
                      }}
                    >
                      {selectedPhotos.includes(photo.id) && (
                        <span className="text-white text-[10px] font-bold">✓</span>
                      )}
                    </div>

                    {/* Used indicator - green checkmark */}
                    {photo.used && (
                      <div
                        className="absolute bottom-1 right-1 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{
                          background: 'rgb(34, 197, 94)',
                          border: '1.5px solid white'
                        }}
                      >
                        <span className="text-white text-[10px] font-bold">✓</span>
                      </div>
                    )}

                      {/* Edit icon on hover */}
                      <div className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // TODO: Edit photo
                          }}
                          className="p-1 rounded"
                          style={{ background: 'rgba(0, 0, 0, 0.7)' }}
                        >
                          <Settings className="w-2.5 h-2.5" style={{ color: 'white' }} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom actions - Fixed Footer */}
            <div className="p-3 flex-shrink-0 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex gap-2">
                <button className="flex-1 btn-elegant !text-[10px] !px-2 !py-1 flex items-center justify-center gap-1">
                  <RotateCcw className="w-3 h-3" />
                  Clear Gallery
                </button>
                <button className="flex-1 btn-elegant !text-[10px] !px-2 !py-1 flex items-center justify-center gap-1">
                  <RotateCcw className="w-3 h-3" />
                  Reset Album
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="w-8 border-l flex items-start justify-center pt-4"
            style={{
              background: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)'
            }}
          >
            <button
              onClick={() => setGalleryView('cols-2')}
              className="p-1.5 rounded transition-all hover:scale-105"
              style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)'
              }}
              title="Show Gallery"
            >
              <ChevronLeft className="w-3.5 h-3.5" style={{ color: 'var(--text-primary)' }} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumEditor;

