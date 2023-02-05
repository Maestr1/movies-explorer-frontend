import { Link } from 'react-router-dom';
import "./ErrorPage.css"

export default function ErrorPage() {

  return (
    <div className="error-page">
      <h1 className="error-page__title">404</h1>
      <h2 className="error-page__subtitle">Страница не найдена</h2>
      <Link aria-label="Сылка на предыдущую страницу" className="error-page__back-link link" to='/'>Назад</Link>
    </div>
  );
}
