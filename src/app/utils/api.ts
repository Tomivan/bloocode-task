const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (page: number) => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
    if(!response.ok) throw new Error("Failed to fetch movies");
    return response.json();
};

export const fetchMovieDetails = async (id: string) => {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
    if(!response.ok) throw new Error("Failed to fetch movie details");
    return response.json();
}