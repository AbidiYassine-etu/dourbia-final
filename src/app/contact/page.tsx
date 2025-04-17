'use client';

import { useState } from 'react';
import styles from '@/app/Contact.module.css';


export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    phone: '',
    object: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};

    if (!formData.nom.trim()) newErrors.nom = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
    } else if (formData.phone.length < 8) {
      newErrors.phone = 'Phone must be at least 8 characters';
    }
    if (!formData.object.trim()) newErrors.object = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch(' http://localhost:8000/contact/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit form');
      }

      setSubmitSuccess(true);
      setFormData({
        nom: '',
        email: '',
        phone: '',
        object: '',
        message: ''
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Envoyer Nous Un Message</h1>
      
      {submitSuccess ? (
        <div className={styles.successMessage}>
          Message sent successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="nom" className={styles.label}>
            </label>
            <input
            placeholder='Nom et Prénom'
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className={`${styles.formInput} ${errors.nom ? styles.inputError : ''}`}
            />
            {errors.nom && <p className={styles.errorText}>{errors.nom}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
            </label>
            <input
            placeholder='Télephone/Whatsapp'
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`${styles.formInput} ${errors.phone ? styles.inputError : ''}`}
            />
            {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
          </div>

          
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
            </label>
            <input
            placeholder='Adresse e-mail'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="object" className={styles.label}>
            </label>
            <input
            placeholder='Objet'
            type="text"
            id="object"
            name="object"
            value={formData.object}
            onChange={handleChange}
            className={`${styles.formInput} ${errors.object ? styles.inputError : ''}`}
            />
            {errors.object && <p className={styles.errorText}>{errors.object}</p>}
          </div>

          <div>
            <textarea
            placeholder='Message'
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={10}
            style={{
              width: '37.26838rem',
              height: '13.61544rem',
              borderRadius: '0.9375rem',
              flexShrink: 0
            }}
            className={` ${styles.customSize} ${errors.message ? styles.inputError : ''}`}
            />
            {errors.message && <p className={styles.errorText}>{errors.message}</p>}
          </div>

          {submitError && (
            <p className={styles.submitError}>{submitError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Submitting...' : 'envoyer'}
          </button>
        </form>
      )}
    </div>
  );
}