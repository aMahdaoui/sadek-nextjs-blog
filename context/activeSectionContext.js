import { useRouter } from 'next/router';
import { createContext, useContext, useState } from 'react';

export const ActiveSectionContext = createContext(null);

export default function ActiveSectionContextProvider({ children }) {
  const router = useRouter();
  
  const isBlogRoute = router.pathname.includes('posts');
  
  const [activeSection, setActiveSection] = useState(isBlogRoute ? 'Posts' : 'Home');
  // const [timeOfLastClick, setTimeOfLastClick] = useState(0); // we need to keep track of this to disable the observer temporarily when user clicks on a link

  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSectionContext() {
  const context = useContext(ActiveSectionContext);

  if (context === null) {
    throw new Error(
      'useActiveSectionContext must be used within an ActiveSectionContextProvider'
    );
  }
  return context;
}
