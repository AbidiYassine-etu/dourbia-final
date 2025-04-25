import { useEffect, useRef, useState } from "react";
import styles from '@/app/Carousel.module.css';

interface CustomSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: Array<{
      value: string;
      label: string;
      isDefault:boolean;
    }>;
    defaultValue?: string;
  }
  
  export const CustomSelect: React.FC<CustomSelectProps> = ({ 
    value, 
    onChange, 
    options, 
    defaultValue = '' 
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    return (
      <div className={styles.customSelect} ref={selectRef}>
        <button
          type="button"
          className={`${styles.selectInput} ${value === '' ? styles.default : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {value || defaultValue}
          <span className={styles.customArrow}>
            <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L7.5 8L14 1.5" stroke="#8F8F8F" strokeWidth="2"/>
            </svg>
          </span>
        </button>
        
        {isOpen && (
          <div className={styles.optionsContainer}>
            {options.map((option) => (
              <button
                key={option.value + option.label}
                type="button"
                disabled={option.isDefault}
                className={`${styles.optionItem} ${option.value === '' ? styles.defaultOption : ''}`}
                onClick={() => {
                  if(!option.isDefault){
                  onChange(option.value);
                  setIsOpen(false);
                  }
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };