import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import Theme from "@/assets/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProgressBar from "react-native-progress/Bar";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Other() {
  const [inputText, setInputText] = useState(""); // State for "Other" input

  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Weekly Check-in</Text>
      <Text style={styles.questionText}>
        Any other updates or feelings you'd like to share with your team?
      </Text>

      <TextInput
        style={[styles.inputBox, styles.multiLineInputBox]} // Add a new style for multi-line input
        placeholder="Type here..."
        value={inputText}
        placeholderTextColor={Theme.colors.placeholderText}
        onChangeText={setInputText}
        keyboardType="default"
        autoCapitalize="none"
        multiline={true} // Enable multi-line input
      />

      <ProgressBar
        progress={0.75}
        width={windowWidth * 0.6}
        style={styles.bar}
        color="#A9A9A9"
      />

      <TouchableOpacity
        style={styles.buttonContainer}
        // onPress={() => console.log({ selectedOptions, otherText })}
        onPress={() => router.push("/additional/checkin/plane")}
      >
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  backButton: {
    position: "absolute",
    top: 75,
    left: 20,
  },
  title: {
    textAlign: "center",
    marginTop: windowHeight * 0.15,
    fontSize: Theme.sizes.titleText,
    fontWeight: "bold",
  },
  subHeaderText: {
    textAlign: "left",
    marginLeft: windowWidth * 0.1,
    marginTop: windowHeight * 0.05,
    fontSize: 25,
    fontWeight: "500",
  },
  questionText: {
    textAlign: "left",
    marginLeft: windowWidth * 0.1,
    marginRight: windowWidth * 0.1,
    marginTop: windowHeight * 0.03,
    fontSize: 20,
  },
  bar: {
    position: "absolute",
    bottom: 135,
    alignSelf: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    right: 50,
    backgroundColor: Theme.colors.buttonBlue,
    padding: 15,
    borderRadius: 8,
    width: windowWidth * 0.3,
  },
  nextButton: {
    flexDirection: "row",
    justifyContent: "center",
  },
  inputBox: {
    fontSize: Theme.sizes.bodyText,
    height: windowHeight * 0.06,
    // width: windowWidth * 0.8,
    marginTop: windowWidth * 0.1,
    marginLeft: windowWidth * 0.1,
    marginRight: windowWidth * 0.1,
    borderColor: Theme.colors.border,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: Theme.colors.backgroundSecodary,
  },
  multiLineInputBox: {
    height: windowHeight * 0.2, // Adjust height for multi-line input
    textAlignVertical: "top", // Align text to the top
  },
  submitText: {
    textAlign: "center",
    fontSize: Theme.sizes.textMedium,
    fontWeight: "500",
  },
});
