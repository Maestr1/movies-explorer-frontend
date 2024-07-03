import React from 'react';
import styled from 'styled-components';

const Cover = styled.img`
  width: 100%;
  border-radius: 10px;
  height: 80vh;
`

function CoverPopup(props) {
  return (
    <div>
      <Cover src={props.selectedMovie.posterUrl} alt={`Обложка фильма ${props.selectedMovie.nameRu}`}/>
    </div>
  );
}

export default CoverPopup;
