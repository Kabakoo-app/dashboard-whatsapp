import { Box, Typography, useTheme } from '@mui/material';

interface CircularProgressProps {
  value: number;
  size?: number;
  thickness?: number;
  color?: string;
  bgColor?: string;
  showValue?: boolean;
  label?: string;
  variant?: 'regular' | 'pattern';
}

const CircularProgressWithPattern = ({
  value,
  size = 120,
  thickness = 8,
  color = '#55415D',
  bgColor = 'rgba(195, 165, 199, 0.1)',
  showValue = true,
  label,
  variant = 'pattern'
}: CircularProgressProps) => {
  const theme = useTheme();
  
  // Calculate parameters
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  const viewBoxSize = size + 2; // Add a little space for the pattern overflow
  
  // Create a pattern - using patterns inspired by indigenous motifs
  const patternId = `pattern-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      >
        <defs>
          {variant === 'pattern' && (
            <pattern
              id={patternId}
              patternUnits="userSpaceOnUse"
              width="6"
              height="6"
              patternTransform="rotate(45 50 50)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="6"
                stroke={color}
                strokeWidth="8"
                strokeDasharray="1,5"
              />
            </pattern>
          )}
        </defs>

        {/* Background Circle */}
        <circle
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={thickness}
        />

        {/* Progress Circle - with indigenous pattern fill */}
        <circle
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={radius}
          fill="none"
          stroke={variant === 'pattern' ? `url(#${patternId})` : color}
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${viewBoxSize / 2} ${viewBoxSize / 2})`}
        />

        {/* Add small circles along the path for a decorative effect */}
        {variant === 'pattern' && value > 5 && [...Array(Math.floor(value / 10))].map((_, i) => {
          const angle = (i * 36) * (Math.PI / 180);
          const x = viewBoxSize / 2 + radius * Math.cos(angle - Math.PI / 2);
          const y = viewBoxSize / 2 + radius * Math.sin(angle - Math.PI / 2);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={thickness / 4}
              fill={theme.palette.mode === 'dark' ? '#F9D58B' : '#F9D58B'}
              opacity={0.8}
            />
          );
        })}
      </svg>
      
      {/* Show value in the center */}
      {showValue && (
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{ fontWeight: 700, color: theme.palette.mode === 'dark' ? '#F8F3EA' : color }}
          >
            {value}%
          </Typography>
          {label && (
            <Typography
              variant="caption"
              component="div"
              sx={{ mt: -0.5, color: theme.palette.mode === 'dark' ? '#C3A5C7' : 'rgba(85, 65, 93, 0.7)' }}
            >
              {label}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CircularProgressWithPattern;