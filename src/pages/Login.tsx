import { useState, FormEvent, useEffect } from 'react';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../lib/firebase';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, LogOut, ShieldCheck, User as UserIcon, Loader2, Mail, Lock, Chrome } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Login() {
  const [user, setUser] = useState(auth.currentUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const syncUserToFirestore = async (result: any) => {
    const userRef = doc(db, 'users', result.user.uid);
    try {
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          userId: result.user.uid,
          email: result.user.email,
          role: (result.user.email === 'admin@cezstudio.com' || result.user.email === 'blommaavmystik@gmail.com') ? 'admin' : 'client',
          createdAt: serverTimestamp(),
        });
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${result.user.uid}`);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncUserToFirestore(result);
    } catch (err: any) {
      setError(t('login_error_auth'));
      console.error('Google Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setHint(null);
    
    try {
      let result;
      // Auto-registration for the specific admin email to make testing easy
      if (!isRegistering && email === 'admin@cezstudio.com') {
        try {
          result = await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
          if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
            result = await createUserWithEmailAndPassword(auth, email, password);
          } else {
            throw err;
          }
        }
      } else if (isRegistering) {
        result = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        try {
          result = await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
          // If login fails and we want "easy mode", explain they can register
          if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
            setHint(t('login_hint'));
          }
          throw err;
        }
      }

      if (result) {
        await syncUserToFirestore(result);
      }
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        setError(t('login_error_operation_not_allowed'));
      } else if (err.code === 'auth/email-already-in-use') {
        setError(t('login_have_account'));
      } else if (err.code === 'auth/weak-password') {
        setError(t('login_weak_password'));
      } else {
        setError(t('login_error_auth'));
      }
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="max-w-[2810px] mx-auto page-padding section-padding min-h-[85vh] flex flex-col items-center justify-center">
      <div className="w-full max-w-lg bg-white p-12 md:p-20 space-y-12 text-center border border-black/[0.05]">
        <div className="w-16 h-16 bg-studio-ink-heavy text-studio-bg rounded-full flex items-center justify-center mx-auto mb-10 transition-transform hover:scale-110 duration-700">
          <ShieldCheck size={32} strokeWidth={1} />
        </div>
        
        <div className="space-y-6">
          <h1 className="project-name !text-[28px] uppercase tracking-tight">{t('login_portal_title')}</h1>
          <p className="body-copy max-w-sm mx-auto opacity-70">
            {t('login_portal_desc')}
          </p>
          
          <button
            type="button"
            onClick={() => {
              setEmail('admin@cezstudio.com');
              setPassword('password123');
              setHint(t('dashboard_admin_loaded'));
            }}
            className="text-[10px] uppercase tracking-widest font-bold opacity-30 hover:opacity-100 transition-opacity flex items-center gap-2 mx-auto"
          >
            <ShieldCheck size={12} /> {t('dashboard_demo_account')}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!user ? (
            <motion.form
              key="logged-out"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleAuth}
              className="space-y-6"
            >
              <div className="space-y-6">
                <div className="grid gap-2 text-left">
                  <label className="project-meta !text-[11px] font-bold uppercase tracking-widest">{t('login_email')}</label>
                  <div className="flex items-center bg-white border border-black/20 p-5 gap-4 focus-within:border-black/50 transition-all">
                    <Mail size={18} className="text-black/20" />
                    <input 
                      type="email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      required
                      className="w-full bg-transparent border-none font-sans text-sm outline-none placeholder:opacity-30"
                    />
                  </div>
                </div>
                <div className="grid gap-2 text-left">
                  <label className="project-meta !text-[11px] font-bold uppercase tracking-widest">{t('login_password')}</label>
                  <div className="flex items-center bg-white border border-black/20 p-5 gap-4 focus-within:border-black/50 transition-all">
                    <Lock size={18} className="text-black/20" />
                    <input 
                      type="password" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      required
                      className="w-full bg-transparent border-none font-sans text-sm outline-none placeholder:opacity-30"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-studio-ink-heavy text-studio-bg font-medium uppercase tracking-[0.18em] text-[14px] hover:bg-studio-ink-heavy/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
                  {loading ? t('login_authenticating') : (isRegistering ? t('login_register') : t('login_submit'))}
                </button>

                {!isRegistering && (
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full py-5 border border-black/10 text-studio-ink-heavy font-medium uppercase tracking-[0.18em] text-[14px] hover:bg-black/5 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Chrome size={18} />}
                    {t('login_signin_google')}
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-[11px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100 transition-opacity"
                >
                  {isRegistering ? t('login_have_account') : t('login_no_account')}
                </button>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-100">
                  <p className="project-meta !text-[11px] text-red-600 font-bold uppercase tracking-widest leading-relaxed">
                    {error}
                  </p>
                  {error === t('login_error_operation_not_allowed') && (
                    <a 
                      href="https://console.firebase.google.com/project/_/authentication/providers" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] underline uppercase tracking-widest font-bold text-red-800 mt-2 block"
                    >
                      Open Firebase Console
                    </a>
                  )}
                </div>
              )}
              {hint && <p className="project-meta !text-[11px] text-studio-ink-heavy font-bold uppercase tracking-widest opacity-60">{hint}</p>}
            </motion.form>
          ) : (
            <motion.div
              key="logged-in"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="flex flex-col items-center gap-2 p-6 bg-studio-border/10">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-black/5 mb-3">
                  <div className="w-full h-full bg-studio-ink-heavy flex items-center justify-center text-studio-bg">
                    <UserIcon size={28} />
                  </div>
                </div>
                <p className="project-name !text-[18px]">{user.displayName || user.email?.split('@')[0]}</p>
                <p className="project-meta opacity-40">{user.email}</p>
              </div>

              <div className="bg-[#fcfcfc] border border-black/[0.03] p-6 project-meta !text-[12px] opacity-60 leading-loose">
                {t('login_provisioning')}
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-5 border border-studio-ink-heavy text-studio-ink-heavy font-medium uppercase tracking-[0.18em] text-[14px] hover:bg-studio-ink-heavy hover:text-studio-bg transition-all flex items-center justify-center gap-3"
              >
                <LogOut size={18} /> {t('login_signout')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
