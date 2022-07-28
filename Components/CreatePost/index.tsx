import styles from "./style.module.css";
import Button from "../Button";
import { useState } from "react";
import Select from "../Select";

export type SelectedCategoryType = "linux" | "javascript" | "python";

interface CreatePostProps {
  onPostSubmission: (
    postHeader: string,
    selectedCategory: SelectedCategoryType,
    postBody: string
  ) => void;
  isSubmitting: boolean;
}

const CreatePost = ({ onPostSubmission, isSubmitting }: CreatePostProps) => {
  const [postHeader, setPostHeader] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    SelectedCategoryType | ""
  >("");
  const [postBody, setPostBody] = useState("");

  const handlePostSubmission = () => {
    if (postHeader && selectedCategory && postBody) {
      onPostSubmission(postHeader, selectedCategory, postBody);
      setPostHeader("");
      setPostBody("");
      setSelectedCategory("");
    } else {
      alert("All three fields are required");
    }
  };

  return (
    <div className={styles.createpost} id="create-post">
      <input
        type="text"
        placeholder="What is the discussion about?"
        className={styles.inputheading}
        value={postHeader}
        onChange={(event) => setPostHeader(event.currentTarget.value)}
        disabled={isSubmitting}
      />
      <Select
        defaultText="Choose a category"
        options={[
          { value: "linux", text: "Linux" },
          { value: "python", text: "Python" },
          { value: "javascript", text: "Javascript" },
        ]}
        fullWidth
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.currentTarget.value as SelectedCategoryType);
        }}
        disabled={isSubmitting}
      />
      <textarea
        className={styles.inputbody}
        value={postBody}
        onChange={(e) => setPostBody(e.currentTarget.value)}
        disabled={isSubmitting}
      />
      <Button
        loading={isSubmitting}
        text="Create post"
        onClick={handlePostSubmission}
      />
    </div>
  );
};

export default CreatePost;
