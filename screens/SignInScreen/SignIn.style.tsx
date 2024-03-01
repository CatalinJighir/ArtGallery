import styled from "styled-components/native";
import { StatusBar } from "react-native";

export const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: #1b1b1b;
  padding-top: ${StatusBar.currentHeight}px;
`;
