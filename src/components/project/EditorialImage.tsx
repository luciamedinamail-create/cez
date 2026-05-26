import { useLanguage } from '../../contexts/LanguageContext';
import { LocalizedString } from '../../data/projects';

interface EditorialImageProps {
  src: string;
  alt: string;
  caption?: string | LocalizedString;
  marginTop?: boolean;
}

export default function EditorialImage({ src, alt, caption, marginTop = true }: EditorialImageProps) {
  const { language } = useLanguage();
  
  const getLocalized = (val: string | LocalizedString) => {
    if (typeof val === 'string') return val;
    return val[language] || val.en;
  };

  return (
    <div className={`max-w-[1400px] mx-auto px-12 md:px-16 ${marginTop ? 'mt-24 md:mt-32' : ''} mb-12`}>
      <div className="w-full aspect-video lg:aspect-[16/10] overflow-hidden bg-bg-secondary">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-contain"
        />
      </div>
      {caption && (
        <div className="mt-4 max-w-[680px]">
          <p className="text-[13px] leading-[1.4] text-text-primary text-left">
            {getLocalized(caption)}
          </p>
        </div>
      )}
    </div>
  );
}
