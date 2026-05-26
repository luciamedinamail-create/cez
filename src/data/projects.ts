export interface LocalizedString {
  it: string;
  de: string;
  en: string;
}

export interface Project {
  id: string;
  title: string | LocalizedString;
  category: 'Residential' | 'Landscape' | 'Schools' | 'Public / Civic' | 'Competitions';
  year: string;
  location: string;
  description: string | LocalizedString;
  concept: string | LocalizedString;
  heroImage: string;
  images: string[];
  plans?: string[];
  sections?: string[];
  facts: { [key: string]: string };
  credits: { [key: string]: string };
  narrativeChapters?: any[];
}

export const PROJECTS: Project[] = [
  {
    id: 'scuola_bolzano',
    title: {
      it: 'INTERVENTI',
      de: 'EINGRIFFE',
      en: 'INTERVENTIONS'
    },
    category: 'Schools',
    year: '2024',
    location: 'Bolzano, Italy',
    description: {
      it: 'Am Waldrand zwischen den Bäumen sitzend. Galleggiare su una zattera nella palude. Un arcobianco, una curva, un tunnel scendendo. Interventi di confine a Bolzano.',
      de: 'Am Waldrand zwischen den Bäumen sitzend. Galleggiare su una zattera nella palude. Un arcobianco, eine Kurve, ein Tunnel beim Abstieg. Grenzinterventionen in Bozen.',
      en: 'Sitting at the forest edge between trees. Floating on a raft in the marsh. A white arch, a curve, a tunnel descending. Boundary interventions in Bolzano.'
    },
    concept: {
      it: 'Una serie di interventi architettonici poetici ai confini di Bolzano, esplorando le transizioni tra natura, acqua e strutture sotterranee.',
      de: 'Eine Reihe poetischer architektonischer Interventionen an den Grenzen von Bozen, welche die Übergänge zwischen Natur, Wasser und unterirdischen Strukturen erforschen.',
      en: 'A series of poetic architectural interventions at the boundaries of Bolzano, exploring the transitions between nature, water, and subterranean structures.'
    },
    narrativeChapters: [
      {
        title: { it: 'Abitare il confine', de: 'Wohnen an der Grenze', en: 'Inhabiting the Border' },
        paragraphs: [
          { it: 'L\'architettura non è solo un oggetto, ma un filtro che media tra l\'uomo e l\'ambiente circostante.', de: 'Architektur ist nicht nur ein Objekt, sondern ein Filter, der zwischen Mensch und Umwelt vermittelt.', en: 'Architecture is not just an object, but a filter that mediates between humans and the surrounding environment.' }
        ]
      },
      {
        title: { it: 'Materiali e Luce', de: 'Materialien und Licht', en: 'Materials and Light' },
        paragraphs: [
          { it: 'L\'uso del cemento a vista e del legno locale crea un dialogo tattile con il paesaggio alpino.', de: 'Die Verwendung von Sichtbeton und lokalem Holz schafft einen haptischen Dialog mit der alpinen Landschaft.', en: 'The use of exposed concrete and local wood creates a tactile dialogue with the alpine landscape.' }
        ]
      }
    ],
    heroImage: '/src/assets/images/scuola1/scuolaphotography2.png',
    images: [
      '/src/assets/images/scuola1/scuolacolor1.png',
      '/src/assets/images/scuola1/scuolaphotography1.png',
      '/src/assets/images/scuola1/scuolaphotography3.png',
      '/src/assets/images/scuola1/scuolaphotography4.png',
      '/src/assets/images/scuola1/scuolaphotography5.png',
      '/src/assets/images/scuola1/scuolaphotography6.png'
    ],
    plans: [
      '/src/assets/images/scuola1/scuolaplane1.png',
      '/src/assets/images/scuola1/scuolaplane2.png',
      '/src/assets/images/scuola1/scuolaplane3.png',
      '/src/assets/images/scuola1/scuolaplane4.png',
      '/src/assets/images/scuola1/scuolaplane5.png',
      '/src/assets/images/scuola1/scuolaplane6.png',
      '/src/assets/images/scuola1/scuolaplane7.png'
    ],
    facts: {
      'Client': 'Educational Research Institute',
      'Location': 'Bolzano, Italy',
      'Year': '2024',
      'Status': 'Completed',
      'Program': 'Educational Interventions',
      'Surface': '1200 m²',
      'Collaborators': 'CEZ Studio Team',
      'Photography': 'CEZ Archive'
    },
    credits: {
      'Design': 'CEZ Studio',
      'Status': 'Academic / Research'
    }
  },
  {
    id: '01_Gemeinde_Brixen',
    title: 'Gemeinde Brixen',
    category: 'Public / Civic',
    year: '2024',
    location: 'Bressanone, Italy',
    description: 'Civic intervention and restoration of the municipal headquarters, creating a dialogue between historic substance and contemporary accessibility.',
    concept: 'Architecture as a mediator: the project inserts a new structural layer into the historic fabric of Brixen, facilitating modern administrative flows while preserving the monumental integrity of the seat.',
    heroImage: '/src/assets/images/DPerbellini_GemeindeBrixen_002.jpg',
    images: [
      '/src/assets/images/DPerbellini_GemeindeBrixen_017.jpg',
      '/src/assets/images/DPerbellini_GemeindeBrixen_028.jpg',
      '/src/assets/images/DPerbellini_GemeindeBrixen_029.jpg'
    ],
    facts: {
      'Client': 'Municipality of Brixen',
      'Area': '2.400 m2',
      'Status': 'Completed'
    },
    credits: {
      'Photography': 'D. Perbellini',
      'Lead Architect': 'CEZ Studio'
    }
  },
  {
    id: '02_Am_Muehlrain',
    title: 'Am Mühlrain',
    category: 'Residential',
    year: '2021',
    location: 'Siusi, Italy',
    description: 'A contemporary reinterpretation of the alpine vernacular, blending timber construction with the natural topography of the Dolomites.',
    concept: 'Topographic integration: the building emerges from the sloped landscape, utilizing local larch wood and stone to create a residence that feels inherently tied to its site.',
    heroImage: '/src/assets/images/POHL_Muhlrain_CAM02.jpg',
    images: [
      '/src/assets/images/POHL_Muhlrain_CAM03.jpg',
      '/src/assets/images/POHL_Muhlrain_CAM04.jpg'
    ],
    facts: {
      'Volume': '1.200 m3',
      'Structure': 'Timber / Concrete',
      'Altitude': '1.000 m'
    },
    credits: {
      'Lead': 'Elena E.',
      'Photography': 'Pohl'
    }
  },
  {
    id: '03_Sterzing',
    title: 'Sterzing',
    category: 'Public / Civic',
    year: '2020',
    location: 'Vipiteno, Italy',
    description: 'Revitalization of a historical courtyard, creating a new urban node that bridges different historical eras.',
    concept: 'The courtyard as a public stage. By removing layers of technical additions, we revealed the primary structural rhythm of the space.',
    heroImage: '/src/assets/images/SterzingAussen_002.jpg',
    images: [
      '/src/assets/images/SterzingAussen_013.jpg',
      '/src/assets/images/SterzingAussen_029.jpg',
      '/src/assets/images/SterzingHof_002.jpg',
      '/src/assets/images/SterzingNacht_003.jpg'
    ],
    facts: {
      'Site': 'Historical Center',
      'Prize': '1st Prize Competition'
    },
    credits: {
      'Lead': 'Marco C.',
      'Municipality': 'Sterzing (BZ)'
    }
  },
  {
    id: '04_Gummer',
    title: 'Gummer',
    category: 'Residential',
    year: '2023',
    location: 'San Valentino, Italy',
    description: 'Interior renovation of a high-altitude retreat, focused on materiality and the framing of alpine vistas.',
    concept: 'Focus on the horizon. The interior layout is organized around specific visual axes that connect the living spaces with the surrounding peaks.',
    heroImage: '/src/assets/images/GUMMER1_003.jpg',
    images: [
      '/src/assets/images/GUMMER1_010.jpg',
      '/src/assets/images/GUMMER1_014.jpg',
      '/src/assets/images/GUMMER2_024.jpg'
    ],
    facts: {
      'Altitude': '1.400 m',
      'Materials': 'Arolla Pine / Granite'
    },
    credits: {
      'Interiors': 'CEZ Studio',
      'Craft': 'Alpine Joinery'
    }
  },
  {
    id: '05_DEN2013062',
    title: 'DEN 2013-062',
    category: 'Residential',
    year: '2013',
    location: 'Bolzano, Italy',
    description: 'Analytical approach to modern living in a dense urban environment, exploring new forms of domesticity.',
    concept: 'Density and Light. The project maximizes internal volumes through clever sectional play, ensuring privacy while maintaining open connections to the exterior.',
    heroImage: '/src/assets/images/DEN2013062D0005.jpg',
    images: [
      '/src/assets/images/DEN2013062D0191.jpg',
      '/src/assets/images/DEN2013062D0401.jpg'
    ],
    facts: {
      'Code': 'DEN/2013',
      'Typology': 'Urban Housing'
    },
    credits: {
      'Design': 'CEZ Studio'
    }
  },
  {
    id: '06_Haus_G5',
    title: 'Haus G5',
    category: 'Residential',
    year: '2024',
    location: 'Merano, Italy',
    description: 'A study in residential modularity and multi-generational housing in the Merano valley.',
    concept: 'Evolutionary living. The floor plans are designed to be reconfigured over time, accommodating shifting family needs without structural modification.',
    heroImage: 'https://images.unsplash.com/photo-1518005020451-9137021ca39f?q=80&w=2670&auto=format&fit=crop',
    images: [],
    facts: {
      'Project': 'Haus G5',
      'Context': 'Vineyard Outskirts'
    },
    credits: {
      'Architecture': 'CEZ Studio'
    }
  },
  {
    id: '08_Rechtsplan',
    title: 'Rechtsplan',
    category: 'Landscape',
    year: '2023',
    location: 'South Tyrol, Italy',
    description: 'Urban planning and masterplan proposal for the integration of industrial zones and green corridors.',
    concept: 'Productive landscapes. Re-imagining the industrial fringe not as a border, but as a transitional space of ecological value.',
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2632&auto=format&fit=crop',
    images: [],
    facts: {
      'Scope': 'Masterplan',
      'Area': '45 Hectares'
    },
    credits: {
      'Strategy': 'CEZ Studio'
    }
  },
  {
    id: '09_Project_Closeup',
    title: 'Eingang Garten',
    category: 'Landscape',
    year: '2023',
    location: 'Milan, Italy',
    description: 'Detail-oriented intervention in a private garden, focusing on the threshold between interior and exterior.',
    concept: 'The tactile entrance. Using dark metal and textured concrete to create a sequence of sensory experiences upon entering the space.',
    heroImage: '/src/assets/images/Eingang_20231122.jpg',
    images: [],
    facts: {
      'Type': 'Renovation',
      'Status': 'Completed'
    },
    credits: {
      'Landscape': 'CEZ Studio'
    }
  },
  {
    id: '10_Project_Panoramica',
    title: 'Panoramica Terrazza',
    category: 'Residential',
    year: '2023',
    location: 'Bressanone, Italy',
    description: 'A terrace extension that offers panoramic views over the valley, treated as an outdoor room.',
    concept: 'The horizon as a wall. Large-scale glazing and seamless transitions and floor finishes create a sense of direct continuity with the landscape.',
    heroImage: '/src/assets/images/Panoramica_senza_titolo6.jpg',
    images: [],
    facts: {
      'Floor': 'Penthouse',
      'View': 'Dolomites'
    },
    credits: {
      'Design': 'CEZ Studio'
    }
  },
  {
    id: '11_DSC_Project',
    title: 'Brixen Apartment',
    category: 'Residential',
    year: '2023',
    location: 'Bressanone, Italy',
    description: 'Interior renovation of a historic apartment in the city center, focusing on heritage preservation.',
    concept: 'Uncovering layers. The design process was an excavation of sorts, stripping back modern additions to reveal the primary volume and historical textures.',
    heroImage: '/src/assets/images/DSC_2164.JPG',
    images: [
      '/src/assets/images/DSC_2249.JPG',
      '/src/assets/images/DSC_1674.JPG',
      '/src/assets/images/DSC_1741.JPG'
    ],
    facts: {
      'Status': 'Completed',
      'Surface': '120 m2'
    },
    credits: {
      'Photography': 'DSC'
    }
  },
  {
    id: '12_Intercable_Arena',
    title: 'Intercable Arena',
    category: 'Public / Civic',
    year: '2021',
    location: 'Brunico, Italy',
    description: 'A multi-purpose sports facility and tectonic landmark, serving as a hub for ice sports and community events in the Pusteria Valley.',
    concept: 'Tectonic integration. The design emphasizes a strong horizontal presence, anchoring the building to the valley floor while creating dynamic internal volumes for athletic performance.',
    heroImage: '/src/assets/images/CF143272.jpg',
    images: [
      '/src/assets/images/CF143281.jpg',
      '/src/assets/images/CF143450.jpg',
      '/src/assets/images/CF143531.jpg',
      '/src/assets/images/CF143594.jpg'
    ],
    facts: {
      'Category': 'Competition Winner',
      'Facility': 'Ice Arena'
    },
    credits: {
      'Lead Architect': 'CEZ Studio',
      'Photography': 'CF'
    }
  },
  {
    id: '13_DP_MG_Project',
    title: 'Residential Details',
    category: 'Residential',
    year: '2024',
    location: 'Milan, Italy',
    description: 'Detailed study of residential materiality and constructive precision.',
    concept: 'Micro-architecture. Every detail, from handles to thresholds, is part of a unified vision of reductive rigor.',
    heroImage: '/src/assets/images/_MG_2707.jpg',
    images: [
      '/src/assets/images/_MG_2738.jpg'
    ],
    facts: {
      'Phase': 'Finishing',
      'Focus': 'Materiality'
    },
    credits: {
      'Photography': 'MG / DP'
    }
  },
  {
    id: '14_Unsorted_To_Confirm',
    title: 'Ongoing Works',
    category: 'Competitions',
    year: '2025',
    location: 'International',
    description: 'A collection of recent project developments and ongoing research in architectural form.',
    concept: 'Continuous research. This collection represents the evolving studio philosophy through various scales and contexts.',
    heroImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2670&auto=format&fit=crop',
    images: [],
    facts: {
      'Status': 'In Progress',
      'Count': '4 Projects'
    },
    credits: {
      'Studio': 'CEZ'
    }
  }
];
