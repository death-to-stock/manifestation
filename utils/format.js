export function formatDisplayName(filename) {
    if (!filename) return '';
    
    const nameWithoutExtension = filename.replace(/\.(mp3|m4a)$/, '');
    
    const spacedName = nameWithoutExtension
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
      
    return spacedName.charAt(0).toUpperCase() + spacedName.slice(1);
  } 