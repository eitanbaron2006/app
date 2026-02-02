import { useState, useRef, useEffect } from 'react';
import { Plus, Search, Grid, List, Calendar, Image, Edit, Trash2, MoreVertical, User, LogOut, Settings, Sun, Moon, Shield, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

// Mock data for albums
const mockAlbums = [
  {
    id: 1,
    title: 'Summer Vacation 2024',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    photoCount: 156,
    totalSlots: 200,
    pagesCount: 25,
    createdDate: '2024-08-15',
    lastModified: '2024-08-20',
  },
  {
    id: 2,
    title: 'Wedding Memories',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
    photoCount: 342,
    totalSlots: 400,
    pagesCount: 50,
    createdDate: '2024-06-10',
    lastModified: '2024-06-15',
  },
  {
    id: 3,
    title: 'Family Reunion',
    coverImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop',
    photoCount: 89,
    totalSlots: 120,
    pagesCount: 15,
    createdDate: '2024-07-22',
    lastModified: '2024-07-25',
  },
  {
    id: 4,
    title: 'City Adventures',
    coverImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop',
    photoCount: 234,
    totalSlots: 300,
    pagesCount: 38,
    createdDate: '2024-05-05',
    lastModified: '2024-05-12',
  },
  {
    id: 5,
    title: 'Nature Photography',
    coverImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    photoCount: 178,
    totalSlots: 200,
    pagesCount: 25,
    createdDate: '2024-04-18',
    lastModified: '2024-04-20',
  },
  {
    id: 6,
    title: 'Birthday Party',
    coverImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
    photoCount: 67,
    totalSlots: 80,
    pagesCount: 10,
    createdDate: '2024-03-12',
    lastModified: '2024-03-12',
  },
];

const MyAlbums = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [albums] = useState(mockAlbums);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const isAdmin = true; // TODO: Get from user context

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredAlbums = albums.filter(album =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen concrete-bg vignette" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="sticky top-0 z-30 nav-glass">
        <div className="w-full px-8 lg:px-16 xl:px-24 py-6">
          {/* Top Row: Title and Action Buttons */}
          <div className="flex items-center justify-between mb-6">
            {/* Left: Title */}
            <div>
              <h1 className="text-3xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
                Your Albums
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Welcome back, eitan2007@gmail.com
              </p>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Settings Button (For All Users) */}
              <button
                onClick={() => {/* TODO: Navigate to settings */}}
                className="theme-toggle"
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Admin Settings (Only for Admin) */}
              {isAdmin && (
                <button
                  onClick={() => {/* TODO: Navigate to admin settings */}}
                  className="theme-toggle"
                  title="Admin Settings"
                  style={{ borderColor: 'var(--border-hover)' }}
                >
                  <Shield className="w-4 h-4" />
                </button>
              )}

              {/* Divider */}
              <div className="h-8 w-px" style={{ background: 'var(--border-color)' }}></div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-opacity-80"
                  style={{ background: 'var(--bg-input)', color: 'var(--text-primary)' }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--bg-card)' }}>
                    <User className="w-4 h-4" />
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-xs font-medium">Eitan Baron</div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>eitan2007@gmail.com</div>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg overflow-hidden elegant-card z-50"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                  >
                    <div className="p-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                      <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Eitan Baron</div>
                      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>eitan2007@gmail.com</div>
                    </div>
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          // TODO: Navigate to profile
                        }}
                        className="w-full px-4 py-2 text-left text-sm flex items-center gap-3 transition-colors hover:bg-opacity-50"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-input)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          // TODO: Navigate to settings
                        }}
                        className="w-full px-4 py-2 text-left text-sm flex items-center gap-3 transition-colors hover:bg-opacity-50"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-input)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                    </div>
                    <div className="border-t" style={{ borderColor: 'var(--border-color)' }}>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          navigate('/');
                        }}
                        className="w-full px-4 py-2 text-left text-sm flex items-center gap-3 transition-colors hover:bg-opacity-50"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-input)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Row: Search, View Toggle, and Create Button */}
          <div className="flex items-center gap-3">
            {/* Search - Left Side (50% width) */}
            <div className="relative" style={{ width: '50%' }}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search albums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input text-sm !pl-10 w-full"
              />
            </div>

            {/* View Mode Toggle - Right of Search */}
            <div className="flex gap-1 p-1 rounded-lg" style={{ background: 'var(--bg-input)' }}>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid' ? 'shadow-sm' : ''
                }`}
                style={{
                  background: viewMode === 'grid' ? 'var(--bg-card)' : 'transparent',
                  color: viewMode === 'grid' ? 'var(--text-primary)' : 'var(--text-muted)'
                }}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list' ? 'shadow-sm' : ''
                }`}
                style={{
                  background: viewMode === 'list' ? 'var(--bg-card)' : 'transparent',
                  color: viewMode === 'list' ? 'var(--text-primary)' : 'var(--text-muted)'
                }}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Spacer to push Create button to the right */}
            <div className="flex-1"></div>

            {/* Create New Album Button - Far Right */}
            <button
              onClick={() => {/* TODO: Create new album */}}
              className="btn-elegant-primary text-sm flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Create New Album
            </button>
          </div>
        </div>
      </div>

      {/* Albums Grid/List */}
      <div className="w-full px-8 lg:px-16 xl:px-24 py-12">
        {filteredAlbums.length === 0 ? (
          <div className="text-center py-20">
            <Image className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
            <h3 className="text-xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
              No albums found
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              {searchQuery ? 'Try a different search term' : 'Create your first album to get started'}
            </p>
            {!searchQuery && (
              <button className="btn-elegant-primary text-sm flex items-center gap-2 mx-auto">
                <Plus className="w-4 h-4" />
                Create Album
              </button>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlbums.map((album) => (
              <div
                key={album.id}
                className="elegant-card rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => navigate(`/album/${album.id}`)}
              >
                {/* Album Cover */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Show menu
                      }}
                      className="p-2 rounded-lg backdrop-blur-md"
                      style={{ background: 'rgba(0, 0, 0, 0.5)' }}
                    >
                      <MoreVertical className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Album Info */}
                <div className="p-5">
                  <h3 className="text-lg font-display mb-2 truncate" style={{ color: 'var(--text-primary)' }}>
                    {album.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <div className="flex items-center gap-1">
                      <Image className="w-3 h-3" />
                      <span>{album.photoCount} photos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      <span>{album.pagesCount} pages</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>•</span>
                      <span>{album.totalSlots - album.photoCount} empty slots</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(album.lastModified)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/album/${album.id}/edit`);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs transition-colors hover:bg-opacity-80"
                      style={{ background: 'var(--bg-input)', color: 'var(--text-secondary)' }}
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Delete album
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs transition-colors hover:bg-opacity-80"
                      style={{ background: 'var(--bg-input)', color: 'var(--text-secondary)' }}
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAlbums.map((album) => (
              <div
                key={album.id}
                className="elegant-card rounded-xl p-4 flex items-center gap-4 group cursor-pointer hover:bg-opacity-80 transition-all"
                onClick={() => navigate(`/album/${album.id}`)}
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-display mb-1 truncate" style={{ color: 'var(--text-primary)' }}>
                    {album.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <div className="flex items-center gap-1">
                      <Image className="w-3 h-3" />
                      <span>{album.photoCount} photos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      <span>{album.pagesCount} pages</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>•</span>
                      <span>{album.totalSlots - album.photoCount} empty</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Modified {formatDate(album.lastModified)}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/album/${album.id}/edit`);
                    }}
                    className="p-2 rounded-lg transition-colors"
                    style={{ background: 'var(--bg-input)', color: 'var(--text-secondary)' }}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Delete album
                    }}
                    className="p-2 rounded-lg transition-colors"
                    style={{ background: 'var(--bg-input)', color: 'var(--text-secondary)' }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAlbums;

