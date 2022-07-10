import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import bgImage from "../public/images/background.webp";
import Image from "next/image";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import Backdrops from "../components/Backdrops";
export default function Home({ configData }) {
  const [backdrops, setBackdrops] = useState(null);
  const fetchBackdrops = async (id) => {
    const resposneData = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
    const response = await resposneData.json();
    setBackdrops(response);
  };
  const handleMovieSelected = (movie) => {
    fetchBackdrops(movie.value);
  };
  return (
    <>
      <div className='bgWrap'>
        <Image src={bgImage} layout='fill' objectFit='cover' quality={100} alt='bg' />
      </div>
      <Container>
        <Typography variant='h2' component='h1' align='center' gutterBottom>
          Movie Walls
        </Typography>
        <Typography variant='body' align='center' gutterBottom paragraph>
          One destination for film wallpapers
        </Typography>
        <SearchBar onSelect={handleMovieSelected} />
        {backdrops && <Backdrops data={backdrops} config={configData} />}
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const configData = {};
  try {
    const responseData = await fetch("https://api.themoviedb.org/3/configuration?api_key=61b9ae9006a919c803f39f6122ae4686");
    const response = await responseData.json();
    if (response?.images?.base_url) {
      configData.base_url = response.images.base_url;
      configData.image_size = "original";
    }
  } catch (e) {
    throw new Error(e?.message);
  }
  return {
    props: {
      configData,
    },
  };
}
