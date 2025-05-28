import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
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
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Luminaglow
        </Link>

        <div className="flex space-x-4 items-center">
          <Link to="/" className="px-3 py-2 text-gray-700 hover:text-blue-600">
            {t('products')}
          </Link>
          <Link to="/cart" className="px-3 py-2 text-gray-700 hover:text-blue-600">
            {t('cart')}
          </Link>
          <Link to="/home" className="px-3 py-2 text-gray-700 hover:text-blue-600">
            {t('home')}
          </Link>

          {!loading && !user ? (
            <>
              <Link to="/login" className="px-3 py-2 text-gray-700 hover:text-blue-600">
                {t('login')}
              </Link>
              <Link to="/register" className="px-3 py-2 text-gray-700 hover:text-blue-600">
                {t('register')}
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-3 py-2 text-white bg-red-500 hover:bg-red-600 rounded"
            >
              {t('logout')}
            </button>
          )}

          {/* 🌐 Language Switch Buttons */}
          <div className="ml-4 space-x-1 text-sm">
            <button onClick={() => handleLanguageChange('en')} className="px-2 py-1 border rounded">EN</button>
            <button onClick={() => handleLanguageChange('fr')} className="px-2 py-1 border rounded">FR</button>
            <button onClick={() => handleLanguageChange('ar')} className="px-2 py-1 border rounded">AR</button>
            <button onClick={() => handleLanguageChange('sw')} className="px-2 py-1 border rounded">SW</button>
            <button onClick={() => handleLanguageChange('es')} className="px-2 py-1 border rounded">ES</button>
            <button onClick={() => handleLanguageChange('zh')} className="px-2 py-1 border rounded">中</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

