import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";
import store from "./redux/store";
import { toastConfig } from "./utils/toastConfig";

import HomeScreen from "./screens/HomeScreen/HomeScreen.screen";
import SignUp from "./screens/SignUpScreen/SignUp.screen";
import SignIn from "./screens/SignInScreen/SignIn.screen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen.screen";
import MyArtScreen from "./screens/MyArtScreen/MyArtScreen.screen";
import GalleryScreen from "./screens/GalleryScreen/GalleryScreen.screen";
import ArtScreen from "./screens/ArtScreen/ArtScreen.screen";
import UserProfileScreen from "./screens/UserProfileScreen/UserProfileScreen.screen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig.extra.clerkPublishableKey}
    >
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "",
                headerTransparent: true,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                title: "",
                headerTransparent: true,
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                title: "",
                headerTransparent: true,
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{
                title: "",
                headerTransparent: true,
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name="MyArt"
              component={MyArtScreen}
              options={{
                title: "",
                headerTransparent: true,
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name="Gallery"
              component={GalleryScreen}
              options={{
                title: "",
                headerTransparent: true,
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name="Art"
              component={ArtScreen}
              options={{
                title: "",
                headerTransparent: true,
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name="UserProfile"
              component={UserProfileScreen}
              options={{
                title: "",
                headerTransparent: true,
                headerBackVisible: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast config={toastConfig} />
      </Provider>
    </ClerkProvider>
  );
}
