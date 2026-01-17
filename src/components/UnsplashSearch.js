import React, { useState, useEffect, useLayoutEffect, useContext, useRef } from 'react';
import unsplash from '../utils/unsplashConfig';
import { ImgContext } from '../utils/ImgContext';

const UnsplashSearch = ({ largeImgPreview }) => {

    const [imageList, setImageList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const { setUnsplashImage, searchQuery, setSearchQuery, scrollPosition, setScrollPosition } = useContext(ImgContext);
    const scrollContainerRef = useRef(null);
    const shouldRestoreScroll = useRef(scrollPosition > 0);

    const IMAGES_PER_PAGE = 30;

    const searchImages = (query, page = 1, append = false) => {
        setIsLoading(true);
        unsplash.search
            .getPhotos({
                query: query,
                page: page,
                per_page: IMAGES_PER_PAGE,
                // orientation:'portrait'


            })
            .then(response => {
                // console.log(response.response.results);
                const results = response.response.results;
                const total = response.response.total_pages;
                
                if (append) {
                    setImageList(prev => [...prev, ...results]);
                } else {
                    setImageList(results);
                }
                setTotalPages(total);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }

    const loadMoreImages = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        searchImages(searchQuery, nextPage, true);
    }


    const selectImage = (image) => {
        // Save scroll position before selecting image
        if (scrollContainerRef.current) {
            setScrollPosition(scrollContainerRef.current.scrollTop);
        }
        
        setUnsplashImage({
            url: image.urls.regular,
            name: image.user.name,
            avatar: image.user.profile_image.small,
            profile: `${image.user.links.html}?utm_source=https://coverview.vercel.app&utm_medium=referral`,
            downloadLink: image.links.download_location

        })


    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Reset scroll position and page when searching for new images
        setScrollPosition(0);
        setCurrentPage(1);
        searchImages(searchQuery, 1, false);

    }

    useEffect(() => {
        // Use the persisted searchQuery from context
        setCurrentPage(1);
        searchImages(searchQuery, 1, false);
    }, [searchQuery])

    // Restore scroll position synchronously before paint using useLayoutEffect
    useLayoutEffect(() => {
        if (scrollContainerRef.current && shouldRestoreScroll.current && scrollPosition > 0) {
            scrollContainerRef.current.scrollTop = scrollPosition;
            shouldRestoreScroll.current = false;
        }
    }, [imageList, scrollPosition])

    return (
        <div className='w-full h-full'>
            <div className="flex flex-col p-2  bg-white items-center justify-center">

                <div className="flex items-center w-full px-6 ">
                    <form onSubmit={(e) => handleSearchSubmit(e)} className=" mx-auto w-full flex bg-gray-50 rounded-full border border-gray-50 mb-2">
                        <input type="text"
                            value={searchQuery}
                            placeholder="Search photos"
                            className="focus:outline-none w-full text-lg bg-gray-50  p-1 px-4  rounded-full  "
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <button type="submit" onClick={() => searchImages(searchQuery)}>
                            <svg className="w-9 h-9 ml-auto  p-2 bg-gray-700 hover:bg-gray-800 text-white rounded-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                    </form>

                </div>


                <div 
                    ref={scrollContainerRef}
                    className="overflow-y-scroll w-full pb-12 overflow-x-hidden h-max justify-center flex flex-wrap"
                >
                    {
                        imageList.map(image => {
                            return <div key={image.id}
                                className={`rounded-lg relative cursor-pointer m-1 ${largeImgPreview ? ' h-44 w-60' : 'h-24 w-40'
                                    }`}
                            >
                                <span className="font-Inter top-2 left-2 absolute text-sm font-semibold text-white opacity-50 ">Click to Select</span>
                                <img src={image.urls.regular}
                                    alt={image.alt_description}
                                    onClick={() => selectImage(image)
                                    }
                                    className="rounded-lg object-cover h-full w-full"
                                />
                            </div>
                        })
                    }
                    
                    {/* Load More Button */}
                    {imageList.length > 0 && currentPage < totalPages && (
                        <div className="w-full flex justify-center py-4">
                            <button
                                onClick={loadMoreImages}
                                disabled={isLoading}
                                className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Loading...' : 'Load More Images'}
                            </button>
                        </div>
                    )}
                    
                    {/* Loading indicator for initial load */}
                    {isLoading && imageList.length === 0 && (
                        <div className="w-full flex justify-center py-8">
                            <span className="text-gray-500">Loading images...</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UnsplashSearch;