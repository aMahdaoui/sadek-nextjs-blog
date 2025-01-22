import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useActiveSectionContext } from '../context/activeSectionContext';
import { revealThresholdsByScreen } from './helpers';

export function useSectionInView(sectionName, threshold = 0.75) {
  
  const { setActiveSection } = useActiveSectionContext();

  const thresholdByScreen = revealThresholdsByScreen(threshold);

  const { ref, inView } = useInView({
    threshold: thresholdByScreen,
  });

  useEffect(() => {
    if (inView) {
      setActiveSection(sectionName);
    }
  }, [inView, setActiveSection, sectionName]);

  return { ref };
}
