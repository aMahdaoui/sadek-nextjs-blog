export const revealThresholdsByScreen = (threshold) => {
  if (typeof window !== 'undefined' && window.innerWidth <= 700) return 0.3;

  return threshold;
};
