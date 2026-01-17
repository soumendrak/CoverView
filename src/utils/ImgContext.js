import React, { createContext, useState } from "react";
const ImgContext = createContext();

const ImgProvider = ({ children }) => {
  const [unsplashImage, setUnsplashImage] = useState();
  const [searchQuery, setSearchQuery] = useState('setup');
    
  return (
    <ImgContext.Provider value={{ unsplashImage, setUnsplashImage, searchQuery, setSearchQuery }}>
      {children}
    </ImgContext.Provider>
  );
};

export {ImgProvider, ImgContext}