import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import Theme from "@/assets/theme";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from "react";

import db from "@/database/db";

import MemberGrid from "@/components/MemberGrid";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Group() {
  const router = useRouter();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [targets, setTargets] = useState([]);
  const [prof, setProf] = useState(null);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

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
          .select("id, username, profile_pic, bio, grad");
        if (error) {
          throw error;
        }
        const filteredData = data.filter((item) => item.id !== user_id);

        const formattedData = filteredData.map((item) => ({
          id: item.id,
          profile_pic: item.profile_pic,
          name: item.username,
          bio: item.bio,
          grad: item.grad,
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
          .select("id, title, description, deadline, priority");

        if (error) {
          throw error;
        }
        const filteredData = data.filter((item) => item.id !== user_id);

        // Format the data and sort by closest deadline
        const formattedData = filteredData
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
        if (formattedData.length > 0) {
          const { data: pic, error: pic_error } = await db
            .from("users")
            .select("profile_pic")
            .eq("id", formattedData[0].id);

          if (pic_error) throw pic_error;

          setProf(pic[0].profile_pic);
        }

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
    <SafeAreaView>
      <View style={styles.topNav}>
        <Text style={styles.title}>Crew</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.group}>
          {loading ? (
            <Text>Loading members...</Text>
          ) : (
            <MemberGrid members={members} />
          )}
        </View>
        <Text style={styles.header}>Upcoming Member Targets</Text>
        {targets.length > 0 ? (
          <View style={styles.targetButton}>
            <View style={styles.row}>
              {/* Profile picture from URL */}
              <ImageBackground
                source={{
                  uri: prof,
                }}
                style={styles.profileImage}
                imageStyle={{ borderRadius: 50 }}
              ></ImageBackground>
              <View style={styles.targetButtonTextContainer}>
                <Text style={styles.targetButtonText}>{targets[0].title}</Text>
                <Text style={styles.targetButtonTextBottom}>
                  due: {formatDate(targets[0].deadline)}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.noTargetsContainer}>
            <Text style={styles.noTargetsText}>No targets set!</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    resizeMode: "cover",
  },
  container: {},
  content: {
    flexDirection: "column",
  },
  topNav: {
    marginVertical: windowWidth * 0.1,
    marginHorizontal: windowWidth * 0.07,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    marginBottom: 20,
    fontSize: 34,
    fontWeight: "600",
  },
  noTargetsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 150,
  },
  buttonContainer: {
    backgroundColor: Theme.colors.buttonWhite,
    borderRadius: 8,
    width: windowWidth * 0.25,
    height: windowWidth * 0.08,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: Theme.sizes.bodyText,
    fontWeight: "600",
  },
  group: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: windowHeight * 0.4,
  },
  groupGoalsContaier: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: windowHeight * 0.3,
  },
  header: {
    marginTop: windowHeight * 0.05,
    fontSize: Theme.sizes.headerText,
    paddingHorizontal: 35,
  },
  tempText: {
    height: 20,
    borderRadius: 5,
    width: windowWidth * 0.45,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
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
    justifyContent: "space-between",
  },
  targetButtonTextContainer: {
    marginLeft: 10,
  },
  targetButtonText: {
    marginLeft: 10,
    fontSize: Theme.sizes.bodyText,
    fontWeight: "500",
    color: "black",
  },
  targetButtonTextBottom: {
    marginLeft: 10,
    fontSize: 14,
    color: "black",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  profileImage: {
    aspectRatio: 1,
    width: windowWidth * 0.15,
    marginRight: 10,
  },
});
