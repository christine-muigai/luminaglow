import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../authentication/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-y-4">
        {/* Brand */}
        <Link to="/" className="text-3xl font-extrabold text-blue-600">
          Luminaglow
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600 transition">{t('products')}</Link>
          <Link to="/cart" className="hover:text-blue-600 transition">{t('cart')}</Link>
          <Link to="/home" className="hover:text-blue-600 transition">{t('home')}</Link>
          <Link to="/checkout" className="hover:text-blue-600 transition">Payment</Link>
        </div>

        {/* Right Section: Language & Auth */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Language Buttons */}
          <div className="flex gap-1 flex-wrap">
            {['en', 'fr', 'ar', 'sw', 'es', 'zh'].map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className="px-2 py-1 border rounded-full text-xs font-medium hover:bg-gray-100 transition"
              >
                {lang === 'zh' ? '中' : lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          {!loading && !user ? (
            <div className="flex gap-3">
              <Link to="/login" className="px-4 py-1.5 text-sm font-semibold text-gray-700 hover:text-blue-600 transition">
                {t('login')}
              </Link>
              <Link to="/register" className="px-4 py-1.5 text-sm font-semibold text-gray-700 hover:text-blue-600 transition">
                {t('register')}
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 text-sm font-semibold transition"
            >
              {t('logout')}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}







