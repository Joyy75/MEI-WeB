import { createContext, useEffect, useState } from "react";
import AOS from "aos";
export const AllContext = createContext();

export const ContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
    }
  }, [darkMode]);

  return (
    <AllContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </AllContext.Provider>
  );
};
