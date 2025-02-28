import { useEffect } from 'react';
import styles from './App.module.scss';
import { axiosInstance } from '~/api/apiTransport';

export function App() {
  useEffect(() => {
    axiosInstance({ method: 'get', url: '/todos' }).then((res) => console.log(res.data));
  }, []);

  return (
    <>
      <div className={styles.App}>App: React + scss</div>
    </>
  );
}
