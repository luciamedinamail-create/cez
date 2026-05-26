import { ClientProject } from '../types/dashboard';

export const MOCK_PROJECTS: ClientProject[] = [
  {
    id: 'p1',
    name: 'Interventi',
    location: 'Bolzano, Italy',
    year: '2024',
    phase: 'Technical Documentation',
    status: 'Review needed',
    lastUpdated: '12 May 2026',
    heroImage: '/src/assets/images/cez_studio_hero_1779118191957.png',
    updates: [
      {
        id: 'u1',
        title: 'Updated floor plans uploaded',
        description: 'Revised ground floor and section drawings are now available in Drawings.',
        date: '12 May 2026',
        relatedFiles: ['Ground_Floor_Plan.pdf', 'Section_AA.pdf'],
        createdAt: { seconds: 1715500800, nanoseconds: 0 } as any
      },
      {
        id: 'u2',
        title: 'Site meeting notes',
        description: 'Summary of the meeting held yesterday at the Bolzano site regarding window fixtures.',
        date: '10 May 2026',
        createdAt: { seconds: 1715328000, nanoseconds: 0 } as any
      }
    ],
    documents: [
      {
        id: 'd1',
        name: '04_Rechtsplan_230918.pdf',
        category: 'Planning',
        type: 'PDF',
        size: '1.2 MB',
        url: '#',
        dateUploaded: '18 Sep 2023',
        status: 'Available'
      }
    ],
    drawings: [
      {
        id: 'dr1',
        name: 'Ground Floor Plan',
        category: 'Plans',
        type: 'PDF',
        url: '/src/assets/images/scuola1/scuolaplane1.png',
        thumbnail: '/src/assets/images/scuola1/scuolaplane1.png',
        dateUploaded: '12 May 2026',
        status: 'Updated',
        revision: '03',
        scale: '1:50'
      },
      {
        id: 'dr2',
        name: 'Main Section AA',
        category: 'Sections',
        type: 'PDF',
        url: '/src/assets/images/scuola1/scuolaplane2.png',
        thumbnail: '/src/assets/images/scuola1/scuolaplane2.png',
        dateUploaded: '12 May 2026',
        status: 'Available',
        revision: '01',
        scale: '1:20'
      }
    ],
    photography: [
      {
        id: 'ph1',
        name: 'Exterior West View',
        category: 'Exterior',
        type: 'JPG',
        url: '/src/assets/images/CF143272.jpg',
        thumbnail: '/src/assets/images/CF143272.jpg',
        dateUploaded: '05 May 2026',
        status: 'Available'
      }
    ],
    reviews: [
      {
        id: 'r1',
        fileName: 'Ground Floor Plan — Revision 03',
        fileUrl: '/src/assets/images/scuola1/scuolaplane1.png',
        whatChanged: 'Review updated circulation layout',
        requestedAction: 'Check the new kitchen position vs the previous layout.',
        dueDate: '20 May 2026',
        status: 'Pending'
      }
    ]
  },
  {
    id: 'p2',
    name: 'Casa Nel Bosco',
    location: 'Brixen, IT',
    year: '2023',
    phase: 'Construction',
    status: 'In progress',
    lastUpdated: '01 May 2026',
    heroImage: '/src/assets/images/GUMMER1_010.jpg',
    updates: [],
    documents: [],
    drawings: [],
    photography: [],
    reviews: []
  }
];
