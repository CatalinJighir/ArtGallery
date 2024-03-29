import {
  AllArtWrapper,
  ArtImage,
  ImagesWrapper,
  LinkWrapper,
  SectionTitle,
  SoldArtWrapper,
  SoldOverlay,
  Wrapper,
} from "./MyArt.style";
import { useFonts, Questrial_400Regular } from "@expo-google-fonts/questrial";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const MyArt = () => {
  interface ImageStructure {
    currentOwner: string;
    href: string;
    src: {
      uri: string;
    };
  }

  const username = useSelector((state: RootState) => state.auth.username);
  const [images, setImages] = useState<ImageStructure[]>([]);

  const [loaded, error] = useFonts({
    Questrial_400Regular,
  });

  useEffect(() => {
    const fetchArt = async () => {
      const db = getFirestore();
      const artQuery = collection(db, "art");
      const q = query(artQuery, where("creator", "==", username));

      const querySnapshot = await getDocs(q);
      const storage = getStorage();

      const imageUrls = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const { imageUrl, currentOwner } = doc.data();
          const imageRef = ref(storage, imageUrl);
          const downloadUrl = await getDownloadURL(imageRef);
          return {
            currentOwner,
            href: downloadUrl,
            src: {
              uri: downloadUrl,
            },
          };
        })
      );

      console.log(imageUrls);
      setImages(imageUrls);
    };

    fetchArt().catch(console.error);
  }, []);

  if (!loaded || error) {
    return null;
  }

  return (
    <Wrapper>
      <AllArtWrapper>
        <SectionTitle>All</SectionTitle>
        <ImagesWrapper>
          {images.length === 0 ? (
            <SectionTitle>You have no art buyed yet</SectionTitle>
          ) : (
            images.map((image, index) => (
              <LinkWrapper onPress={() => console.log(image.href)} key={index}>
                <ArtImage source={image.src} />
              </LinkWrapper>
            ))
          )}
        </ImagesWrapper>
      </AllArtWrapper>
      <SoldArtWrapper>
        <SectionTitle>Sold</SectionTitle>
        <ImagesWrapper>
          {images.length === 0 ||
          images.some((image) => image.currentOwner === username) ? (
            <SectionTitle>No art sold yet</SectionTitle>
          ) : (
            images
              .filter((image) => image.currentOwner !== username)
              .map((image, index) => (
                <LinkWrapper
                  onPress={() => console.log(image.href)}
                  key={index}
                >
                  <ArtImage source={image.src} />
                  <SoldOverlay
                    source={require("../../../assets/images/sold.png")}
                  />
                </LinkWrapper>
              ))
          )}
        </ImagesWrapper>
      </SoldArtWrapper>
    </Wrapper>
  );
};

export default MyArt;
