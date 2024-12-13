import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Dimensions,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Theme from "@/assets/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import db from "@/database/db";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Personal() {
  const router = useRouter();
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [targetModalVisible, setTargetModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [targets, setTargets] = useState([]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Fetch data from Supabase
  useEffect(() => {
    const fetchTargets = async () => {
      try {
        const {
          data: { session },
        } = await db.auth.getSession();
        const user_id = session?.user?.id;

        setLoading(true);
        const { data, error } = await db
          .from("targets")
          .select("id, title, description, deadline, priority")
          .eq("id", user_id);

        if (error) {
          throw error;
        }

        // Format the data and sort by closest deadline
        const formattedData = data
          .map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            deadline: item.deadline,
            priority: item.priority,
          }))
          .sort((a, b) => {
            // Convert deadlines to Date objects for comparison
            const dateA = new Date(a.deadline);
            const dateB = new Date(b.deadline);

            // Sort in ascending order (closest deadline first)
            return dateA - dateB;
          });

        setTargets(formattedData);
      } catch (err) {
        console.error("Error fetching targets:", err.message || err);
      } finally {
        setLoading(false);
      }
    };

    fetchTargets();
  }, []);

  const handleViewProfile = () => {
    router.push("/additional/profile");
    setSettingsModalVisible(false);
  };

  const handleSettingsClick = () => {
    setSettingsModalVisible(true);
  };

  const handleTargetClick = () => {
    setTargetModalVisible(true);
  };

  const handleLogOutClick = () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            setSettingsModalVisible(false);
            router.push("setup/welcome");
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const toggleCheckBox = () => {
    setIsChecked(!isChecked); // Toggle the checkbox state
  };

  return (
    <SafeAreaView backgroundColor={"#EEF7FB"}>
      <View style={styles.topNav}>
        <Text style={styles.title}>My Home</Text>
        <TouchableOpacity onPress={handleSettingsClick}>
          <Image
            source={require("@/assets/icons/setup-button.png")}
            style={styles.setting}
          ></Image>
        </TouchableOpacity>
      </View>

      {/* Settings Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={settingsModalVisible}
        onRequestClose={() => setSettingsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleViewProfile}
            >
              <Text style={styles.modalButtonText}>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleLogOutClick}
            >
              <Text style={styles.modalButtonText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setSettingsModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Background Container */}
      <TouchableOpacity
        onPress={() => router.push("/additional/checkin/myCheckin")}
      >
        <ImageBackground
          source={require("../../assets/images/skyWithPlane.png")}
          style={styles.backgroundContainer}
        >
          <TouchableOpacity
            style={styles.checkinButtonContainer}
            onPress={() => router.push("/additional/checkin/myCheckin")}
          >
            <View style={styles.myCheckinButton}>
              <Text style={styles.myCheckinText}>My Check-ins</Text>
              <Ionicons name="chevron-forward" size={20} color="black" />
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </TouchableOpacity>

      <View style={styles.targetsNav}>
        <View style={styles.titleAndButton}>
          <Text style={styles.header}>Targets</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.titleAndButton}
            onPress={() => router.push("/additional/target/allTargets")}
          >
            <Text>See All</Text>
            <Ionicons name="chevron-forward" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {targets.length > 0 ? (
        <TouchableOpacity
          style={styles.targetButton}
          onPress={handleTargetClick}
        >
          <View style={styles.row}>
            <AnimatedCircularProgress
              size={windowWidth * 0.15}
              width={3}
              fill={66}
              tintColor="#00e0ff"
              backgroundColor="#3d5875"
            >
              {(fill) => <Text style={styles.progressText}>2 days</Text>}
            </AnimatedCircularProgress>

            <Text style={styles.targetButtonText}>{targets[0].title}</Text>
            <TouchableOpacity
              style={[styles.checkBox, isChecked && styles.checkedBox]}
              onPress={toggleCheckBox}
            >
              {isChecked && (
                <Ionicons name="checkmark" size={20} color="black" />
              )}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.noTargetsContainer}>
          <Text style={styles.noTargetsText}>No targets set!</Text>
        </View>
      )}

      {/* Modal for clicking on the Target */}
      {targets.length > 0 ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={targetModalVisible}
          onRequestClose={() => setTargetModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalTopContainer}>
                <Text style={styles.modalTitleText}>{targets[0].title}</Text>
                <Text style={styles.modalPriorityText}>
                  Priority: {targets[0].priority}
                </Text>
              </View>

              <View style={styles.modalMiddleContainer}>
                <AnimatedCircularProgress
                  size={windowWidth * 0.15}
                  width={3}
                  fill={66}
                  tintColor="#00e0ff"
                  backgroundColor="#3d5875"
                >
                  {(fill) => <Text style={styles.progressText}>2 days</Text>}
                </AnimatedCircularProgress>
                <TouchableOpacity
                  style={[styles.checkBox, isChecked && styles.checkedBox]}
                  onPress={toggleCheckBox}
                >
                  {isChecked && (
                    <Ionicons name="checkmark" size={20} color="black" />
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.modalBottomContainer}>
                <Text style={styles.modalBottomText}>
                  Deadline: {formatDate(targets[0].deadline)}
                </Text>
                <Text style={styles.modalBottomText}></Text>
                <Text></Text>
                <Text style={styles.modalBottomText}>
                  {targets[0].description}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setTargetModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : (
        <Text></Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalTitleText: {
    fontSize: Theme.sizes.headerText,
    fontWeight: "500",
  },
  modalPriorityText: {
    color: "red",
  },
  modalTopContainer: {
    textAlign: "center",
  },
  noTargetsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 150,
  },
  modalMiddleContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBottomContainer: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: "left",
  },
  modalBottomText: {
    fontSize: Theme.sizes.bodyText,
  },
  targetsNav: {
    marginTop: windowHeight * 0.05,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: windowWidth * 0.1,
  },
  titleAndButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  setting: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  header: {
    fontSize: Theme.sizes.headerText,
    paddingLeft: 35,
    paddingRight: 10,
  },
  topNav: {
    marginVertical: windowWidth * 0.1,
    marginHorizontal: windowWidth * 0.07,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 20,
  },
  title: {
    fontSize: Theme.sizes.titleText,
    fontWeight: "600",
  },
  backgroundContainer: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.4,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: windowWidth * 0.7,
  },
  modalButton: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: Theme.colors.buttonWhite,
    borderRadius: 8,
    marginVertical: 5,
  },
  modalButtonText: {
    fontSize: 18,
    color: "black",
  },
  checkinButtonContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 15,
    borderRadius: 8,
  },
  myCheckinButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  myCheckinText: {
    fontSize: Theme.sizes.textLarge,
  },
  targetButton: {
    backgroundColor: Theme.colors.buttonBlue,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: "center",
    width: windowWidth * 0.8,
    height: windowHeight * 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  targetButtonText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "500",
    color: "black",
    alignText: "center",
    width: "65%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  progressIndicator: {
    marginRight: 10,
  },
  checkBox: {
    marginLeft: 20,
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "black",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  checkedBox: {
    backgroundColor: Theme.colors.buttonBlue,
  },
  logoutHeader: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 24,
  },
  logoutText: {
    alignText: "center",
    fontSize: 24,
  },
  logout: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
