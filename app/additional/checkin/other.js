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

import db from "@/database/db";

export default function Other() {
  const [inputText, setInputText] = useState(""); // State for "Other" input

  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/tabs/personalHome")}
        >
          <Ionicons name="chevron-back" size={30} color="black" />
        </TouchableOpacity>

        <ProgressBar
          progress={0.75}
          width={windowWidth * 0.75}
          height={40}
          style={styles.bar}
          color={Theme.colors.buttonBlue}
        />
      </View>
      <Text style={styles.title}>Any other comments?</Text>
      <Text style={styles.questionText}>
        Feel free to write as much as you prefer.
      </Text>

      <TextInput
        style={[styles.inputBox, styles.multiLineInputBox]}
        placeholder="Type here..."
        value={inputText}
        placeholderTextColor={Theme.colors.placeholderText}
        onChangeText={setInputText}
        keyboardType="default"
        autoCapitalize="none"
        multiline={true}
      />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={async () => {
          try {
            const {
              data: { session },
            } = await db.auth.getSession();
            const user_id = session?.user?.id;

            if (!inputText.trim()) {
              alert("Please enter some text before submitting.");
              return;
            }

            const { data, error } = await db
              .from("checkins")
              .update({ other: inputText.trim() })
              .eq("id", user_id);

            if (error) {
              console.error(
                "Error updating the 'other' column:",
                error.message
              );
              alert("Failed to submit. Please try again.");
            } else {
              console.log("Data updated successfully:", data);
              router.push("/additional/checkin/plane");
            }
          } catch (err) {
            console.error("Unexpected error:", err);
            alert("An unexpected error occurred. Please try again.");
          }
        }}
      >
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF7FB",
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 75,
    left: 20,
  },
  title: {
    textAlign: "center",
    marginTop: windowHeight * 0.12 + windowHeight * 0.05,
    fontSize: 25,
    fontWeight: "500",
  },
  subHeaderText: {
    textAlign: "left",
    marginLeft: windowWidth * 0.1,
    marginTop: windowHeight * 0.05,
    fontSize: 25,
    fontWeight: "500",
  },
  questionText: {
    textAlign: "center",
    color: "gray",
    marginHorizontal: windowWidth * 0.05,
    marginTop: windowHeight * 0.025,
    fontSize: Theme.sizes.bodyText,
  },
  backButton: {
    top: 75,
  },
  bar: {
    top: 75,
    borderRadius: 12,
    borderWidth: 2,
    width: windowWidth * 0.75,
    height: 40,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    right: 50,
    backgroundColor: Theme.colors.buttonBlue,
    padding: 15,
    borderRadius: 12,
    width: windowWidth * 0.3,
  },
  nextButton: {
    flexDirection: "row",
    justifyContent: "center",
  },
  inputBox: {
    fontSize: Theme.sizes.bodyText,
    height: windowHeight * 0.06,
    marginTop: windowWidth * 0.1,
    marginLeft: windowWidth * 0.1,
    marginRight: windowWidth * 0.1,
    borderColor: Theme.colors.border,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
  },
  multiLineInputBox: {
    height: windowHeight * 0.2,
    textAlignVertical: "top",
  },
  submitText: {
    textAlign: "center",
    fontSize: Theme.sizes.textMedium,
    fontWeight: "500",
  },
});
