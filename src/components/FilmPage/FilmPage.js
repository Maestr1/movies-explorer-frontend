import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Link, useParams} from 'react-router-dom';
import kinopoiskApi from '../../utils/KinopoiskApi';
import YouTubePlayer from '../Popup/MoviesPopup/YouTubePlayer/YouTubePlayer';

const Section = styled.section`
  width: 100%;
  padding-inline: 70px;
  padding-top: 40px;
  display: flex;
`;

const PosterWrapper = styled.div`
  padding-right: 14px;
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 14px;
  border-right: 1px solid #565656;
`;
const DetailsWrapper = styled.div`
  padding-left: 14px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
  width: 70%;
`;

const Poster = styled.img`
  border-radius: 10px;
`;

const Title = styled.h1`
  padding-bottom: 30px;
  margin: 0;
  font-weight: 500;
  font-size: 24px;
`;

const Detail = styled.p`
  margin: 0;
`;

const Description = styled.p`
  margin: 0;
  padding-top: 20px;
  font-size: 14px;
  text-align: left;
`;

const Links = styled.div`
  padding-top: 30px;
  display: flex;
  width: 100%;
  gap: 10px;
  max-height: 50px;
`;

const StyledLink = styled(Link)`
  background: linear-gradient(135deg, #f50 69.91%, #d6bb00);
  border: 0 solid transparent;
  border-radius: 100px;
  color: #fff;
  padding: 15px 26px 15px 22px;
  font-weight: 600;
  max-width: 300px;
  box-sizing: border-box;
  text-align: center;
  font-size: 18px;
`;

const SaveBtn = styled.button`
  border-radius: 50%;
  width: 50px;
  background: url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='30' height='30' rx='15' fill='%23313131'/%3E%3Cpath d='M10.5 9.9C10.5 9.40294 10.9029 9 11.4 9H18.6C19.0971 9 19.5 9.40294 19.5 9.9V20.4789C19.5 20.5552 19.418 20.6034 19.3513 20.5662L16.2168 18.8198C15.4603 18.3984 14.5397 18.3984 13.7832 18.8198L10.6487 20.5662C10.582 20.6034 10.5 20.5552 10.5 20.4789V9.9Z' stroke='%23424242'/%3E%3C/svg%3E%0A") no-repeat center center;
  transition: background .3s ease-in-out, opacity .3s ease-in-out;
`;

function FilmPage(props) {

  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [videos, setVideos] = useState({});
  const [staff, setStaff] = useState({});

  useEffect(() => {
    Promise.all([kinopoiskApi.getMovie(id), kinopoiskApi.getVideos(id), kinopoiskApi.getStaff(id)])
      .then((res) => {
        setMovie(res[0]);
        setVideos(res[1]);
        setStaff(res[2]);
      });
  }, [id]);

  useEffect(() => {
    console.log(movie);
  }, [movie]);

  useEffect(() => {
    if (staff.length > 0) {
      staffConstructor();
    }
  }, [staff]);

  function staffConstructor() {
    const directors = staff.filter(item => item.professionKey === 'DIRECTOR').map(item => item.nameRu).join(', ');
    const actors = staff.filter(item => item.professionKey === 'ACTOR').map(item => item.nameRu);
    const writers = staff.filter(item => item.professionKey === 'WRITER').map(item => item.nameRu);
    const producers = staff.filter(item => item.professionKey === 'PRODUCER');
    setMovie(prevState => ({
      ...prevState, directors: directors, actors: actors, writers: writers, producers: producers
    }));
  }

  function extractID() {
    if (videos && videos.items) {
      try {
        const urlObj = new URL(videos.items.find(item => item.site === 'YOUTUBE' && (item.name.indexOf('Трейлер') !== -1 || item.name.indexOf('трейлер') !== -1 || item.name.indexOf('ТВ-ролик') !== -1)).url);
        if (urlObj.hostname === 'youtu.be') {
          return urlObj.pathname.slice(1);
        } else if (urlObj.hostname.includes('youtube')) {
          if (urlObj.pathname.includes('/v/')) {
            console.log('ok');
            return urlObj.pathname.slice(3);
          }
          const params = urlObj.searchParams;
          console.log(params.get('v'));
          // Интуитивно понятный запрос идентификатора видео
          return params && params.get('v');
        }
        return false;
      } catch (e) {
        return false; // Если не удалось проанализировать URL, то выходим с ложным результатом
      }
    }

  }

  function genresConstructor() {
    if (movie.genres) {
      return movie.genres.map(item => item.genre).join(', ');
    }
  }

  function countriesConstructor() {
    if (movie.countries) {
      return movie.countries.map(item => item.country).join(', ');
    }
  }

  function getTimeFromMinutes(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    return hours + 'ч ' + minutes + 'м';
  }

  return (
    <Section>
      <PosterWrapper>
        <Poster src={movie.posterUrlPreview} alt=""/>
        {extractID() && <YouTubePlayer id={extractID()}/>}
      </PosterWrapper>
      <DetailsWrapper>
        <Title>{movie.nameRu}</Title>
        <Detail>{`Год производства: ${movie.year}`}</Detail>
        {movie.countries && <Detail>{`Страна: ${countriesConstructor()}`}</Detail>}
        <Detail>{`Жанр: ${genresConstructor()}`}</Detail>
        {movie.directors && <Detail>{`Режисер: ${movie.directors}`}</Detail>}
        {movie.writers &&
          <Detail>{`Сценарий: ${movie.writers.length > 3 ? movie.writers.slice(0, 3).join(', ') + ', ' : movie.writers.join(', ')}`}
            {movie.writers.length > 3 && <Link className="link" to="#">...</Link>}</Detail>}
        {movie.actors &&
          <Detail>{`Актеры: ${movie.actors.length > 5 ? movie.actors.slice(0, 5).join(', ') + ', ' : movie.actors.join(', ')}`}
            {movie.actors.length > 3 && <Link className="link" to="#">...</Link>}</Detail>}
        {movie.ratingImdb && <Detail>{`Рейтинг IMDb: ${movie.ratingImdb}`}</Detail>}
        {movie.ratingKinopoisk &&
          <Detail>{`Рейтинг Кинопоиска: ${movie.ratingKinopoisk}`}</Detail>}
        {(!movie.ratingImdb && !movie.ratingKinopoisk) &&
          <Detail>{`Рейтинг ожидания: ${movie.ratingAwait}%`}</Detail>}
        {movie.filmLength &&
          <Detail>{`Продолжительность: ${getTimeFromMinutes(movie.filmLength)}`}</Detail>}
        <Description>{movie.description}</Description>
        <Links>
          <StyledLink to={movie.webUrl} target="_blank" className="btn">Открыть на Кинопоиске</StyledLink>
          <SaveBtn className="btn"></SaveBtn>
        </Links>
      </DetailsWrapper>
    </Section>
  );
}

export default FilmPage;
