import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import Theme from "@/assets/theme";
import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Group() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("@/assets/images/clouds1.png")}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.topNav}>
          <Text style={styles.title}>Group Home</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => router.push("/additional/members")}
          >
            <Text style={styles.buttonText}>Members</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.header}>Group Check-ins</Text>
          <View style={styles.checkInContainer}>
            <View style={styles.tempText}>
              <Text>No group check-ins yet!</Text>
            </View>
          </View>
          <Text style={styles.header}>Group Goals</Text>
          <View style={styles.groupGoalsContaier}>
            <View style={styles.tempText}>
              <Text>No group goals yet!</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    resizeMode: "cover",
  },
  container: {},
  content: {
    flexDirection: "column",
  },
  topNav: {
    marginVertical: windowWidth * 0.1,
    marginHorizontal: windowWidth * 0.07,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: Theme.sizes.titleText,
    fontWeight: "600",
  },
  buttonContainer: {
    backgroundColor: Theme.colors.buttonBlue,
    borderRadius: 8,
    width: windowWidth * 0.25,
    height: windowWidth * 0.08,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: Theme.sizes.bodyText,
    fontWeight: "600",
  },
  checkInContainer: {
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight * 0.3,
  },
  groupGoalsContaier: {
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight * 0.3,
  },
  header: {
    fontSize: Theme.sizes.headerText,
    paddingHorizontal: 35,
  },
  tempText: {
    height: 20,
    borderRadius: 5,
    width: windowWidth * 0.5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "white",
  },
});
