import { useEffect, React } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import Theme from "@/assets/theme";
import LottieView from "lottie-react-native";

const windowHeight = Dimensions.get("window").height;

export default function Plane() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/tabs/personalHome");
    }, 3500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your weekly check-in is submitted!</Text>
      <LottieView
        style={styles.image}
        source={require("@/assets/images/animation.json")}
        autoPlay
      />
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
    justifyContent: "center",
    textAlign: "center",
  },
  image: {
    marginTop: 30,
    height: windowHeight * 0.4,
    aspectRatio: 1,
  },
  back: {
    position: "absolute",
    bottom: 10,
  },
});
