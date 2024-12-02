import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import Theme from "@/assets/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import Slider from "@react-native-community/slider";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SetTarget() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [priority, setPriority] = useState(1); // State to track slider value
  const router = useRouter();

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => router.push("/tabs/personalHome"), // Replace with the correct route
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/tabs/personalHome")}
        >
          <Ionicons name="chevron-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Set Target</Text>
        <Text style={styles.subHeaderText}>Title</Text>
        <TextInput
          style={styles.titleBox}
          placeholder="Enter a title..."
          placeholderTextColor={Theme.colors.placeholderText}
          value={title}
          onChangeText={setTitle}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <Text style={styles.subHeaderText}>Deadline</Text>

        <View style={styles.dateTimeRow}>
          <DateTimePicker
            value={date}
            mode={"date"}
            is24Hour={true}
            onChange={onDateChange}
          />
          <DateTimePicker
            value={time}
            mode={"time"}
            is24Hour={true}
            onChange={onTimeChange}
          />
        </View>

        <Text style={styles.subHeaderText}>Description</Text>

        <TextInput
          style={[styles.descriptionBox, styles.multiLineInputBox]}
          placeholder="Type here..."
          value={description}
          placeholderTextColor={Theme.colors.placeholderText}
          onChangeText={setDescription}
          keyboardType="default"
          autoCapitalize="none"
          multiline={true}
        />

        <Text style={styles.subHeaderText}>Priority</Text>

        <View style={styles.priorityContainer}>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={3}
            step={1}
            minimumTrackTintColor="#A0A0A0"
            maximumTrackTintColor="#A0A0A0"
            thumbTintColor="black"
            value={priority}
            onValueChange={setPriority}
          />

          <View style={styles.labelContainer}>
            {[
              { value: 1, text: "Least important" },
              { value: 2, text: "Fairly important" },
              { value: 3, text: "Most important" },
            ].map((label) => (
              <View
                key={label.value}
                style={[styles.labelBox, { backgroundColor: label.color }]}
              >
                <Text style={styles.labelNumber}>{label.value}</Text>
                <Text style={styles.labelText}>{label.text}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.deleteButtonContainer}
            onPress={() => handleDelete()}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButtonContainer}
            onPress={() => router.push("/tabs/personalHome")}
          >
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    left: 0,
  },
  title: {
    textAlign: "center",
    marginTop: windowHeight * 0.1,
    fontSize: Theme.sizes.titleText,
    fontWeight: "bold",
  },
  subHeaderText: {
    textAlign: "left",
    marginLeft: windowWidth * 0.05,
    marginTop: windowHeight * 0.025,
    fontSize: 25,
    fontWeight: "500",
  },
  titleBox: {
    fontSize: Theme.sizes.bodyText,
    height: windowHeight * 0.06,
    marginLeft: windowWidth * 0.05,
    marginRight: windowWidth * 0.05,
    borderColor: Theme.colors.border,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: Theme.colors.backgroundSecodary,
  },
  dateTimeRow: {
    margin: 10,
    flexDirection: "row",
    width: "100%",
  },
  descriptionBox: {
    fontSize: Theme.sizes.bodyText,
    height: windowHeight * 0.06,
    margin: 10,
    marginLeft: windowWidth * 0.05,
    marginRight: windowWidth * 0.05,
    borderColor: Theme.colors.border,
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    backgroundColor: Theme.colors.backgroundSecodary,
  },
  multiLineInputBox: {
    height: windowHeight * 0.1,
    textAlignVertical: "top",
  },
  priorityContainer: {
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  slider: {
    width: windowWidth * 0.8,
    height: 40,
    // marginBottom: 20,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: windowWidth * 0.8,
  },
  labelBox: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    width: windowWidth * 0.2,
  },
  labelNumber: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  labelText: {
    fontSize: 12,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: windowHeight * 0.05,
    marginBottom: 30,
    width: "100%",
  },
  saveButtonContainer: {
    position: "absolute",
    right: 50,
    backgroundColor: Theme.colors.buttonBlue,
    padding: 15,
    borderRadius: 8,
    width: windowWidth * 0.3,
    marginBottom: 10,
  },
  deleteButtonContainer: {
    position: "absolute",
    left: 50,
    backgroundColor: Theme.colors.buttonRed,
    padding: 15,
    borderRadius: 8,
    width: windowWidth * 0.3,
    marginBottom: 10, // Space between buttons
  },
  saveText: {
    textAlign: "center",
    fontSize: Theme.sizes.textMedium,
    fontWeight: "500",
  },
  deleteText: {
    textAlign: "center",
    fontSize: Theme.sizes.textMedium,
    fontWeight: "500",
  },
});
