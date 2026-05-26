import { Timestamp } from 'firebase/firestore';

export type ProjectStatus = 'In progress' | 'Review needed' | 'Completed' | 'Archived';
export type FileStatus = 'Available' | 'Updated' | 'Pending review' | 'Approved' | 'Changes requested';

export interface ProjectUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  relatedFiles?: string[];
  author?: string;
  createdAt: Timestamp;
}

export interface ProjectFile {
  id: string;
  name: string;
  category: string;
  type: string;
  size?: string;
  url: string;
  thumbnail?: string;
  dateUploaded: string;
  status: FileStatus;
  revision?: string;
  scale?: string;
  description?: string;
}

export interface ReviewItem {
  id: string;
  fileName: string;
  fileUrl: string;
  whatChanged: string;
  requestedAction: string;
  dueDate?: string;
  status: 'Pending' | 'Approved' | 'Changes requested';
}

export interface ClientProject {
  id: string;
  name: string;
  location: string;
  year: string;
  phase: string;
  status: ProjectStatus;
  lastUpdated: string;
  heroImage: string;
  updates: ProjectUpdate[];
  documents: ProjectFile[];
  drawings: ProjectFile[];
  photography: ProjectFile[];
  reviews: ReviewItem[];
}
