import styles from "./style.module.css";
import { useState, ChangeEvent } from "react";

interface SelectProps {
  defaultText: string;
  options: { value: string; text: string }[];
  fullWidth?: boolean;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

const Select = ({
  defaultText,
  options,
  fullWidth = false,
  onChange,
  value,
}: SelectProps) => {
  return (
    <select
      className={fullWidth ? styles.inputselectfull : styles.inputselect}
      onChange={onChange}
      value={value}
    >
      <option className={styles.hiddenoption} selected disabled value="">
        {defaultText}
      </option>
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
