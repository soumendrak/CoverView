import React, { createContext, useState } from "react";
const ImgContext = createContext();

const ImgProvider = ({ children }) => {
  const [unsplashImage, setUnsplashImage] = useState();
  const [searchQuery, setSearchQuery] = useState('setup');
  const [scrollPosition, setScrollPosition] = useState(0);
    
  return (
    <ImgContext.Provider value={{ unsplashImage, setUnsplashImage, searchQuery, setSearchQuery, scrollPosition, setScrollPosition }}>
      {children}
    </ImgContext.Provider>
  );
};

export {ImgProvider, ImgContext}