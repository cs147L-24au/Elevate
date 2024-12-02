import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { useRouter } from "expo-router";
import Theme from "@/assets/theme";
import { SafeAreaView } from "react-native-safe-area-context";

import Entypo from "@expo/vector-icons/Entypo";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Chat() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topNav}>
        <Text style={styles.title}>Chat</Text>
        <TouchableOpacity onPress={() => alert("not implemented yet!")}>
          <Entypo style={styles.chat} name="cog" size={36} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.header}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  topNav: {
    marginVertical: windowWidth * 0.1,
    marginHorizontal: windowWidth * 0.07,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 32,
  },
  chat: {},
});
