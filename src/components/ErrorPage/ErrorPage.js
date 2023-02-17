import { useNavigate } from 'react-router-dom';
import './ErrorPage.css';

export default function ErrorPage() {

  let navigate = useNavigate();

  return (
    <main>
      <section className="error-page">
        <h1 className="error-page__title">404</h1>
        <h2 className="error-page__subtitle">Страница не найдена</h2>
        <button onClick={() => navigate(-1)} aria-label="Сылка на предыдущую страницу"
                className="error-page__back-link btn">Назад
        </button>
      </section>
    </main>
  );
}
