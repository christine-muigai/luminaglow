import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../authentication/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import PaymentForm from '../components/Payment/PaymentForm';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [showPayment, setShowPayment] = useState(false);

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
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex flex-wrap justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 mb-2 sm:mb-0">
          Luminaglow
        </Link>

        {/* NAV LINKS */}
        <div className="flex flex-wrap items-center space-x-6 mt-2 sm:mt-0">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            {t('products')}
          </Link>
          <Link to="/cart" className="text-gray-700 hover:text-blue-600">
            {t('cart')}
          </Link>
          <Link to="/home" className="text-gray-700 hover:text-blue-600">
            {t('home')}
          </Link>

          {!loading && !user ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                {t('login')}
              </Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-600">
                {t('register')}
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              {t('logout')}
            </button>
          )}

          <button
            onClick={() => setShowPayment(true)}
            className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
          >
            Payment
          </button>
        </div>
      </div>

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setShowPayment(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>

            <PaymentForm />

            <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
              {['en', 'fr', 'ar', 'sw', 'es', 'zh'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  {lang.toUpperCase() === 'ZH' ? '中' : lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}




