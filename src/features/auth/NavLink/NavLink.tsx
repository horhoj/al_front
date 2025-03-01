import { NavLink as RouterNavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './NavLink.module.scss';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}
export function NavLink({ to, children, onClick }: NavLinkProps) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) => classNames(styles.NavLink, isActive && styles.active)}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </RouterNavLink>
  );
}
