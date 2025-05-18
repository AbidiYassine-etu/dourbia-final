// app/blog/page.tsx
"use client";

import { useEffect, useState } from 'react';
import styles from './blog.module.css';
import Link from 'next/link';

interface Blog {
  id: string;
  title: string;
  text: string;
  publishDate: string;
  readingTime: number;
  imagePath: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:8000/blog');
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div className={styles.loading}>Loading blogs...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Notre Blog</h1>
        <p className={styles.subtitle}>Découvrez nos dernières analyses, actualités et innovations technologiques.</p>
      </div>

      <div className={styles.blogGrid}>
        {blogs.map((blog) => (
        <Link href={`/blog/${blog.id}`}>
          <div key={blog.id} className={styles.blogCard}>
            {/* Add Image Container */}
            {blog.imagePath && (
              <div className={styles.imageContainer}>
                <img 
                src={`http://localhost:8000/${blog.imagePath}`} 
                alt={blog.title}
                className={styles.blogImage}
                />
              </div>
            )}
            <h3 className={styles.blogTitle}>{blog.title.slice(0, 50)}{blog.title.length > 50 && '...'}</h3>
            <p className={styles.blogText}>{blog.text.slice(0, 150)}{blog.text.length > 150 && '...'}</p>
            
            <div className={styles.metaContainer}>
              <div className={styles.metaItem}>
                <CalendarIcon />
                <span>{new Date(blog.publishDate).toLocaleDateString()}</span>
              </div>
              
              <div className={styles.metaItem}>
                <ClockIcon />
                <span>{blog.readingTime} Minutes </span>
              </div>
              Voir Plus
            </div>
          </div>
          </Link>
        ))}
      </div>
      
    </div>
  );
}

// SVG Icons
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={styles.icon}
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
    className={styles.icon}
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