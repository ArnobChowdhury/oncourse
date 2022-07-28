import { useState, ChangeEvent } from "react";
import Button from "../Button";
import Select from "../Select";
import style from "./style.module.css";

interface ControlProps {
  writePost: () => void;
  onCategorySelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  categoryVal: string;
}

const Control = ({
  writePost,
  onCategorySelect,
  categoryVal,
}: ControlProps) => {
  return (
    <div className={style.wrapper}>
      <Select
        defaultText="Linux"
        options={[
          { value: "linux", text: "Linux" },
          { value: "python", text: "Python" },
          { value: "javascript", text: "Javascript" },
        ]}
        value={categoryVal}
        onChange={onCategorySelect}
      />
      <Button onClick={writePost} text="Create Post" />
    </div>
  );
};

export default Control;
