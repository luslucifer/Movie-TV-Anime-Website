import { useState } from 'react';
import './style/cast.css';

function Cast(props) {
  const [imageLoaded, setImageLoaded] = useState(true);

  const handleImageError = () => {
    setImageLoaded(false);
  };

  if (!imageLoaded) {
    return null; // Do not render the component if the image has failed to load
  }

  const objx = props.obj;

  return (
    <li className="cast">
      <img
      className='castImg'
        src={`https://image.tmdb.org/t/p/original/${props.obj.profile_path}`}
        alt=""
        srcSet={props.srcSet}
        sizes={props.sizes}
        onError={handleImageError}
      />
      <h3 className="name">{objx.name}</h3>
      <h4 className="character">{objx.character}</h4>
    </li>
  );
}

export default Cast;
