import AsyncSelect from "react-select/async";

const SearchBar = ({ onSelect }) => {
  const fetchMovies = async (inputValue) => {
    try {
      const responseData = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${inputValue}`);
      if (!responseData) {
        throw new Error("No data");
      }
      const response = await responseData.json();
      return response;
    } catch (e) {}
  };

  const fetchData = (inputValue) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (inputValue.trim() === "") {
          throw new Error("Something went wrong");
        }
        const responseData = await fetchMovies(inputValue);
        if (!responseData?.results) {
          throw new Error("Something went wrong");
        }
        const returnData = responseData.results.map((movie) => {
          return {
            value: movie.id,
            label: movie.title,
          };
        });
        resolve(returnData);
      } catch (error) {
        reject(error.message);
      }
    });
  };

  const handleMovieSelect = (movie) => {
    onSelect(movie);
  };
  return (
    <>
      <AsyncSelect placeholder='Enter a movie name' cacheOptions loadOptions={fetchData} onChange={handleMovieSelect} />
    </>
  );
};

export default SearchBar;
