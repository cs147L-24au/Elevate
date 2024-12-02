import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import Theme from "@/assets/theme";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Background() {
  const [major, setMajor] = useState("");
  const [selectedGrad, setSelectedGrad] = useState("");
  const [selectedCareer, setSelectedCareer] = useState("");
  const [graduationModalVisible, setGraduationModalVisible] = useState(false);
  const [careerModalVisible, setCareerModalVisible] = useState(false);

  const router = useRouter();

  const years = Array.from({ length: 2035 - 1970 + 1 }, (_, i) =>
    (2035 - i).toString()
  );

  const careerInterests = [
    "Aerospace Engineering",
    "Artificial Intelligence/Machine Learning",
    "Architecture",
    "Bioinformatics",
    "Blockchain Development",
    "Civil Engineering",
    "Consulting",
    "Cloud Computing",
    "Data Science",
    "Electrical Engineering",
    "Entrepreneurship",
    "Event Planning",
    "Finance",
    "Film Production",
    "Graphic Design",
    "Healthcare/Medicine",
    "Human Resources",
    "Industrial Design",
    "Investment Banking",
    "Law",
    "Marketing",
    "Mechanical Engineering",
    "Mobile App Development",
    "Non-Profit Management",
    "Photography",
    "Product Management",
    "Public Policy",
    "Renewable Energy",
    "Sales",
    "Software Engineering",
    "Social Work",
    "Sports Management",
    "UI/UX Design",
    "Web Development",
    "Writing/Journalism",
  ];

  const renderDropdownModal = (
    visible,
    setVisible,
    options,
    selectedValue,
    setSelectedValue,
    placeholder
  ) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{placeholder}</Text>
          <ScrollView>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOption}
                onPress={() => {
                  setSelectedValue(option);
                  setVisible(false);
                }}
              >
                <Text style={styles.modalOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setVisible(false)}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Background</Text>
      <Text style={styles.body}>
        This information will help connect you with like-minded students and
        graduates!
      </Text>

      <TextInput
        style={styles.inputBox}
        placeholder="Major"
        placeholderTextColor={Theme.colors.placeholderText}
        value={major}
        onChangeText={setMajor}
      />

      <TouchableOpacity
        style={styles.dropdownTrigger}
        onPress={() => setGraduationModalVisible(true)}
      >
        <Text
          style={[
            styles.dropdownTriggerText,
            { color: selectedGrad ? "black" : Theme.colors.placeholderText },
          ]}
        >
          {selectedGrad || "When did/will you graduate?"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.dropdownTrigger}
        onPress={() => setCareerModalVisible(true)}
      >
        <Text
          style={[
            styles.dropdownTriggerText,
            { color: selectedCareer ? "black" : Theme.colors.placeholderText },
          ]}
        >
          {selectedCareer || "Desired Career Path(s)"}
        </Text>
      </TouchableOpacity>

      {renderDropdownModal(
        graduationModalVisible,
        setGraduationModalVisible,
        years,
        selectedGrad,
        setSelectedGrad,
        "Select Graduation Year"
      )}

      {renderDropdownModal(
        careerModalVisible,
        setCareerModalVisible,
        careerInterests,
        selectedCareer,
        setSelectedCareer,
        "Select Career Path"
      )}

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => router.push("/onboarding/plane")}
      >
        <Text style={styles.buttonText}>Find Group!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    padding: 20,
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  title: {
    marginTop: windowHeight * 0.15,
    fontSize: 30,
    fontWeight: "bold",
  },
  body: {
    fontSize: Theme.sizes.bodyText,
    textAlign: "center",
    margin: windowHeight * 0.02,
    paddingBottom: 15,
  },
  inputBox: {
    height: windowHeight * 0.06,
    width: windowWidth * 0.8,
    borderColor: Theme.colors.border,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: Theme.colors.backgroundSecodary,
    fontSize: Theme.sizes.bodyText,
  },
  dropdownTrigger: {
    height: windowHeight * 0.06,
    width: windowWidth * 0.8,
    borderColor: Theme.colors.border,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: Theme.colors.backgroundSecodary,
    justifyContent: "center",
  },
  dropdownTriggerText: {
    fontSize: 16,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 200,
    backgroundColor: Theme.colors.buttonBlue,
    padding: 15,
    borderRadius: 8,
    width: windowWidth * 0.8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: Theme.sizes.headerText,
    fontWeight: "500",
    justifyContent: "center",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: windowWidth * 0.8,
    maxHeight: windowHeight * 0.6,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalOptionText: {
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 15,
    padding: 15,
    backgroundColor: Theme.colors.buttonBlue,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "500",
  },
});
