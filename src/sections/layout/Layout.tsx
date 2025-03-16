import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import Brand from "./brand.svg";

export function Layout() {
  return (
    <>
      <header className={styles.header}>
        <section className={styles.header__container}>
          <img src={Brand} alt='' />
          <h1 className={styles.app__brand}>DevDash_</h1>
        </section>
      </header>
      <Outlet />
    </>
  );
}
