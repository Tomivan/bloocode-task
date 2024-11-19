"use client";

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMovies } from "../utils/api";
import Link from "next/link";
import SkeletonLoader from "../components/SkeletonLoader";

const HomePage = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(true);

    const loadMovies = async () => {
        try {
            setLoading(true);
            const data = await fetchMovies(page);
            setMovies((prevMovies) => [...prevMovies, ...data.results])
            setHasMore(data.page < data.total_pages);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadMovies();
    }, [page]);

    const fetchNextMovies = () => setPage((prevPage) => prevPage + 1)

    return (
        <div className="p-4">
            <input type="text" placeholder="Find a movie" value={search} onChange={(e) => setSearch(e.target.value)}
            className="p-2 border w-full mb-4" />
            {loading && page === 1 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {Array(10)
                     .fill(0)
                     .map((_, index) => (
                        <div key={index} className="space-y-2">
                            <SkeletonLoader className="h-64 w-full" />
                            <SkeletonLoader className="h-6 w-3/4" />
                            <SkeletonLoader className="h-4 w-1/2" />
                        </div>
                     ))}
                </div>
            ) : (
                <InfiniteScroll
                  dataLength={movies.length}
                  next={fetchNextMovies}
                  hasMore={hasMore}
                  loader={<p className="text-center">Loading more movies...</p>}
                  endMessage={<p className="text-cneter"> You have seen all the movies!</p>}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {movies.map((movie: any) => (
                            <Link href={`/movie/${movie.id}`} key={movie.id} className="block">
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                <h2 className="mt-2 font-bold">{movie.title}</h2>
                                <p>Release Date: {movie.release_date}</p>
                                <p>Rating: {movie.vote_average}</p>
                            </Link>
                        ))}
                    </div>
            </InfiniteScroll>
            )}
        </div>
    )
}

export default HomePage;