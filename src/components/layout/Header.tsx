
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Menu,
  X,
  Globe,
  ChevronDown,
  User,
  LogOut,
  FileText,
  Search,
  BarChart,
} from 'lucide-react';

const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'ta', name: 'தமிழ்' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-india-saffron rounded-full flex items-center justify-center">
                <span className="text-white font-bold">NS</span>
              </div>
              <span className="font-bold text-xl text-india-blue hidden md:block">
                {t('hero_title')}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-india-saffron px-3 py-2 rounded-md text-sm font-medium">
              {t('home')}
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/grievances/new" className="text-gray-700 hover:text-india-saffron px-3 py-2 rounded-md text-sm font-medium">
                  {t('file_grievance')}
                </Link>
                <Link to="/grievances/track" className="text-gray-700 hover:text-india-saffron px-3 py-2 rounded-md text-sm font-medium">
                  {t('track_grievance')}
                </Link>
                <Link to="/dashboard" className="text-gray-700 hover:text-india-saffron px-3 py-2 rounded-md text-sm font-medium">
                  {t('dashboard')}
                </Link>
              </>
            ) : (
              <Link to="/about" className="text-gray-700 hover:text-india-saffron px-3 py-2 rounded-md text-sm font-medium">
                {t('about')}
              </Link>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span className="capitalize">{language}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as Language)}
                    className={language === lang.code ? "bg-muted" : ""}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{user?.name || 'User'}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/grievances/new')}>
                    <FileText className="h-4 w-4 mr-2" />
                    {t('file_grievance')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/grievances/track')}>
                    <Search className="h-4 w-4 mr-2" />
                    {t('track_grievance')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <BarChart className="h-4 w-4 mr-2" />
                    {t('dashboard')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="ml-2">
                    {t('login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="ml-2" size="sm">
                    {t('register')}
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="mr-2">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as Language)}
                    className={language === lang.code ? "bg-muted" : ""}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-india-saffron focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-india-saffron"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('home')}
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/grievances/new"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-india-saffron"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('file_grievance')}
                </Link>
                <Link
                  to="/grievances/track"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-india-saffron"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('track_grievance')}
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-india-saffron"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('dashboard')}
                </Link>
                <div className="border-t border-gray-200 my-2 py-2">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2 inline-block" />
                    {t('logout')}
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/about"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-india-saffron"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('about')}
                </Link>
                <div className="flex flex-col space-y-2 mt-3 px-3">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      {t('login')}
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">
                      {t('register')}
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Indian flag stripe */}
      <div className="h-1 w-full india-gradient"></div>
    </header>
  );
};

export default Header;
