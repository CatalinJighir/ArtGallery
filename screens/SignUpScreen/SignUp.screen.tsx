import React from "react";
import { Container } from "./SignUp.style";
import Header from "../../components/SignUpPageComponents/Header/Header.component";
import Form from "../../components/SignUpPageComponents/Form/Form.component";
import AuthButtons from "../../components/SignUpPageComponents/AuthButtons/AuthButtons.component";
import LogInLink from "../../components/SignUpPageComponents/LogInLink/LogInLink.component";
import { useNavigation } from "@react-navigation/native";

export default function SignUp() {
  const navigation = useNavigation();

  return (
    <Container>
      <Header navigation={navigation} />
      <Form />
      <AuthButtons />
      <LogInLink navigation={navigation} />
    </Container>
  );
}
