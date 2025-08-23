const colors = {
  primary: "#8a964c",          // wild-willow 500
  primaryLight: "#b5be7b",     // wild-willow 300
  primaryDark: "#535b30",      // wild-willow 700
  secondary: "#a6b16a",        // wild-willow 400
  secondaryLight: "#dadeb8",   // wild-willow 200
  accent: "#f59e0b",           // keep original accent for contrast
  accentLight: "#fef3c7",      // keep original light accent
  background: "#f6f7ee",       // wild-willow 50
  backgroundSecondary: "#ebedda", // wild-willow 100
  card: "#f6f7edff",              // wild-willow 200
  cardElevated: "#b5be7b",      // wild-willow 300
  text: "#3b4027",              // wild-willow 900
  textLight: "#535b30",         // wild-willow 700
  textMuted: "#6b763a",         // wild-willow 600
  border: "#a6b16a",            // wild-willow 400
  borderLight: "#b5be7b",       // wild-willow 300
  error: "#ef4444",             // keep original red
  success: "#10b981",           // keep original green
  warning: "#f59e0b",           // keep original warning
  info: "#434a2a",              // wild-willow 800
  gradient: {
    primary: ["#b5be7b", "#8a964c"] as const, // light to dark wild-willow
    secondary: ["#dadeb8", "#a6b16a"] as const,
    success: ["#10b981", "#059669"] as const,
    warm: ["#f59e0b", "#ef4444"] as const,
  },
};

export default colors;
