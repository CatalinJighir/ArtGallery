import React from "react";
import { Container } from "./SignIn.style";
import AuthButton from "../../components/SignInScreenComponents/AuthButton/AuthButton.component";
import Header from "../../components/SignInScreenComponents/Header/Header.component";
import Form from "../../components/SignInScreenComponents/Form/Form.component";
import SignUpLink from "../../components/SignInScreenComponents/SignUpLink/SignUpLink.component";
import { useNavigation } from "@react-navigation/native";

export default function SignIn() {
  const navigation = useNavigation();
  return (
    <Container>
      <Header navigation={navigation} />
      <Form />
      <AuthButton />
      <SignUpLink navigation={navigation} />
    </Container>
  );
}
