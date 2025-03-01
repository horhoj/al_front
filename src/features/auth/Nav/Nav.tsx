import { useNavigate } from 'react-router-dom';
import { NavLink } from '../NavLink';
import { authSlice } from '../authSlice';
import styles from './Nav.module.scss';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { routes } from '~/router/routes';

export function Nav() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(
      authSlice.thunks.signOutThunk({
        onSuccess: () => {
          navigate(routes.ABOUT_US, { replace: true });
        },
      }),
    );
  };

  return (
    <nav className={styles.Nav}>
      <NavLink to={routes.ABOUT_US}>About us</NavLink>

      {isAuth && <NavLink to={routes.PROFILE}>Profile</NavLink>}

      {!isAuth && <NavLink to={routes.SIGN_IN}>Sign in</NavLink>}

      {isAuth && (
        <NavLink to={routes.SIGN_OUT} onClick={handleSignOut}>
          Sign out
        </NavLink>
      )}
    </nav>
  );
}
