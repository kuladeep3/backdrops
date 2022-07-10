import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";
import { Fragment } from "react";
const Backdrops = ({ data, config }) => {
  if (!data?.backdrops) {
    return (
      <div className='imagesContainer'>
        <Typography variant='body' align='center' gutterBottom paragraph>
          No wallpapers found :)
        </Typography>
      </div>
    );
  }
  return (
    <section className='imagesContainer'>
      <div className='wallsFlex'>
        {data?.backdrops?.map((backdrop) => {
          return (
            <div key={backdrop.file_path} className='wall'>
              <Image src={`${config.base_url}original${backdrop.file_path}`} width={backdrop.width} height={backdrop.height} layout='responsive' alt='wallpaper' />
              <Button variant='contained' size='small' href={`${config.base_url}original${backdrop.file_path}`} target='_blank'>
                Download
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Backdrops;
