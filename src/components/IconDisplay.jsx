import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';

const IconDisplay = ({ iconName, imageUrl, className = "h-6 w-6", fallbackIcon = "Globe" }) => {
  const [hasError, setHasError] = useState(false);

  // If imageUrl is provided and hasn't failed, try to render it.
  if (imageUrl && imageUrl.trim() && !hasError) {
    return (
      <img 
        src={imageUrl} 
        alt={iconName || 'Icon'} 
        className={`${className} object-cover rounded`}
        onError={() => setHasError(true)} // On error, set state to trigger a re-render with the fallback.
      />
    );
  }

  // Fallback to Lucide icon if no image URL or if the image failed to load.
  const IconComponent = LucideIcons[iconName] || LucideIcons[fallbackIcon] || LucideIcons.Globe;
  
  return <IconComponent className={className} />;
};

export default IconDisplay;
