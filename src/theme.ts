import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

// Gradient background colors
const darkNavyGradient = "linear-gradient(to bottom, #030e24, #0a1931)"; // Dark navy gradient

// Responsive typography settings
const typography = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: 12, // Default small size
  h1: { fontSize: "2rem", "@media (min-width:600px)": { fontSize: "2.5rem" } }, // Responsive
  h2: { fontSize: "1.75rem", "@media (min-width:600px)": { fontSize: "2rem" } },
  h3: { fontSize: "1.5rem", "@media (min-width:600px)": { fontSize: "1.75rem" } },
  h4: { fontSize: "1.25rem", "@media (min-width:600px)": { fontSize: "1.5rem" } },
  h5: { fontSize: "1rem", "@media (min-width:600px)": { fontSize: "1.25rem" } },
  h6: { fontSize: "0.875rem", "@media (min-width:600px)": { fontSize: "1rem" } },
  body1: { fontSize: "0.875rem", "@media (min-width:600px)": { fontSize: "1rem" } },
  body2: { fontSize: "0.75rem", "@media (min-width:600px)": { fontSize: "0.875rem" } },
  button: { fontSize: "0.75rem", "@media (min-width:600px)": { fontSize: "0.875rem" } },
};

// Light Theme
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#02040e" },
    secondary: { main: "#030e24" },
    background: { default: darkNavyGradient, paper: "#000002" },
    text: { primary: "#000", secondary: grey[300] },
  },
  typography,
});

// Dark Theme
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#001011" },
    secondary: { main: "#000005" },
    background: { default: "#001011", paper: "#001011" },
    text: { primary: "#f5f5f5", secondary: grey[400] },
  },
  typography,
});
