import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useActiveSectionContext } from '../context/activeSectionContext';

export function useSectionInView(sectionName, threshold = 0.75) {
  let thresholdByScreen = threshold;
  if (typeof window !== 'undefined' && window.innerWidth <= 700)
    thresholdByScreen = 0.3;

  const { ref, inView } = useInView({
    threshold: thresholdByScreen,
  });
  const { setActiveSection } = useActiveSectionContext();

  useEffect(() => {
    if (inView) {
      setActiveSection(sectionName);
    }
  }, [inView, setActiveSection, sectionName]);

  return {
    ref,
  };
}
