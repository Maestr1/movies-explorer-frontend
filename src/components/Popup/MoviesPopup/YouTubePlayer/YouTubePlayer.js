import React from 'react';
import './YouTubePlayer.css'

function YouTubePlayer({ id }) {
  return (
    <iframe className='youtube-player' width="100%"  src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player" frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen></iframe>
  );
}

export default YouTubePlayer;
