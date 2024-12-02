import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const MemberCard = ({ profilePicture, name, bio }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: profilePicture }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.bio}>{bio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bio: {
    fontSize: 14,
    color: "gray",
  },
});

export default MemberCard;
