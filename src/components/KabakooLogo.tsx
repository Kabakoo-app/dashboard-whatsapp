import { useTheme } from '@mui/material';

interface LogoProps {
  width?: number;
  height?: number;
}

const KabakooLogo = ({ width = 160, height = 40 }: LogoProps) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  
  // Colors based on theme mode from our color palette
  const primaryColor = isLight ? '#55415D' : '#F8F3EA';
  const secondaryColor = '#F9D58B';
  const accentColor = isLight ? '#C3A5C7' : '#C3A5C7';
  
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 160 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Logo Background */}
      <rect width="160" height="40" rx="8" fill="transparent" />
      
      {/* Abstract Pattern (indigenous inspired) */}
      <path 
        d="M0 8C0 3.58172 3.58172 0 8 0H152C156.418 0 160 3.58172 160 8V32C160 36.4183 156.418 40 152 40H8C3.58172 40 0 36.4183 0 32V8Z" 
        fill="transparent" 
      />
      <path 
        d="M10 5C14 8 25 15 40 8C55 1 65 10 80 12C95 14 110 5 125 10C140 15 150 8 155 5" 
        stroke={accentColor} 
        strokeWidth="2" 
        strokeDasharray="4 2" 
        opacity="0.6"
      />
      <path 
        d="M5 33C15 30 25 25 40 32C55 39 65 30 80 28C95 26 110 35 125 30C140 25 150 30 155 33" 
        stroke={secondaryColor} 
        strokeWidth="2" 
        strokeDasharray="4 2" 
        opacity="0.6"
      />
      
      {/* Kabakoo Logo Text */}
      <text 
        x="15" 
        y="26" 
        fontFamily="Rubik, sans-serif" 
        fontSize="18" 
        fontWeight="700" 
        fill={primaryColor}
      >
        KABAKOO
      </text>
      
      {/* Dot accent */}
      <circle cx="120" cy="20" r="5" fill={secondaryColor} />
      
      {/* Decorative element */}
      <rect x="130" y="14" width="20" height="4" rx="2" fill={accentColor} opacity="0.8" />
      <rect x="130" y="22" width="15" height="4" rx="2" fill={primaryColor} opacity="0.8" />
    </svg>
  );
};

export default KabakooLogo;