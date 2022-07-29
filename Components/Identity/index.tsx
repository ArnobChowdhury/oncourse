import styles from "./style.module.css";

interface IdentityProps {
  username: string;
}

const Identity = ({ username }: IdentityProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.userimgcontainer}>
        <img
          alt={`Icon`}
          src="https://img.icons8.com/small/32/000000/user.png"
        />
      </div>
      <div className={styles.username}>{username}</div>
    </div>
  );
};

export default Identity;
