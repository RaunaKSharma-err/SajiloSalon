type ColorShades = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

type Colors = {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  accent: string;
  accentLight: string;
  background: string;
  backgroundSecondary: string;
  card: string;
  cardElevated: string;
  text: string;
  textLight: string;
  textMuted: string;
  border: string;
  borderLight: string;
  error: string;
  success: string;
  warning: string;
  info: string;
  gradient: {
    primary: readonly [string, string];
    secondary: readonly [string, string];
    success: readonly [string, string];
    warm: readonly [string, string];
  };
  "wild-willow": ColorShades;
};

const colors = {
  primary: "#8a964c",          
  primaryLight: "#b5be7b",     
  primaryDark: "#535b30",      
  secondary: "#a6b16a",        
  secondaryLight: "#dadeb8",   
  accent: "#f59e0b",           
  accentLight: "#fef3c7",      
  background: "#f6f7ee",       
  backgroundSecondary: "#ebedda", 
  card: "#f6f7edff",              
  cardElevated: "#b5be7b",      
  text: "#3b4027",              
  textLight: "#535b30",         
  textMuted: "#6b763a",         
  border: "#a6b16a",            
  borderLight: "#b5be7b",       
  error: "#ef4444",
  success: "#10b981",
  warning: "#f59e0b",
  info: "#434a2a",              
  gradient: {
    primary: ["#b5be7b", "#8a964c"] as const,
    secondary: ["#dadeb8", "#a6b16a"] as const,
    success: ["#10b981", "#059669"] as const,
    warm: ["#f59e0b", "#ef4444"] as const,
  },
  "wild-willow": {
    50: "#f6f7ee",
    100: "#ebedda",
    200: "#dadeb8",
    300: "#b5be7b",
    400: "#a6b16a",
    500: "#8a964c",
    600: "#6b763a",
    700: "#535b30",
    800: "#434a2a",
    900: "#3b4027",
    950: "#1e2211",
  },
};

export default colors;
