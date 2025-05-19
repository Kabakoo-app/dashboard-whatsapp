import React from 'react';
import { Box, useTheme } from '@mui/material';

interface IndigenousPatternBackgroundProps {
  variant?: 'circular' | 'triangular' | 'linear' | 'mixed';
  opacity?: number;
  children: React.ReactNode;
  color1?: string;
  color2?: string;
}

const IndigenousPatternBackground: React.FC<IndigenousPatternBackgroundProps> = ({
  variant = 'mixed',
  opacity = 0.1,
  children,
  color1,
  color2
}) => {
  const theme = useTheme();
  
  // Set colors based on theme or override with props
  const primaryColor = color1 || (theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, ' : 'rgba(85, 65, 93, ');
  const secondaryColor = color2 || 'rgba(249, 213, 139, ';
  
  // Create pattern based on variant
  let patternStyle = {};
  
  switch (variant) {
    case 'circular':
      patternStyle = {
        backgroundImage: `
          radial-gradient(circle at 20% 30%, ${primaryColor}${opacity}) 0%, transparent 30%),
          radial-gradient(circle at 80% 70%, ${secondaryColor}${opacity}) 0%, transparent 25%)
        `,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat'
      };
      break;
    case 'triangular':
      patternStyle = {
        backgroundImage: `
          linear-gradient(120deg, transparent 0%, transparent 40%, ${primaryColor}${opacity / 2}) 40%, transparent 60%),
          linear-gradient(240deg, transparent 0%, transparent 40%, ${secondaryColor}${opacity / 2}) 40%, transparent 60%)
        `,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat'
      };
      break;
    case 'linear':
      patternStyle = {
        backgroundImage: `
          linear-gradient(to right, transparent, ${primaryColor}${opacity / 2}) 50%, transparent),
          linear-gradient(to bottom, transparent, ${secondaryColor}${opacity / 2}) 70%, transparent)
        `,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat'
      };
      break;
    case 'mixed':
    default:
      patternStyle = {
        backgroundImage: `
          radial-gradient(circle at 90% 10%, ${primaryColor}${opacity}) 0%, transparent 40%), 
          radial-gradient(circle at 10% 90%, ${secondaryColor}${opacity}) 0%, transparent 30%),
          radial-gradient(circle at 40% 40%, ${primaryColor}${opacity / 2}) 0%, transparent 25%)
        `,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat'
      };
  }
  
  return (
    <Box 
      sx={{ 
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...patternStyle
      }}
    >
      {children}
    </Box>
  );
};

export default IndigenousPatternBackground;