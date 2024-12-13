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

import MemberCard from "@/components/MemberGrid";

import db from "@/database/db";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Members() {
  const router = useRouter();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const {
          data: { session },
        } = await db.auth.getSession();
        const user_id = session?.user?.id;

        setLoading(true);
        const { data, error } = await db
          .from("users")
          .select("id, username, bio, profile_pic");
        if (error) {
          throw error; 
        }
        const filteredData = data.filter((item) => item.id !== user_id);

        const formattedData = filteredData.map((item) => ({
          id: item.id, 
          profilePicture: item.profile_pic,
          name: item.username,
          bio: item.bio,
        }));
        setMembers(formattedData);
      } catch (err) {
        console.error("Error fetching members:", err.message || err);
      } finally {
        setLoading(false); 
      }
    };

    fetchMembers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/tabs/groupHome")}
      >
        <Ionicons name="chevron-back" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.topNav}>
        <Text style={styles.title}>Group Members</Text>
      </View>

      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => alert("not implemented yet!")}>
            <MemberCard
              profilePicture={item.profilePicture}
              name={item.name}
              bio={item.bio}
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
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  topNav: {
    marginBottom: windowWidth * 0.05,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 75,
    left: 20,
    zIndex: 1,
  },
  title: {
    textAlign: "center",
    marginTop: windowHeight * 0.02,
    fontSize: Theme.sizes.titleText,
    fontWeight: "bold",
  },
  list: {
    paddingBottom: 20,
    width: "100%",
  },
});
