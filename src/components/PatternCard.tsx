import React from 'react';
import { Card, CardProps, useTheme } from '@mui/material';

interface PatternCardProps extends CardProps {
  patternIntensity?: 'light' | 'medium' | 'strong';
  patternType?: 'circles' | 'diagonal' | 'waves';
  accentPosition?: 'top' | 'left' | 'right' | 'bottom' | 'none';
  accentColor?: string;
}

const PatternCard: React.FC<PatternCardProps> = ({
  children,
  patternIntensity = 'light',
  patternType = 'circles',
  accentPosition = 'top',
  accentColor,
  sx,
  ...props
}) => {
  const theme = useTheme();
  
  // Set pattern opacity based on intensity
  const patternOpacity = {
    light: { primary: 0.05, secondary: 0.03 },
    medium: { primary: 0.1, secondary: 0.05 },
    strong: { primary: 0.15, secondary: 0.08 },
  }[patternIntensity];
  
  // Define pattern based on type
  let patternStyle = {};
  
  const primaryColor = theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, OPACITY)' : 'rgba(85, 65, 93, OPACITY)';
  const secondaryColor = theme.palette.mode === 'dark' ? 'rgba(249, 213, 139, OPACITY)' : 'rgba(249, 213, 139, OPACITY)';
  
  // Determine pattern background
  switch (patternType) {
    case 'diagonal':
      patternStyle = {
        backgroundImage: `
          repeating-linear-gradient(
            45deg, 
            transparent, 
            transparent 10px, 
            ${primaryColor.replace('OPACITY', patternOpacity.primary.toString())} 10px, 
            ${primaryColor.replace('OPACITY', patternOpacity.primary.toString())} 11px
          ),
          repeating-linear-gradient(
            135deg, 
            transparent, 
            transparent 15px, 
            ${secondaryColor.replace('OPACITY', patternOpacity.secondary.toString())} 15px, 
            ${secondaryColor.replace('OPACITY', patternOpacity.secondary.toString())} 16px
          )
        `,
      };
      break;
    case 'waves':
      patternStyle = {
        backgroundImage: `
          radial-gradient(
            circle at 30% 80%, 
            ${primaryColor.replace('OPACITY', patternOpacity.primary.toString())} 0%, 
            transparent 40%
          ),
          radial-gradient(
            circle at 80% 20%, 
            ${secondaryColor.replace('OPACITY', patternOpacity.secondary.toString())} 0%, 
            transparent 30%
          )
        `,
        backgroundSize: '100% 100%',
      };
      break;
    case 'circles':
    default:
      patternStyle = {
        backgroundImage: `
          radial-gradient(circle at 90% 10%, ${primaryColor.replace('OPACITY', patternOpacity.primary.toString())} 0%, transparent 40%), 
          radial-gradient(circle at 10% 90%, ${secondaryColor.replace('OPACITY', patternOpacity.secondary.toString())} 0%, transparent 30%)
        `,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      };
  }
  
  // Define accent style
  const finalAccentColor = accentColor || theme.palette.primary.main;
  let accentStyle = {};
  
  if (accentPosition !== 'none') {
    const accentSize = accentPosition === 'top' || accentPosition === 'bottom' ? '4px' : '4px';
    
    accentStyle = {
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        [accentPosition]: 0,
        ...(accentPosition === 'top' || accentPosition === 'bottom' 
          ? { left: 0, right: 0, height: accentSize } 
          : { top: 0, bottom: 0, width: accentSize }),
        backgroundColor: finalAccentColor,
        opacity: 0.7,
      },
    };
  }
  
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: '16px',
        border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(195, 165, 199, 0.2)'}`,
        overflow: 'hidden',
        ...patternStyle,
        ...accentStyle,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Card>
  );
};

export default PatternCard;