import { useRef, useState } from "react";
import { StyledButton } from "./StyledButton";
import "./Dialog.css";

type Props = {
  openLabel: string;
  closeLabel: string;
  children: React.ReactNode;
};

export function Dialog({ openLabel, closeLabel, children }: Props) {
  const [showDialog, setShowDialog] = useState(false);

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  return (
    <div className="wrapper">
      <StyledButton onClick={toggleDialog}>
        {showDialog ? closeLabel : openLabel}
      </StyledButton>
      <div className={`dialog ${showDialog ? "is-open" : ""}`}>{children}</div>
    </div>
  );
}
