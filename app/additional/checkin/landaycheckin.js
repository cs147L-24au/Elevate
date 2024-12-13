import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";

import React, { useState, useEffect } from "react";

import { useRouter } from "expo-router";
import Theme from "@/assets/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

import db from "@/database/db";

// Import TargetsCard
import TargetsCard from "@/components/TargetsCard";
import { ScrollView } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function LandayCheckin() {
  const router = useRouter();
  const [targets, setTargets] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useLocalSearchParams();

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

        // Format the data as needed
        const formattedData = data.map((item) => ({
          id: item.id, // Unique key
          title: item.title,
          description: item.description,
          deadline: item.deadline,
          priority: item.priority,
        }));
        setTargets(formattedData);
      } catch (err) {
        console.error("Error fetching targets:", err.message || err);
      } finally {
        setLoading(false);
      }
    };

    fetchTargets();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            router.push({
              pathname: "/additional/otherProfile",
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
          <Ionicons name="chevron-back" size={30} color="black" />
        </TouchableOpacity>
        <ScrollView style={styles.scrollViewContent}>
          <View style={styles.topNav}>
            <Text style={styles.title}>{params.name}'s Checkin</Text>
          </View>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              What did you do well this week?
            </Text>
            <View style={styles.answerContainer}>
              <Text style={styles.checkMark}>✓</Text>
              <Text style={styles.answerText}>Networking</Text>
            </View>
            <Text style={styles.answerNoCheck}>Submitting Applications</Text>
            <Text style={styles.answerNoCheck}>Interview Prep</Text>
            <View style={styles.answerContainer}>
              <Text style={styles.checkMark}>✓</Text>
              <Text style={styles.answerText}>Community Building</Text>
            </View>
            <View style={styles.answerContainer}>
              <Text style={styles.checkMark}>✓</Text>
              <Text style={styles.answerText}>Self-care</Text>
            </View>
            <Text style={styles.answerNoCheck}>Other</Text>
          </View>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              What do you want to focus on next week?
            </Text>
            <Text style={styles.answerNoCheck}>Networking</Text>
            <View style={styles.answerContainer}>
              <Text style={styles.checkMark}>✓</Text>
              <Text style={styles.answerText}>Submitting Applications</Text>
            </View>
            <View style={styles.answerContainer}>
              <Text style={styles.checkMark}>✓</Text>
              <Text style={styles.answerText}>Interview Prep</Text>
            </View>
            <Text style={styles.answerNoCheck}>Community Building</Text>
            <View style={styles.answerContainer}>
              <Text style={styles.checkMark}>✓</Text>
              <Text style={styles.answerText}>Self-care</Text>
            </View>
            <Text style={styles.answerNoCheck}>Other</Text>
          </View>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              This week, how have you been feeling?
            </Text>
            <View style={styles.answerContainer}>
              <Text style={styles.checkMark}>✓</Text>
              <Text style={styles.answerText}>Anxious</Text>
            </View>
            <Text style={styles.answerNoCheck}>Hopeful</Text>
            <Text style={styles.answerNoCheck}>Scared</Text>
            <View style={styles.answerContainer}>
              <Text style={styles.checkMark}>✓</Text>
              <Text style={styles.answerText}>Confident</Text>
            </View>
            <View style={styles.answerContainer}>
              <Text style={styles.checkMark}>✓</Text>
              <Text style={styles.answerText}>Together</Text>
            </View>
            <Text style={styles.answerNoCheck}>Scattered</Text>
            <Text style={styles.answerNoCheck}>Other</Text>
          </View>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>Any other comments?</Text>
            <View style={styles.answerContainer}>
              <Text style={styles.answerProse}>
                My CS147 group was super helpful for morale this week!
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
    backgroundColor: "f5f5f5",
  },
  questionContainer: {
    flexDirection: "column",
    backgroundColor: Theme.colors.buttonBlue,
    padding: 15,
    marginBottom: 10,
    borderRadius: 20,
    marginVertical: 0,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "left",
  },
  topNav: {
    marginVertical: windowWidth * 0.1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  backButton: {
    position: "absolute",
    top: 75,
    left: 20,
    zIndex: 1,
  },
  buttonContainer: {
    backgroundColor: Theme.colors.buttonBlue,
    borderRadius: 8,
    width: windowWidth * 0.1,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    paddingTop: 30,
    fontSize: Theme.sizes.titleText,
    fontWeight: "bold",
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
    color: "black",
    marginHorizontal: 3,
    marginTop: 0,
    fontSize: Theme.sizes.bodyText,
    fontWeight: "500",
  },
  answerText: {
    textAlign: "left",
    color: "black",
    marginHorizontal: 3,
    marginTop: 10,
    fontSize: Theme.sizes.bodyText,
  },
  answerProse: {
    textAlign: "left",
    color: "black",
    marginHorizontal: 0,
    marginTop: 10,
    fontSize: Theme.sizes.bodyText,
  },
  answerNoCheck: {
    textAlign: "center",
    color: "black",
    marginHorizontal: 36,
    marginTop: 17,
    fontSize: Theme.sizes.bodyText,
  },
  answerContainer: {
    alignItems: "left",
    flexDirection: "row",
    paddingLeft: 20,
    paddingTop: 8,
    alignItems: "baseline",
  },
  list: {
    paddingBottom: 20,
    width: "100%",
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
});
