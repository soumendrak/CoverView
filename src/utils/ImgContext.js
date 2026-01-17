import React, { createContext, useState } from "react";
const ImgContext = createContext();

const ImgProvider = ({ children }) => {
  const [unsplashImage, setUnsplashImage] = useState();
  const [searchQuery, setSearchQuery] = useState('setup');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [cachedImages, setCachedImages] = useState([]);
  const [cachedPage, setCachedPage] = useState(1);
  const [cachedTotalPages, setCachedTotalPages] = useState(1);
    
  return (
    <ImgContext.Provider value={{ 
      unsplashImage, setUnsplashImage, 
      searchQuery, setSearchQuery, 
      scrollPosition, setScrollPosition,
      cachedImages, setCachedImages,
      cachedPage, setCachedPage,
      cachedTotalPages, setCachedTotalPages
    }}>
      {children}
    </ImgContext.Provider>
  );
};

export {ImgProvider, ImgContext}