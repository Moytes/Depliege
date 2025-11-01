import { useState, useEffect, useRef } from 'react';

interface AnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean; 
}

export const useScrollAnimation = (options?: AnimationOptions) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);


  const { threshold = 0.1, rootMargin = '0px', triggerOnce = false } = options || {};

  useEffect(() => {
    const currentRef = ref.current; 

    if (!currentRef) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (triggerOnce) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(currentRef); 
          }
        } else {
          setIsVisible(entry.isIntersecting);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce, ref]); 

  return { ref, isVisible };
};