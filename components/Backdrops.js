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
              <Button variant='text' size='small' href={`${config.base_url}original${backdrop.file_path}`} download>
                <svg xmlns='http://www.w3.org/2000/svg' enableBbackground='new 0 0 24 24' height='36px' viewBox='0 0 24 24' width='36px' fill='#fff'>
                  <g>
                    <rect fill='none' height='24' width='24' />
                  </g>
                  <g>
                    <path d='M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z' />
                  </g>
                </svg>
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Backdrops;
