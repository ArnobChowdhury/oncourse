import styles from "./style.module.css";

interface BackProps {
  onClick: () => void;
}

const Back = ({ onClick }: BackProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper} onClick={onClick}>
        <svg
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 486.975 486.975"
          width="24px"
          height="24px"
        >
          <g>
            <path
              d="M473.475,230.025h-427.4l116-116c5.3-5.3,5.3-13.8,0-19.1c-5.3-5.3-13.8-5.3-19.1,0l-139,139c-5.3,5.3-5.3,13.8,0,19.1
		l139,139c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1l-116-116h427.5c7.5,0,13.5-6,13.5-13.5
		S480.975,230.025,473.475,230.025z"
            />
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>
      </div>
    </div>
  );
};

export default Back;
