import styles from "./style.module.css";
import Button from "../Button";
import { shortendDid } from "../../utils";

interface TopBarProps {
  onClick: () => void;
  user?: { [key: string]: any };
}

const TopBar = ({ onClick, user }: TopBarProps) => {
  const username = user?.details?.profile?.username;
  const did = user?.did;

  return (
    <nav className={styles.topbar}>
      {!user && <Button onClick={onClick} text={"Sign in"} />}
      {user && <div>Signed in as {username ? username : shortendDid(did)}</div>}
    </nav>
  );
};

export default TopBar;
