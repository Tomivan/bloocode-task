import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../../utils/api";
import SkeletonLoader from "@/app/components/SkeletonLoader";

const MovieDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [movie, setMovie] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const loadMovie = async () => {
            try {
                setLoading(true);
                const data = await fetchMovieDetails(id as string);
                setMovie(data);
            } catch (error) {
                console.error("Failed to fetch movie details:", error);
            } finally{
                setLoading(false)
            }
        };
        loadMovie();
    }, [id]);

    if (loading) {
        return (
            <div className="p-4 space-y-4">
                <SkeletonLoader className="h-64 w-full" />
                <SkeletonLoader className="h-8 w-3/4" />
                <SkeletonLoader className="h-6 w-1/2" />
                <SkeletonLoader className="h-4 w-full" count={3}/>
            </div> 
        )
    }
    if(!movie) return <p>Movie not found</p>
    return (
        <div className="p-4">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>Genres: {movie.genres.map((g: any) => g.name).join(", ")}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
        </div>
    );
};

export default MovieDetails;