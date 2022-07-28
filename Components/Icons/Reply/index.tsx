import styles from "./style.module.css";

interface ReplyIconProps {
  onClick: () => void;
}

const ReplyIcon = ({ onClick }: ReplyIconProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.306 2.146l-4.02 4.02v.708l4.02 4.02.708-.707L3.807 6.98H5.69c2.813 0 4.605.605 5.705 1.729 1.102 1.125 1.615 2.877 1.615 5.421v.35h1v-.35c0-2.646-.527-4.72-1.9-6.121C10.735 6.605 8.617 5.98 5.69 5.98H3.887l3.127-3.126-.708-.708z"
        />
      </svg>
    </div>
  );
};

export default ReplyIcon;
