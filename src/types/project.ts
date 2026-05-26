import { LocalizedString } from '../data/projects';

export interface TechnicalDetail {
  label: string;
  value: string;
}

export interface NarrativeChapter {
  title: string | LocalizedString;
  paragraphs: (string | LocalizedString)[];
}

export interface EditorialImage {
  src: string;
  alt: string;
  caption?: string | LocalizedString;
  layout: 'full' | 'two-column' | 'detail-left' | 'detail-right';
}

export interface Drawing {
  src: string;
  title: string | LocalizedString;
  type: string | LocalizedString;
  scale?: string;
  revision?: string;
  date?: string;
}

export interface CreditItem {
  label: string | LocalizedString;
  value: string | LocalizedString;
}

export interface RelatedProject {
  id: string;
  title: string | LocalizedString;
  category: string;
  year: string;
  location: string;
  image: string;
}

export interface ProjectExtended {
  id: string;
  title: string | LocalizedString;
  subtitle: string | LocalizedString;
  year: string;
  category: string;
  location: string;
  status: string;
  heroImage: string;
  heroCaption?: string | LocalizedString;
  introductionParagraphs: (string | LocalizedString)[];
  technicalDetails: TechnicalDetail[];
  narrativeChapters: NarrativeChapter[];
  photography: EditorialImage[];
  drawings: Drawing[];
  credits: CreditItem[];
  relatedProjects: RelatedProject[];
}
