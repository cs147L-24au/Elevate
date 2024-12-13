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

export default function GoingForward() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [otherText, setOtherText] = useState(""); // State for "Other" input

  const router = useRouter();
  const options = [
    "Networking",
    "Submitting Applications",
    "Interview Prep",
    "Community Building",
    "Self-care",
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
      <View style={styles.top}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/tabs/personalHome")}
        >
          <Ionicons name="chevron-back" size={30} color="black" />
        </TouchableOpacity>

        <ProgressBar
          progress={0.25}
          width={windowWidth * 0.75}
          height={40}
          style={styles.bar}
          color={Theme.colors.buttonBlue}
        />
      </View>
      <Text style={styles.title}>Going forward...</Text>
      <Text style={styles.subHeaderText}>
        What do you want to focus on next?
      </Text>
      <Text style={styles.questionText}>
        Select any targets that call out to you.
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

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={async () => {
          try {
            const {
              data: { session },
            } = await db.auth.getSession();
            const user_id = session?.user?.id;

            if (selectedOptions.length === 0) {
              alert("Please select at least one option.");
              return;
            }

            // Prepare the data
            const dataToInsert = selectedOptions.map((option) =>
              option === "Other" && otherText ? otherText : option
            );

            console.log(dataToInsert);

            // Insert data into the Supabase database
            const { data, error } = await db
              .from("checkins")
              .update({ going_forward: dataToInsert })
              .eq("id", user_id);

            if (error) {
              console.error("Error inserting data:", error.message);
              alert("Failed to submit. Please try again.");
            } else {
              console.log("Data inserted successfully:", data);
              router.push("/additional/checkin/lookingBack");
            }
          } catch (err) {
            console.error("Unexpected error:", err);
            alert("An unexpected error occurred. Please try again.");
          }
        }}
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
    backgroundColor: "#EEF7FB",
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  options: {
    marginTop: windowHeight * 0.025,
    marginHorizontal: windowWidth * 0.1,
  },
  checkBox: {
    width: 25,
    height: 25,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#A9A9A9",
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
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    borderColor: "#A9A9A9",
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
    top: 75,
  },
  bar: {
    top: 75,
    borderRadius: 12,
    borderWidth: 2,
    width: windowWidth * 0.75,
    height: 40,
  },
  title: {
    textAlign: "center",
    marginTop: windowHeight * 0.12,
    fontSize: Theme.sizes.titleText,
  },
  subHeaderText: {
    textAlign: "center",
    marginHorizontal: windowWidth * 0.05,
    marginTop: windowHeight * 0.025,
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
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    right: 50,
    backgroundColor: Theme.colors.buttonBlue,
    padding: 15,
    borderRadius: 12,
    width: windowWidth * 0.2,
  },
  nextButton: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
