import styles from "./style.module.css";
import Loader from "../Loader";

interface ButtonProps {
  text: string;
  onClick: () => void;
  loading?: boolean;
}

const Button = ({ text, onClick, loading = false }: ButtonProps) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {!loading && text}
      {loading && <Loader />}
    </button>
  );
};

export default Button;
