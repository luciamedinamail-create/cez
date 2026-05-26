import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc,
  query, 
  orderBy, 
  serverTimestamp,
  where,
  limit
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Project } from '../data/projects';

export interface NewsArticle {
  id?: string;
  date: string;
  category: string;
  title: string;
  description: string;
  createdAt: any;
}

const PROJECTS_COLLECTION = 'projects';
const NEWS_COLLECTION = 'news';

export const contentService = {
  // Projects
  async getProjects() {
    try {
      const q = query(collection(db, PROJECTS_COLLECTION), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, PROJECTS_COLLECTION);
    }
  },

  async getLatestProjects(count: number = 3) {
    try {
      const q = query(collection(db, PROJECTS_COLLECTION), orderBy('createdAt', 'desc'), limit(count));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, PROJECTS_COLLECTION);
    }
  },

  async getProjectById(id: string) {
    try {
      const docRef = doc(db, PROJECTS_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Project;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${PROJECTS_COLLECTION}/${id}`);
    }
  },

  async addProject(project: Omit<Project, 'id'>) {
    try {
      const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
        ...project,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, PROJECTS_COLLECTION);
    }
  },

  async updateProject(id: string, project: Partial<Project>) {
    try {
      const docRef = doc(db, PROJECTS_COLLECTION, id);
      await updateDoc(docRef, {
        ...project,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${PROJECTS_COLLECTION}/${id}`);
    }
  },

  async deleteProject(id: string) {
    try {
      const docRef = doc(db, PROJECTS_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${PROJECTS_COLLECTION}/${id}`);
    }
  },

  // News
  async getNews() {
    try {
      const q = query(collection(db, NEWS_COLLECTION), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsArticle));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, NEWS_COLLECTION);
    }
  },

  async addNews(article: Omit<NewsArticle, 'id' | 'createdAt'>) {
    try {
      const docRef = await addDoc(collection(db, NEWS_COLLECTION), {
        ...article,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, NEWS_COLLECTION);
    }
  },

  async deleteNews(id: string) {
    try {
      const docRef = doc(db, NEWS_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${NEWS_COLLECTION}/${id}`);
    }
  },

  // Settings
  async getSettings(id: string) {
    try {
      const docRef = doc(db, 'settings', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `settings/${id}`);
    }
  },

  async updateSettings(id: string, data: any) {
    try {
      const docRef = doc(db, 'settings', id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      // If document doesn't exist, use setDoc instead
      try {
        const docRef = doc(db, 'settings', id);
        await setDoc(docRef, {
          ...data,
          updatedAt: serverTimestamp(),
        });
      } catch (innerError) {
        handleFirestoreError(innerError, OperationType.WRITE, `settings/${id}`);
      }
    }
  }
};
