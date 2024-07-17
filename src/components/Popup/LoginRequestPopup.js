import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Popup = styled.div`
  margin: 0 auto;
  display: flex;
  gap: 30px;
  flex-direction: column;
  width: 500px;
  background-color: #202020;
  color: #fff;
  padding: 30px;
  border-radius: 10px;

  
  @media (max-width: 576px) {
    width: 80%;
  }
`;

const Label = styled.p`
  margin: 0;
  text-align: center;
  @media (max-width: 576px) {
    font-size: 12px;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  font-size: 12px;  
  @media (max-width: 576px) {
  font-size: 10px;
}
`;

const LoginLink = styled(Link)`
  text-align: center;
  color: #F50;
  font-size: 16px;
  font-weight: 500;  
  @media (max-width: 576px) {
  font-size: 12px;
}
`;

const RegisterLink = styled(Link)`
  text-align: center;
  color: #F50;
  font-weight: 500;
  font-size: 12px;
  @media (max-width: 576px) {
    font-size: 10px;
  }
`;

function LoginRequestPopup(props) {
  return (
    <Popup>
      <Label><LoginLink className="btn" to="/signin">Войдите</LoginLink>, чтобы сохранять и просматривать избранные
        фильмы и сериалы</Label>
      <LinkWrapper>
        <span>Ещё не зарегистрированы?</span>
        <RegisterLink aria-label="Сылка на страницу входа" to="/signin"
                      className="btn">Зарегестрироваться</RegisterLink>
      </LinkWrapper>
    </Popup>
  );
}

export default LoginRequestPopup;
