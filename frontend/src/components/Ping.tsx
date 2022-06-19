import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { StyledButton } from "./StyledButton";

const AbsoluteDiv = styled.div `
  position: absolute;
  bottom: 2rem;
  right: 2rem;
`

export function Ping() {
  const [apiPing, setApiPing] = useState("");

  const pingApi = (e?: any) => {
    if (e) e.preventDefault();

    // the call /api is proxied to the server > see vite.config.ts
    axios
      .get("/api")
      .then((res) => {
        setApiPing(res.data);
      })
      .catch((err) => {
        setApiPing("Error = " + err.toString());
      });
  };

  useEffect(() => {
    pingApi();
  }, []);

  return (
    <AbsoluteDiv>
      <code style={{ display: "block" }}>{apiPing ?? "–"}</code>
      <StyledButton onClick={pingApi}>ping API</StyledButton>
    </AbsoluteDiv>
  );
}
