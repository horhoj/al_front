import { useEffect } from 'react';
import styles from './App.module.scss';
import { AppSpinner } from './AppSpinner';
import { Nav } from '~/features/auth/Nav';
import { Router } from '~/router/Router';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { authSlice } from '~/features/auth/authSlice';

export function App() {
  const dispatch = useAppDispatch();
  const checkTokenRequest = useAppSelector((state) => state.auth.checkTokenRequest);
  useEffect(() => {
    dispatch(authSlice.thunks.checkTokenThunk());
  }, []);

  return (
    <>
      <AppSpinner />
      <div className={styles.App}>
        {checkTokenRequest.isLoading && <main className={styles.main}>Check token...</main>}
        {!checkTokenRequest.isLoading && (
          <>
            <header className={styles.header}>
              <Nav />
            </header>
            <main className={styles.main}>
              <Router />
            </main>
          </>
        )}
      </div>
    </>
  );
}
