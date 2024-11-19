import {createContext, useContext, useState } from 'react';

const FavouritesContext = createContext<any>(null);

export const FavouritesProvider = ({ children }: any) => {
    const [favourites, setFavourites] = useState<string[]>(() =>
        JSON.parse(localStorage.getItem("favourites") || '[]')
    );

    const addFavourite = (id: string) => {
        const updated = [...favourites, id];
        setFavourites(updated);
        localStorage.setItem("favourites", JSON.stringify(updated));
    };

    const removeFavourite = (id: string) => {
        const updated = favourites.filter((fav) => fav !== id);
        setFavourites(updated);
        localStorage.setItem("favourites", JSON.stringify(updated))
    };

    return (
        <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
            {children}
        </FavouritesContext.Provider>
    )
}

export const useFavourites = () => useContext(FavouritesContext);