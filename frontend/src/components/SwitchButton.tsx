import { useState } from "react";
import { StyledButton } from "./StyledButton";

type Props = {
  value: boolean;
  onLabel: string;
  offLabel: string;
  onChange: (toggle: boolean) => void;
};

export function SwitchButton({
  value,
  onLabel,
  offLabel,
  onChange,
}: Props) {
  return (
    <>
      <StyledButton
        className={value ? "on" : "off"}
        onClick={() => onChange(!value)}
      >
        {value ? onLabel : offLabel}
      </StyledButton>
    </>
  );
}
