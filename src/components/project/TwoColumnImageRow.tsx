import { useLanguage } from '../../contexts/LanguageContext';
import { LocalizedString } from '../../data/projects';

interface ImageItem {
  src: string;
  alt: string;
  caption?: string | LocalizedString;
}

interface TwoColumnImageRowProps {
  leftImage: ImageItem;
  rightImage: ImageItem;
}

export default function TwoColumnImageRow({ leftImage, rightImage }: TwoColumnImageRowProps) {
  const { language } = useLanguage();
  
  const getLocalized = (val: string | LocalizedString) => {
    if (typeof val === 'string') return val;
    return val[language] || val.en;
  };

  return (
    <div className="max-w-[1400px] mx-auto px-12 md:px-16 my-10 md:my-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div>
          <div className="w-full aspect-[4/3] overflow-hidden bg-bg-secondary">
            <img src={leftImage.src} alt={leftImage.alt} className="w-full h-full object-contain" />
          </div>
          {leftImage.caption && (
            <p className="mt-3 text-[12px] text-text-muted">{getLocalized(leftImage.caption)}</p>
          )}
        </div>
        <div>
          <div className="w-full aspect-[4/3] overflow-hidden bg-bg-secondary">
            <img src={rightImage.src} alt={rightImage.alt} className="w-full h-full object-contain" />
          </div>
          {rightImage.caption && (
            <p className="mt-3 text-[12px] text-text-muted">{getLocalized(rightImage.caption)}</p>
          )}
        </div>
      </div>
    </div>
  );
}
