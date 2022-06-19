import { Children } from "react";
import styled from "styled-components";

export const SpacedDiv = styled.div`
  margin: 2rem 0;
`;

export function Spacer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SpacedDiv>{children}</SpacedDiv>
      <hr />
    </>
  );
}
