import { useEffect } from "react";

const TmdbBackdrop = (props) => {
  // Define the sizes for the srcset
  const sizes = `
    (max-width: 600px) 280px,
    (max-width: 900px) 540px,
    (max-width: 1200px) 800px,
    (max-width: 1800px) 1200px,
    1800px
  `;
// useEffect(()=>{console.log(props.backdropPath)},[])
  // Build the srcset with different widths
  const srcset = `
    https://image.tmdb.org/t/p/w300/${props.backdropPath} 300w,
    https://image.tmdb.org/t/p/w780/${props.backdropPath} 780w,
    https://image.tmdb.org/t/p/w1280/${props.backdropPath} 1280w,
    https://image.tmdb.org/t/p/original/${props.backdropPath} 1920w
  `;

  // Set the default width for the image container
  const containerStyle = {
    width: '100%', // Set your preferred width
    margin: '0 auto', // Center the container
  };

  return (
    <div style={containerStyle}>
      <img
        src={`https://image.tmdb.org/t/p/original/${props.backdropPath}`}
        srcSet={srcset}
        sizes={sizes}
        alt="Backdrop Image"
        style={{ width: '70vw', height: 'auto' }}
      />
    </div>
  );
};

export default TmdbBackdrop;
