import { useFavourites } from "../contexts/FavouriteContext";

const Favourites = () => {
    const { favourites } = useFavourites();

    if ( favourites.length ===  0) return <p>No favourite movie yet</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Favourite Movies</h1>
            <ul>
                {favourites.map((id: string) => (
                    <li key={id}>{id}</li>
                ))}
            </ul>
        </div>
    )
}

export default Favourites;