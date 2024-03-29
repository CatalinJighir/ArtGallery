import { useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import {
  Poppins_300Light,
  Poppins_400Regular,
  useFonts,
} from "@expo-google-fonts/poppins";
import {
  SignInButton,
  SignInButtonText,
  FormComponent,
  Input,
  InputErrorText,
  Label,
  PasswordInputWrapper,
} from "./Form.style";
import { LinearGradient } from "expo-linear-gradient";
import { useSignIn } from "@clerk/clerk-expo";
import { doc, getDoc } from "firebase/firestore";
import db from "../../../firebase-config";
import { useDispatch } from "react-redux";
import {
  selectAuthType,
  selectAuthenticated,
  selectEmailAddress,
  selectFullname,
  selectProfileImgUrl,
  selectUsername,
  selectBio,
  selectInstagram,
  selectTwitter,
  selectWebsite,
} from "../../../redux/reducers/Auth";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const Form = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loaded, error] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
  });

  const { isLoaded, signIn, setActive } = useSignIn();

  const [isUpdatePending, setIsUpdatePending] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const [emailInputError, setEmailInputError] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function validateData() {
    const emailPattern = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    let valid = true;

    if (!emailPattern.test(email)) {
      setEmailInputError("Invalid email format");
      valid = false;
    }

    if (password.length < 8) {
      setPasswordInputError("Password must be at least 8 charcters long");
      valid = false;
    }

    return valid;
  }

  const onSignInPress = async () => {
    if (!validateData()) {
      setIsUpdatePending(false);
      return;
    }

    if (!isLoaded) {
      setIsUpdatePending(false);
      return;
    }

    try {
      await signIn
        .create({
          identifier: email,
          password,
        })
        .then(async (result) => {
          if (result.status === "complete") {
            setIsUpdatePending(true);
            setActive({ session: result.createdSessionId });
            const docRef = doc(db, "users", email);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const data = docSnap.data();
              dispatch(selectAuthenticated(true));
              dispatch(selectAuthType("email"));
              dispatch(selectEmailAddress(email));
              dispatch(selectFullname(data.fullname));
              dispatch(selectProfileImgUrl(data.profileImgUrl));
              dispatch(selectUsername(data.username));
              dispatch(selectBio(data.bio));
              dispatch(selectTwitter(data.twitter));
              dispatch(selectInstagram(data.instagram));
              dispatch(selectWebsite(data.website));
              navigation.navigate("ProfileScreen" as never);
            } else {
              setIsUpdatePending(false);
              Toast.show({
                type: "error",
                text1: "No such document!",
              });
            }
          } else {
            setIsUpdatePending(false);
            console.log(result);
          }
        });
    } catch (err) {
      setIsUpdatePending(false);
      Toast.show({
        type: "error",
        text1: "Error occurred, try again",
      });
    }
  };

  if (!loaded || error) {
    return <></>;
  }

  return (
    <FormComponent>
      <Label>Email</Label>
      <Input
        testID="emailInput"
        value={email}
        onChangeText={(email: string) => setEmail(email)}
        placeholder="artist@gmail.com"
        placeholderTextColor="#757575"
        onFocus={() => setIsFocusedEmail(true)}
        onBlur={() => setIsFocusedEmail(false)}
        isFocused={isFocusedEmail}
        style={{
          borderColor: isFocusedEmail ? "#A463F8" : "#fff",
          backgroundColor: isFocusedEmail ? "#000" : "transparent",
        }}
      />
      {emailInputError && (
        <InputErrorText testID="emailInputError">
          {emailInputError}
        </InputErrorText>
      )}

      <Label>Password</Label>
      <PasswordInputWrapper isFocused={isFocusedPassword}>
        <Input
          testID="passwordInput"
          value={password}
          onChangeText={(password: string) => setPassword(password)}
          placeholder="at least 8 characters"
          placeholderTextColor="#757575"
          secureTextEntry={!isPasswordVisible}
          onFocus={() => setIsFocusedPassword(true)}
          onBlur={() => setIsFocusedPassword(false)}
          isFocused={isFocusedPassword}
          style={{
            flex: 1,
            borderColor: "transparent",
            backgroundColor: "transparent",
            marginTop: 0,
          }}
        />
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Icon
            name={isPasswordVisible ? "eye-with-line" : "eye"}
            color="#fff"
            size={26}
          />
        </TouchableOpacity>
      </PasswordInputWrapper>
      {passwordInputError && (
        <InputErrorText testID="passwordInputError">
          {passwordInputError}
        </InputErrorText>
      )}

      <SignInButton onPress={onSignInPress} disabled={isUpdatePending}>
        <LinearGradient
          colors={["#B24E9D", "#7E3BA1"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 8,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <SignInButtonText>Sign In</SignInButtonText>
            {isUpdatePending && (
              <ActivityIndicator color="#fff" style={{ marginLeft: 10 }} />
            )}
          </View>
        </LinearGradient>
      </SignInButton>
    </FormComponent>
  );
};

export default Form;
