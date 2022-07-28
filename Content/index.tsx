import { ChangeEvent } from "react";
import Control from "../Components/Control";
import styles from "./style.module.css";
import { ReplyIcon, GobackIcon } from "../Components/Icons";
import Loader from "../Components/Loader";

interface ContentProps {
  showModal: () => void;
  posts: { [key: string]: any }[] | null;
  onCategorySelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  categoryVal: string;
  onPostSelect: (post: string) => void;
  shownPost: { [key: string]: any } | null;
  onReplyClick: () => void;
  onGoingBack: () => void;
  shownPostComments: { [key: string]: any }[] | null;
  isLoading: boolean;
}

const Content = ({
  showModal,
  posts,
  categoryVal,
  onCategorySelect,
  onPostSelect,
  shownPost,
  onReplyClick,
  onGoingBack,
  shownPostComments,
  isLoading,
}: ContentProps) => {
  const postBlocks = posts?.map((post) => {
    let body = post.content.body;
    if (body.length > 100) {
      body = body.slice(0, 100).concat("...read more");
    }
    return (
      <div
        key={post.stream_id}
        className={styles.thumbnailblock}
        onClick={() => onPostSelect(post.stream_id)}
      >
        <h4 className={styles.thumbnailheader}>{post.content.header}</h4>
        {body}
      </div>
    );
  });

  function createKey(index: number, str: string) {
    const key = str.slice(0, 3);
    return `${index}-${key}`;
  }

  const handleNewLine = (text: string) => {
    return text.split("\n").map((str, index) => {
      return <p key={createKey(index, str)}>{str}</p>;
    });
  };

  return (
    <div>
      {!shownPost && (
        <>
          <Control
            writePost={showModal}
            onCategorySelect={onCategorySelect}
            categoryVal={categoryVal}
          />
          {!isLoading && <>{postBlocks}</>}
          {isLoading && (
            <div className={styles.loaderwrapper}>
              <Loader bigloader={true} />
            </div>
          )}
        </>
      )}
      {shownPost && (
        <div className={styles.postcontainer}>
          <GobackIcon onClick={onGoingBack} />
          <div className={styles.post}>
            <div className={styles.headercontainer}>
              <h2>{shownPost.content.header} </h2>
              <span className={styles.badge}>{categoryVal}</span>
            </div>
            <div>{handleNewLine(shownPost.content.body)}</div>
            <div className={styles.footer}>
              <ReplyIcon onClick={onReplyClick} />
            </div>
          </div>
          <>
            {shownPostComments?.map((comment, index) => (
              <div
                className={styles.comment}
                key={createKey(index, comment.content.body)}
              >
                {comment.content.body}
              </div>
            ))}
          </>
        </div>
      )}
    </div>
  );
};

export default Content;
