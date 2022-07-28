import styles from "./style.module.css";

interface LoaderProps {
  bigloader?: boolean;
}

const Loader = ({ bigloader }: LoaderProps) => {
  let className = styles.loader;
  if (bigloader) {
    className = styles.loaderbig;
  }
  return <div className={className}></div>;
};

export default Loader;
