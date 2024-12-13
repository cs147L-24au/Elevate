import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";

import React, { useState, useEffect } from "react";

import { useRouter } from "expo-router";
import Theme from "@/assets/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

import Feather from "@expo/vector-icons/Feather";

import db from "@/database/db";

// Import TargetsCard
import TargetsCard from "@/components/TargetsCard";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function AllTargets() {
  const router = useRouter();
  const [targets, setTargets] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/tabs/personalHome")}
      >
        <Ionicons name="chevron-back" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.topNav}>
        <Text style={styles.title}>My Targets</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => router.push("/additional/target/setTarget")}
        >
          <Feather name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.list}
        data={targets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <TargetsCard
              title={item.title}
              description={item.description}
              deadline={item.deadline}
              priority={item.priority}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#EEF7FB",
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
    fontSize: Theme.sizes.titleText,
    fontWeight: "bold",
  },
  list: {
    paddingBottom: 20,
    width: "100%",
  },
});
