import React from "react";
import { Wrapper } from "./AuthButtons.style";
import AppleAuthBtn from "./AppleAuthBtn/AppleAuthBtn.component";
import GoogleAuthBtn from "./GoogleAuthBtn/GoogleAuthBtn.component";

export default function AuthButtons() {
  return (
    <Wrapper>
      <GoogleAuthBtn />
      <AppleAuthBtn />
    </Wrapper>
  );
}
