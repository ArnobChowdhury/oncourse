import styles from "./style.module.css";
import Button from "../Button";

interface TopBarProps {
  onClick: () => void;
  user?: { [key: string]: any };
}

const TopBar = ({ onClick, user }: TopBarProps) => {
  return (
    <nav className={styles.topbar}>
      {!user && <Button onClick={onClick} text={"Sign in"} />}
      {user && <div>Signed in as {user.details?.profile?.username}</div>}
    </nav>
  );
};

export default TopBar;
