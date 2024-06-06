import { createContext, useContext, useEffect, useState } from "react";

const webContext = createContext();

export default function useWebContext() {
  return useContext(webContext);
}

export const WebContext = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  const theme = darkMode ? "dark" : "light";
  const contextValue = { toggleTheme };
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [darkMode]);
  return (
    <webContext.Provider value={contextValue}>{children}</webContext.Provider>
  );
};
