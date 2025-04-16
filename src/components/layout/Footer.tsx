
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-india-saffron rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">NS</span>
              </div>
              <span className="font-bold text-xl text-india-blue">
                {t('hero_title')}
              </span>
            </Link>
            <p className="text-gray-600 text-sm">
              A platform for citizens to raise complaints that are auto-categorized and routed using NLP technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-india-saffron">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-india-saffron">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-india-saffron">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">{t('about')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-india-saffron text-sm">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-600 hover:text-india-saffron text-sm">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-india-saffron text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-600 hover:text-india-saffron text-sm">
                  News & Updates
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">{t('faq')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-india-saffron text-sm">
                  {t('faq')}
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-600 hover:text-india-saffron text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-india-saffron text-sm">
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-india-saffron text-sm">
                  {t('privacy')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">{t('contact_us')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-india-saffron flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">support@nyaysathi.gov.in</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-india-saffron flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">1800-XXX-XXXX (Toll Free)</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-india-saffron flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">
                  Department of Administrative Reforms & Public Grievances, New Delhi, India
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} {t('hero_title')}. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <img 
                src="https://www.mygov.in/sites/all/themes/mygov/images/footer-swach-bharat-new.png" 
                alt="Government of India" 
                className="h-12"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Indian flag stripe */}
      <div className="h-1 w-full india-gradient mt-6"></div>
    </footer>
  );
};

export default Footer;
