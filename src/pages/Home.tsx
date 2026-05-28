import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { contentService } from '../services/contentService';
import { PROJECTS as STATIC_PROJECTS, Project } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';

const imageUrl = (src: string) => {
  if (!src) return '';

  // Keep external URLs unchanged
  if (src.startsWith('http') || src.startsWith('data:')) return src;

  // Remove accidental leading slash
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;

  // Adds /cez/ automatically in GitHub Pages because of Vite base
  return `${import.meta.env.BASE_URL}${cleanSrc}`;
};

function ImageFlicker({
  items,
  interval = 5000,
  delay = 0,
}: {
  items: { src: string; projectId: string }[];
  interval?: number;
  delay?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;

    const timeout = setTimeout(() => {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % items.length);
      }, interval);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [items, interval, delay]);

  if (!items || items.length === 0) return null;

  return (
    <Link
      to={`/projects/${items[index].projectId}`}
      className="block w-full h-full relative overflow-hidden group"
    >
      <AnimatePresence mode="popLayout">
        <motion.img
          key={items[index].src}
          src={items[index].src}
          alt=""
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{
            opacity: { duration: 2, ease: 'easeInOut' },
            scale: { duration: interval / 1000 + 2, ease: 'linear' },
          }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </AnimatePresence>
    </Link>
  );
}

function TextFlicker({
  projects,
  interval = 8000,
  delay = 0,
  color = '#7F4F3F',
}: {
  projects: Project[];
  interval?: number;
  delay?: number;
  color?: string;
}) {
  const [index, setIndex] = useState(0);
  const { language, t, tCategory } = useLanguage();

  const getLocalized = (val: string | any) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[language] || val.en || val.it || val.de || '';
  };

  useEffect(() => {
    if (projects.length <= 1) return;

    const timeout = setTimeout(() => {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % projects.length);
      }, interval);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [projects, interval, delay]);

  const current = projects[index];

  return (
    <Link
      to={current?.id ? `/projects/${current.id}` : '/projects'}
      className="relative w-full h-full flex flex-col justify-center items-center text-center p-12 md:p-14 lg:p-20 group overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-10"
        >
          <h2
            className="h2 text-center w-full group-hover:opacity-60 transition-opacity"
            style={{ color }}
          >
            {getLocalized(current?.title)}
          </h2>

          <p
            className="metadata-token text-center w-full"
            style={{ color: color + 'CC' }}
          >
            {current?.category ? tCategory(current.category) : t('home_hero_cat')}
          </p>
        </motion.div>
      </AnimatePresence>
    </Link>
  );
}

