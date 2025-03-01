import styles from './Avatar.module.scss';

interface AvatarProps {
  src: string;
}
export function Avatar({ src }: AvatarProps) {
  return (
    <div className={styles.Avatar}>
      <img src={src} alt="avatar" className={styles.img} />
    </div>
  );
}
