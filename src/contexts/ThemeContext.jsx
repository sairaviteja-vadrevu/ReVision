import { createContext, useContext, useState, useEffect } from "react";

// Define theme colors
export const themes = {
  default: {
    name: "Default",
    primary: "#111",
    secondary: "#445069",
    gradient: "linear-gradient(135deg, #111 0%, #445069 100%)",
    color: "#445069",
    preview: ["#111", "#445069"]
  },
  ocean: {
    name: "Ocean",
    primary: "#0d1b2a",
    secondary: "#2563eb",
    gradient: "linear-gradient(135deg, #0d1b2a 0%, #2563eb 100%)",
    color: "#2563eb",
    preview: ["#0d1b2a", "#2563eb"]
  },
  sunset: {
    name: "Sunset",
    primary: "#7c2d12",
    secondary: "#f97316",
    gradient: "linear-gradient(135deg, #7c2d12 0%, #f97316 100%)",
    color: "#f97316",
    preview: ["#7c2d12", "#f97316"]
  },
  forest: {
    name: "Forest",
    primary: "#14532d",
    secondary: "#16a34a",
    gradient: "linear-gradient(135deg, #14532d 0%, #16a34a 100%)",
    color: "#16a34a",
    preview: ["#14532d", "#16a34a"]
  },
  lavender: {
    name: "Lavender",
    primary: "#581c87",
    secondary: "#a855f7",
    gradient: "linear-gradient(135deg, #581c87 0%, #a855f7 100%)",
    color: "#a855f7",
    preview: ["#581c87", "#a855f7"]
  },
  rose: {
    name: "Rose",
    primary: "#881337",
    secondary: "#e11d48",
    gradient: "linear-gradient(135deg, #881337 0%, #e11d48 100%)",
    color: "#e11d48",
    preview: ["#881337", "#e11d48"]
  },
  midnight: {
    name: "Midnight",
    primary: "#0c0a09",
    secondary: "#374151",
    gradient: "linear-gradient(135deg, #0c0a09 0%, #374151 100%)",
    color: "#374151",
    preview: ["#0c0a09", "#374151"]
  },
  cosmic: {
    name: "Cosmic",
    primary: "#1e1b4b",
    secondary: "#7c3aed",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #7c3aed 100%)",
    color: "#7c3aed",
    preview: ["#1e1b4b", "#7c3aed"]
  }
};

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("default");

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("revision-theme");
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("revision-theme", currentTheme);
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    themes,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;