import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Link, useRouter } from "expo-router";

const MemberCard = ({ profile_pic, name }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: profile_pic }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const MemberGrid = ({ members }) => {
  const router = useRouter();

  return (
    <View style={styles.gridContainer}>
      <View style={styles.row}>
        {members[0] && (
          <Link
            href={{
              pathname: "/additional/otherProfile",
              params: {
                id: members[0].id,
                profile_pic: members[0].profile_pic,
                bio: members[0].bio,
                name: members[0].name,
                grad: members[0].grad,
              },
            }}
          >
            <MemberCard
              key={members[0].id}
              profile_pic={members[0].profile_pic}
              name={members[0].name}
            />
          </Link>
        )}
        {members[1] && (
          <Link
            href={{
              pathname: "/additional/otherProfile",
              params: {
                id: members[1].id,
                profile_pic: members[1].profile_pic,
                bio: members[1].bio,
                name: members[1].name,
                grad: members[1].grad,
              },
            }}
          >
            <MemberCard
              key={members[1].id}
              profile_pic={members[1].profile_pic}
              name={members[1].name}
            />
          </Link>
        )}
      </View>
      <View style={styles.row}>
        {members[2] && (
          <Link
            href={{
              pathname: "/additional/otherProfile",
              params: {
                id: members[2].id,
                profile_pic: members[2].profile_pic,
                bio: members[2].bio,
                name: members[2].name,
                grad: members[2].grad,
              },
            }}
          >
            <MemberCard
              key={members[2].id}
              profile_pic={members[2].profile_pic}
              name={members[2].name}
            />
          </Link>
        )}
        {members[3] && (
          <Link
            href={{
              pathname: "/additional/otherProfile",
              params: {
                id: members[3].id,
                profile_pic: members[3].profile_pic,
                bio: members[3].bio,
                name: members[3].name,
                grad: members[3].grad,
              },
            }}
          >
            <MemberCard
              key={members[3].id}
              profile_pic={members[3].profile_pic}
              name={members[3].name}
            />
          </Link>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 20,
    marginBottom: 20,
  },
  card: {
    alignItems: "center",
    borderRadius: 12,
    padding: 10,
    elevation: 0,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    textAlign: "center",
    width: 130,
  },
});

export default MemberGrid;
