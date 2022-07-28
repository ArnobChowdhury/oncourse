import styles from "./style.module.css";
import Button from "../Button";
import { ChangeEvent } from "react";

interface ReplyPostProps {
  onReply: () => void;
  onReplyValChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  isReplying: boolean;
}

const ReplyPost = ({
  value,
  onReplyValChange,
  onReply,
  isReplying,
}: ReplyPostProps) => {
  return (
    <div className={styles.replypost} id="create-post">
      <textarea
        className={styles.inputbody}
        value={value}
        onChange={onReplyValChange}
        disabled={isReplying}
      />
      <Button loading={isReplying} text="Reply" onClick={onReply} />
    </div>
  );
};

export default ReplyPost;
