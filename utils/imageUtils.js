// Utility for progressive image loading and WebP support detection
export const supportsWebP = () => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

export const getOptimalImageSrc = (basePath, extension = 'jpg') => {
  if (supportsWebP()) {
    return basePath.replace(`.${extension}`, '.webp');
  }
  return basePath;
};

// Preload images for better performance
export const preloadImages = (imageUrls) => {
  if (typeof window === 'undefined') return;
  
  imageUrls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

// Lazy load images when they come into view
export const lazyLoadImage = (imageElement, src) => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = src;
          entry.target.classList.remove('loading');
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(imageElement);
  } else {
    // Fallback for older browsers
    imageElement.src = src;
  }
}; 