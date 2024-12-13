import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Theme from "@/assets/theme";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Ionicons from "@expo/vector-icons/Ionicons";

const windowWidth = Dimensions.get("window").width;

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

export default function TargetsCard({
  title,
  description,
  deadline,
  priority,
}) {
  const priorityColor =
    priority === "3" ? "red" : priority === "2" ? "orange" : "#3366FF";

  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckBox = () => {
    setIsChecked(!isChecked); // Toggle the checkbox state
  };

  return (
    <View style={styles.cardContainer}>
      <AnimatedCircularProgress
        size={windowWidth * 0.15}
        width={3}
        fill={66}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
      >
        {(fill) => <Text style={styles.progressText}>2 days</Text>}
      </AnimatedCircularProgress>
      <View style={styles.columnContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.deadline}>Deadline: {formatDate(deadline)}</Text>
        <Text style={[styles.priority, { color: priorityColor }]}>
          Priority: {priority}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.checkBox, isChecked && styles.checkedBox]}
        onPress={toggleCheckBox}
      >
        {isChecked && <Ionicons name="checkmark" size={20} color="black" />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: Theme.colors.buttonBlue,
    padding: 15,
    marginBottom: 10,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  columnContainer: {
    marginLeft: 10,
    width: "65%",
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
    color: "black",
  },
  deadline: {
    fontSize: 12,
    marginBottom: 5,
    color: "black",
  },
  priority: {
    fontSize: 12,
    fontWeight: "bold",
  },
  checkBox: {
    position: "absolute",
    right: 10,
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  checkedBox: {
    backgroundColor: Theme.colors.buttonBlue,
  },
});
