import {
  HeaderComponent,
  ArrowIcon,
  IconWrapper,
  PageTitle,
  PlaceholderView,
} from "./Header.style";
import { useFonts, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { NavigationProp } from "@react-navigation/native";

export default function Header({
  navigation,
}: {
  navigation:
    | NavigationProp<ReactNavigation.RootParamList>
    | { canGoBack: Function; goBack: Function }
    | undefined;
}) {
  const [loaded, error] = useFonts({
    Poppins_500Medium,
  });

  if (error) {
    return <></>;
  }
  if (!loaded) {
    return null;
  }

  return (
    <HeaderComponent>
      <IconWrapper
        onPress={() => {
          if (navigation?.canGoBack()) {
            navigation?.goBack();
          }
        }}
      >
        <ArrowIcon name="left" color="#fff" size={24} />
      </IconWrapper>
      <PageTitle>Create account</PageTitle>
      <PlaceholderView />
    </HeaderComponent>
  );
}
