import { useEffect, React } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import Theme from "@/assets/theme";

const windowHeight = Dimensions.get("window").height;

export default function Plane() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/tabs/personalHome");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your weekly check-in is submitted!</Text>
      <Image
        style={styles.image}
        source={require("@/assets/images/dottedPlane.png")}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 20,
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  image: {
    height: windowHeight * 0.4,
    aspectRatio: 1,
  },
  back: {
    position: "absolute",
    bottom: 10,
  },
});
