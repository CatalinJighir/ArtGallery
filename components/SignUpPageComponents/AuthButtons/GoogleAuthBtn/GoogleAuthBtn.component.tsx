import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../../../hooks/useWarmUpBrowser";
import { ButtonWrapper, Icon } from "../AuthButtons.style";
import { useNavigation } from "@react-navigation/native";
import { setDoc, doc } from "firebase/firestore";
import db from "../../../../firebase-config";
import { useDispatch } from "react-redux";
import {
  selectAuthType,
  selectAuthenticated,
  selectEmailAddress,
  selectFullname,
} from "../../../../redux/reducers/Auth";
import Toast from "react-native-toast-message";

WebBrowser.maybeCompleteAuthSession();

const GoogleAuthBtn = () => {
  useWarmUpBrowser();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { startOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });

  const googleSignup = async () => {
    try {
      const { createdSessionId, setActive, signUp } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });

        try {
          await setDoc(doc(db, "users", signUp?.emailAddress as string), {
            fullname: `${signUp?.firstName} ${signUp?.lastName}`,
            emailAddress: signUp?.emailAddress,
            username: "",
            profileImgUrl: "",
            authType: "google",
            creationDate: new Date(),
          });
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Failed to store user data",
          });
          return;
        }

        dispatch(selectAuthType("google"));
        dispatch(selectAuthenticated(true));
        dispatch(selectEmailAddress(signUp?.emailAddress));
        dispatch(selectFullname(`${signUp?.firstName} ${signUp?.lastName}`));

        navigation.navigate("ProfileScreen" as never);
      } else {
        Toast.show({
          type: "error",
          text1: "Failed to sign up",
        });
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error occurred, try again",
      });
    }
  };

  return (
    <ButtonWrapper onPress={googleSignup}>
      <Icon name="google" color="#fff" size={30} />
    </ButtonWrapper>
  );
};

export default GoogleAuthBtn;
