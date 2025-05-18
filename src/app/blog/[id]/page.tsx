// app/blog/[id]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

interface Blog {
  id: string;
  title: string;
  text: string;
  publishDate: string;
  readingTime: number;
}

export default function BlogDetail({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:8000/blog/${params.id}`);
        if (!response.ok) throw new Error('Blog not found');
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params.id]);

  if (loading) return <div className={styles.loading}>Loading blog post...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!blog) return <div className={styles.error}>Blog not found</div>;

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.backButton}>
        <BackIcon />
        
      </button>

      <h1 className={styles.title}>{blog.title}</h1>
      
      <div className={styles.metaContainer}>
        <div className={styles.metaItem}>
          <CalendarIcon />
          <span>{new Date(blog.publishDate).toLocaleDateString()}</span>
        </div>
        
        <div className={styles.metaItem}>
          <ClockIcon />
          <span>{blog.readingTime} Minutes</span>
        </div>
      </div>

      <div className={styles.contentBox}>
        <p className={styles.contentText}>{blog.text}</p>
      </div>
    </div>
  );
}

// SVG Icons
const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={styles.backIcon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={styles.metaIcon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={styles.metaIcon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);