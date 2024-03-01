import * as WebBrowser from "expo-web-browser";
import { useOAuth, useUser } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../../../hooks/useWarmUpBrowser";
import { ButtonWrapper, Icon } from "../AuthButton.style";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import db from "../../../../firebase-config";
import { useDispatch } from "react-redux";
import {
  selectAuthType,
  selectAuthenticated,
  selectBio,
  selectEmailAddress,
  selectFullname,
  selectInstagram,
  selectProfileImgUrl,
  selectTwitter,
  selectUsername,
  selectWebsite,
} from "../../../../redux/reducers/Auth";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

WebBrowser.maybeCompleteAuthSession();

const AppleAuthBtn = () => {
  useWarmUpBrowser();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useUser();
  const { startOAuthFlow } = useOAuth({
    strategy: "oauth_apple",
  });

  useEffect(() => {
    if (!user.user?.primaryEmailAddress?.emailAddress) {
      return;
    }

    (async () => {
      try {
        const email = user.user?.primaryEmailAddress?.emailAddress;
        const docRef = doc(db, "users", email as string);
        const docSnap = await getDoc(docRef);
        if (docSnap?.exists()) {
          const data = docSnap.data();
          dispatch(selectAuthenticated(true));
          dispatch(selectAuthType("apple"));
          dispatch(selectEmailAddress(email));
          dispatch(selectFullname(data.fullname));
          dispatch(selectProfileImgUrl(data.profileImgUrl));
          dispatch(selectUsername(data.username));
          dispatch(selectBio(data.bio));
          dispatch(selectTwitter(data.twitter));
          dispatch(selectInstagram(data.instagram));
          dispatch(selectWebsite(data.website));
          navigation?.navigate("ProfileScreen" as never);
        } else {
          Toast.show({
            type: "error",
            text1: "No such document!",
          });
        }
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Failed to get user data",
        });
        return;
      }
    })();
  }, [user]);

  const appleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
      } else {
        Toast.show({
          type: "error",
          text1: "Failed to sign in",
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
    <ButtonWrapper onPress={appleSignIn}>
      <Icon name="apple1" color="#fff" size={30} />
    </ButtonWrapper>
  );
};

export default AppleAuthBtn;
