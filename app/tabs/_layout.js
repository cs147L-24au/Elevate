import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarStyle: { backgroundColor: "black", height: 80 },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="groupHome"
          options={{
            title: "Crew",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="group" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="groupChat"
          options={{
            title: "Chat",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="comments" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="personalHome"
          options={{
            title: "Home",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="user" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
