import { Link, Outlet } from 'react-router-dom';

import Brand from "./brand.svg";
import { ErrorBoundary } from './ErrorBoundary';
import styles from './Layout.module.scss';

export function Layout() {
  return (
    <>
      <header className={styles.header}>
        <section className={styles.header__container}>
          <a href='https://codely.com'>
            <img src={Brand} alt='' />
          </a>
          <Link to={`/`}>
            <h1 className={styles.app__brand}>DevDash_</h1>
          </Link>
        </section>
      </header>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </>
  );
}
