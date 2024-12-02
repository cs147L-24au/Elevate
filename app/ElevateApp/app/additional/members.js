import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { useRouter } from "expo-router";
import Theme from "@/assets/theme";
import { SafeAreaView } from "react-native-safe-area-context";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import MemberCard from "@/components/MemberCard";

const windowWidth = Dimensions.get("window").width;

export default function Members() {
  const router = useRouter();

  // temporary information before backend
  const members = [
    {
      id: "1",
      profilePicture: "https://via.placeholder.com/50",
      name: "CJ Indart",
      bio: "Loves programming and open-source projects. Click to see full profile!",
    },
    {
      id: "2",
      profilePicture: "https://via.placeholder.com/50",
      name: "Riley Pittman",
      bio: "Avid traveler and photography enthusiast.",
    },
    {
      id: "3",
      profilePicture: "https://via.placeholder.com/50",
      name: "Grace Miller",
      bio: "Music lover and aspiring DJ.",
    },
    {
      id: "4",
      profilePicture: "https://via.placeholder.com/50",
      name: "Ginelle Servat",
      bio: "Dog lover and extreme traveler.",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topNav}>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesomeIcon icon={faArrowLeft} size={24} color="black" />
          </TouchableOpacity>
        </View>
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
    backgroundColor: Theme.colors.backgroundPrimary,
    flex: 1,
  },
  topNav: {
    marginVertical: windowWidth * 0.1,
    marginHorizontal: windowWidth * 0.07,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  title: {
    fontWeight: "600",
    fontSize: 32,
  },
  list: {
    paddingBottom: 20,
  },
});
