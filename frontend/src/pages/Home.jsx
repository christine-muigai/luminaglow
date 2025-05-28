import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{t('welcome')}</h2>
      <div className="mt-4 space-x-2">
        <button onClick={() => i18n.changeLanguage('en')} className="bg-gray-200 px-4 py-1 rounded">English</button>
        <button onClick={() => i18n.changeLanguage('ar')} className="bg-gray-200 px-4 py-1 rounded">Arabic</button>
        <button onClick={() => i18n.changeLanguage('fr')} className="bg-gray-200 px-4 py-1 rounded">Français</button>
        <button onClick={() => i18n.changeLanguage('es')} className="bg-gray-200 px-4 py-1 rounded">Español</button>
        <button onClick={() => i18n.changeLanguage('sw')} className="bg-gray-200 px-4 py-1 rounded">Kiswahili</button>
        <button onClick={() => i18n.changeLanguage('zh')} className="bg-gray-200 px-4 py-1 rounded">中文</button>
      </div>
    </div>
  );
};

export default Home;
