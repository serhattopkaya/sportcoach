import { useTranslation } from 'react-i18next';

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggle = () => {
    const newLang = currentLang === 'en' ? 'de' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('sportcoach-lang', newLang);
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors min-h-[44px]"
    >
      <span className="text-base">{currentLang === 'en' ? '🇬🇧' : '🇩🇪'}</span>
      <span>{currentLang.toUpperCase()}</span>
    </button>
  );
}
