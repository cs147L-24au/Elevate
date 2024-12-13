import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import Theme from "@/assets/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import db from "@/database/db";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useLocalSearchParams } from "expo-router";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function OtherProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    const fetchTargets = async () => {
      try {
        setLoading(true);
        const { data, error } = await db
          .from("targets")
          .select("id, title, description, deadline, priority")
          .eq("id", params.id);

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

  const params = useLocalSearchParams();

  const handleSelectImage = async () => {
    try {
      const {
        data: { session },
      } = await db.auth.getSession();
      const user_id = session?.user?.id;

      if (!user_id) {
        Alert.alert("Error", "Not logged in");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setProfileImage(uri);

        const imageName = `${Date.now()}.jpg`;
        const response = await uploadImageToSupabase(uri, imageName);

        if (response.error) {
          Alert.alert("Upload failed", response.error.message);
        } else {
          const { data: urlData } = db.storage
            .from("profile_pics")
            .getPublicUrl(imageName);

          const { data, error } = await db
            .from("users")
            .update({ profile_pic: urlData.publicUrl })
            .eq("id", user_id);

          if (error) {
            console.error("Error updating profile pic URL:", error);
            Alert.alert("Failed to update profile picture");
          } else {
            Alert.alert("Success", "Profile picture updated successfully!");
          }
        }
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      Alert.alert("Error", "Failed to update profile picture");
    }
  };

  const uploadImageToSupabase = async (uri, imageName) => {
    try {
      // Fetch the file
      const response = await fetch(uri);
      const blob = await response.blob();

      // Add content type checking
      const contentType = blob.type;
      if (!contentType.startsWith("image/")) {
        throw new Error("Selected file is not an image");
      }

      // Convert blob to base64 first
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          try {
            const base64Data = reader.result.split(",")[1];
            const byteArray = Uint8Array.from(atob(base64Data), (c) =>
              c.charCodeAt(0)
            );

            // Upload to Supabase with the byte array
            const result = await db.storage
              .from("profile_pics")
              .upload(imageName, byteArray, {
                contentType: contentType,
                upsert: false,
              });

            resolve(result);
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      return { error };
    }
  };

  const handleSettingsClick = () => {
    setSettingsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => router.push("/tabs/groupHome")}
      >
        <Ionicons name="chevron-back" size={30} color="black" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{params.name}</Text>
        </View>
        <View style={styles.imageContainer} onPress={handleSelectImage}>
          {params.profile_pic ? (
            <Image
              source={{
                uri: params.profile_pic,
              }}
              style={styles.profileImage}
            />
          ) : (
            <Text style={styles.imagePlaceholderText}>+</Text>
          )}
        </View>
        <View style={styles.basicInfo}>
          <Image
            source={require("@/assets/images/grad_cap.png")}
            style={[styles.icon, { height: 20, width: 20 }]}
          />
          <Text style={styles.infoText}>{params.grad}</Text>
        </View>
        <View style={styles.basicInfo}>
          <Image
            source={require("@/assets/images/location_pin.png")}
            style={[styles.icon, { height: 15, width: 15 }]}
          />
          <Text style={styles.infoText}>Stanford, CA</Text>
        </View>
        <View style={styles.centeredView}>
          <Text style={styles.bioText}>{params.bio}</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.textBoxText}>Weekly Check-In</Text>
        </View>
        <TouchableOpacity
          style={styles.checkinButton}
          onPress={() => {
            router.push({
              pathname: "/additional/checkin/landaycheckin",
              params: {
                id: params.id,
                profile_pic: params.profile_pic,
                bio: params.bio,
                name: params.name,
                grad: params.grad,
              },
            });
          }}
        >
          <Text style={styles.targetButtonText}>See complete</Text>
          <Image
            source={require("@/assets/images/right_arrow.png")}
            style={[styles.icon, { height: 15, width: 15 }]}
          />
        </TouchableOpacity>
        <View style={styles.textBox}>
          <Text style={styles.textBoxText}>Upcoming Targets</Text>
        </View>
        {targets.length > 0 ? (
          <View style={styles.targetButton}>
            <View style={styles.row}>
              <AnimatedCircularProgress
                size={windowWidth * 0.15}
                width={3}
                fill={66}
                tintColor="#00e0ff"
                backgroundColor="#3d5875"
              >
                {(fill) => <Text style={styles.progressText}>5 days</Text>}
              </AnimatedCircularProgress>

              <Text style={styles.targetButtonText}>{targets[0].title}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.noTargetsContainer}>
            <Text style={styles.noTargetsText}>No targets set!</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: windowHeight * 0.02,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  scrollViewContent: {
    flex: 1,
    alignItems: "center",
  },
  back: {
    position: "absolute",
    top: 75,
    left: 20,
    zIndex: 1,
  },
  noTargetsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 150,
  },
  title: {
    textAlign: "center",
    marginTop: windowHeight * 0.02,
    fontSize: Theme.sizes.titleText,
    fontWeight: "bold",
  },
  centeredView: {
    width: "80%",
    justifyContent: "center",
  },
  bioText: {
    marginTop: windowHeight * 0.03,
    fontSize: Theme.sizes.bodyText,
    fontStyle: "italic",
  },
  infoText: {
    fontSize: Theme.sizes.bodyText,
    fontStyle: "bold",
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginTop: windowHeight * 0.05,
    marginBottom: windowHeight * 0.01,
    overflow: "hidden",
    borderWidth: 1,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imagePlaceholderText: {
    fontSize: 36,
    color: "#888",
  },
  basicInfo: {
    marginTop: windowHeight * 0.01,
    flexDirection: "row",
    alignItems: "left",
  },
  icon: {
    marginRight: 10,
    resizeMode: "contain",
  },
  textBox: {
    marginLeft: windowWidth * 0.09,
    paddingTop: 30,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    width: "90%",
    justifyContent: "center",
  },
  textBoxText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#333",
    textAlign: "left",
  },
  touchableOpacityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00e0ff",
    borderRadius: 20,
    paddingVertical: 15,
    width: "80%",
    alignSelf: "center",
    justifyContent: "space-between",
    marginTop: windowHeight * 0.03,
  },
  touchableText: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
    marginLeft: 15,
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
    alignItems: "center",
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
    bottom: 50,
    backgroundColor: Theme.colors.buttonBlue,
    padding: 15,
    borderRadius: 8,
    width: windowWidth * 0.35,
  },
  checkinButton: {
    backgroundColor: Theme.colors.buttonBlue,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 20,
    alignSelf: "center",
    width: windowWidth * 0.8,
    height: windowHeight * 0.07,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  targetButton: {
    backgroundColor: Theme.colors.buttonBlue,
    paddingVertical: 15,
    // paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: "center",
    width: windowWidth * 0.8,
    height: windowHeight * 0.1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  targetButtonText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "500",
    color: "black",
  },
  row: {
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    width: "100%",
  },
  progressIndicator: {
    marginRight: 10,
  },
  checkBox: {
    marginLeft: 10,
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: "black",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  checkedBox: {
    backgroundColor: Theme.colors.buttonBlue,
  },
});