export default function Home() {
  const [latestProjects, setLatestProjects] = useState<Project[]>(STATIC_PROJECTS);
  const { t } = useLanguage();

  useEffect(() => {
    async function loadLatest() {
      const fbProjects = await contentService.getLatestProjects(5);

      if (fbProjects && fbProjects.length > 0) {
        setLatestProjects([...fbProjects, ...STATIC_PROJECTS]);
      }
    }

    loadLatest();
  }, []);

  const flickerGroups = useMemo(() => {
    const pool: { src: string; projectId: string }[] = [];

    latestProjects.forEach((p) => {
      if (p.heroImage && !p.heroImage.toLowerCase().includes('color')) {
        pool.push({
          src: imageUrl(p.heroImage),
          projectId: p.id,
        });
      }

      (p.images || []).forEach((img) => {
        if (img && !img.toLowerCase().includes('color')) {
          pool.push({
            src: imageUrl(img),
            projectId: p.id,
          });
        }
      });
    });

    const uniquePool: { src: string; projectId: string }[] = [];
    const seenSrcs = new Set<string>();

    for (const item of pool) {
      if (!seenSrcs.has(item.src)) {
        seenSrcs.add(item.src);
        uniquePool.push(item);
      }
    }

    return {
      main: uniquePool.slice(0, 4),
      mid: uniquePool.slice(4, 8),
      small: uniquePool.slice(8, 12),
      late: uniquePool.slice(12, 16),
    };
  }, [latestProjects]);

  return (
    <div className="flex flex-col bg-bg-primary overflow-x-hidden min-h-screen">
      <section className="page-padding section-padding">
        <div className="max-w-[2810px] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0">
          {/* Block 1: Main Feature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-2 row-span-2 aspect-square bg-bg-primary border-r border-b border-line-divider"
          >
            <TextFlicker
              projects={latestProjects.slice(0, Math.ceil(latestProjects.length / 2))}
              interval={10000}
              color="#7F4F3F"
            />
          </motion.div>

          {/* Block 2: Main Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="col-span-2 row-span-2 aspect-square overflow-hidden border-r border-b border-line-divider"
          >
            <ImageFlicker
              items={
                flickerGroups.main.length > 0
                  ? flickerGroups.main
                  : [
                      {
                        src: 'https://picsum.photos/seed/archi-1/1200/1200',
                        projectId: latestProjects[0]?.id || '',
                      },
                    ]
              }
              interval={7000}
            />
          </motion.div>

          {/* Block 3 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="col-span-1 row-span-1 aspect-square overflow-hidden border-r border-b border-line-divider"
          >
            <ImageFlicker
              items={
                flickerGroups.mid.length > 0
                  ? flickerGroups.mid
                  : [
                      {
                        src: 'https://picsum.photos/seed/archi-2/600/600',
                        projectId: latestProjects[1]?.id || '',
                      },
                    ]
              }
              interval={5500}
              delay={1000}
            />
          </motion.div>

          {/* Block 4: The Ingebound Experience */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="col-span-1 row-span-1 aspect-square bg-[#FFFFFF] flex flex-col justify-center items-center p-10 lg:p-14 border-b border-line-divider"
          >
            <h3
              className="h3 !font-bold text-center !leading-[1.1] !uppercase tracking-tighter text-[#919A8F] !text-[16px] md:!text-[18px] lg:!text-[20px]"
              dangerouslySetInnerHTML={{
                __html: t('home_experience_title').replace(/\s+/g, '<br />'),
              }}
            />
          </motion.div>

          {/* Block 4b */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="col-span-1 row-span-1 aspect-square overflow-hidden border-b border-line-divider lg:col-start-6 lg:row-start-2"
          >
            <ImageFlicker
              items={[...flickerGroups.small].reverse()}
              interval={5000}
              delay={200}
            />
          </motion.div>

          {/* Block 5 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="col-span-1 row-span-1 aspect-square overflow-hidden border-b border-line-divider lg:col-start-5 lg:row-start-2"
          >
            <ImageFlicker
              items={
                flickerGroups.small.length > 0
                  ? flickerGroups.small
                  : [
                      {
                        src: 'https://picsum.photos/seed/archi-3/600/600',
                        projectId: latestProjects[2]?.id || '',
                      },
                    ]
              }
              interval={6000}
              delay={2000}
            />
          </motion.div>

          {/* Block 6 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="col-span-2 row-span-2 aspect-square overflow-hidden border-r border-b border-line-divider lg:col-start-1 lg:row-start-3"
          >
            <ImageFlicker
              items={[...flickerGroups.main].reverse()}
              interval={8000}
              delay={500}
            />
          </motion.div>

          {/* Block 7 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="col-span-1 row-span-1 aspect-square bg-[#FFFFFF] flex flex-col justify-center items-center p-10 lg:p-14 border-r border-b border-line-divider lg:col-start-3 lg:row-start-3"
          >
            <h3
              className="h3 !font-bold text-center !leading-[1.1] !uppercase tracking-tighter text-[#B2B369] !text-[16px] md:!text-[18px] lg:!text-[20px]"
              dangerouslySetInnerHTML={{
                __html: t('home_ambassador_title').replace(/\s+/g, '<br />'),
              }}
            />
          </motion.div>

          {/* Block 8 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="col-span-1 row-span-1 aspect-square overflow-hidden border-r border-b border-line-divider lg:col-start-4 lg:row-start-3"
          >
            <ImageFlicker
              items={[...flickerGroups.late].reverse()}
              interval={6500}
              delay={1500}
            />
          </motion.div>

          {/* Block 9 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="col-span-2 row-span-2 aspect-square bg-bg-primary border-b border-line-divider lg:col-start-5 lg:row-start-3"
          >
            <TextFlicker
              projects={latestProjects.slice(Math.ceil(latestProjects.length / 2))}
              interval={12000}
              delay={3000}
              color="#A87862"
            />
          </motion.div>

          {/* Block 10 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="col-span-1 row-span-1 aspect-square overflow-hidden border-r border-b border-line-divider lg:col-start-3 lg:row-start-4"
          >
            <ImageFlicker
              items={flickerGroups.mid}
              interval={7500}
              delay={300}
            />
          </motion.div>

          {/* Block 11 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="col-span-1 row-span-1 aspect-square overflow-hidden border-r border-b border-line-divider lg:col-start-4 lg:row-start-4"
          >
            <ImageFlicker
              items={flickerGroups.late}
              interval={9000}
              delay={800}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
