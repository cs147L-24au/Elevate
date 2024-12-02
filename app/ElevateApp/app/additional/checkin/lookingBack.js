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

export default function LookingBack() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [otherText, setOtherText] = useState(""); // State for "Other" input

  const router = useRouter();
  const options = [
    "Anxious",
    "Hopeful",
    "Scared",
    "Confident",
    "Together",
    "Scattered",
    "Other",
  ];

  const toggleSelection = (option) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option)) {
        // If unchecking "Other", clear the otherText state
        if (option === "Other") setOtherText("");
        return prev.filter((item) => item !== option);
      }
      return [...prev, option];
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Weekly Check-in</Text>
      <Text style={styles.subHeaderText}>Looking Back...</Text>
      <Text style={styles.questionText}>
        Select the words that best describe how you felt this week.
      </Text>

      <View style={styles.options}>
        {options.map((option) => (
          <View key={option} style={styles.responses}>
            <TouchableOpacity
              style={styles.checkBox}
              onPress={() => toggleSelection(option)}
            >
              {selectedOptions.includes(option) && (
                <Text style={styles.checkMark}>✓</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.responseText}>{option}</Text>
            {option === "Other" && selectedOptions.includes("Other") && (
              <TextInput
                style={styles.otherInput}
                placeholder="Please specify..."
                value={otherText}
                onChangeText={setOtherText}
              />
            )}
          </View>
        ))}
      </View>

      <ProgressBar
        progress={0.5}
        width={windowWidth * 0.6}
        style={styles.bar}
        color="#A9A9A9"
      />

      <TouchableOpacity
        style={styles.buttonContainer}
        // onPress={() => console.log({ selectedOptions, otherText })}
        onPress={() => router.push("/additional/checkin/other")}
      >
        <View style={styles.nextButton}>
          <Ionicons
            name="arrow-forward"
            size={Theme.sizes.iconMedium}
            color="black"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    flex: 1,
    padding: 20,
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  options: {
    marginTop: windowHeight * 0.025,
    alignSelf: "flex-start",
    marginLeft: windowWidth * 0.1,
  },
  checkBox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: "black",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkMark: {
    fontSize: Theme.sizes.bodyText,
    fontWeight: "700",
    color: "black",
  },
  responses: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  responseText: {
    fontSize: Theme.sizes.bodyText,
  },
  otherInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    width: 150,
    height: 40,
  },
  backButton: {
    position: "absolute",
    top: 75,
    left: 20,
  },
  title: {
    textAlign: "center",
    marginTop: windowHeight * 0.1,
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
    bottom: 150,
    alignSelf: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    right: 50,
    backgroundColor: Theme.colors.buttonBlue,
    padding: 15,
    borderRadius: 8,
    width: windowWidth * 0.2,
  },
  nextButton: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
