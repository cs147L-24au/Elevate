import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import Theme from "@/assets/theme";
import db from "@/database/db";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function CreateAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const signUpWithEmailAndPassword = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        Alert.alert("Passwords do not match.");
        setConfirmPassword("");
        return;
      }

      const { data, error } = await db.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert(error.message);
        return;
      }

      const { user } = data;

      const { error: profileError } = await db
        .from("user_info")
        .upsert({ username: username });

      if (profileError) {
        Alert.alert(profileError.message);
      } else {
        router.push("/onboarding/background");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.header}>Account Information</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="Username"
        value={username}
        placeholderTextColor={Theme.colors.placeholderText}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.inputBox}
        placeholder="Email"
        value={email}
        placeholderTextColor={Theme.colors.placeholderText}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.inputBox}
        placeholder="Password"
        value={password}
        placeholderTextColor={Theme.colors.placeholderText}
        onChangeText={setPassword}
        secureTextEntry={true}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.inputBox}
        placeholder="Confirm Password"
        value={confirmPassword}
        placeholderTextColor={Theme.colors.placeholderText}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => signUpWithEmailAndPassword()}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    padding: 20,
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  back: {
    position: "absolute",
    top: 75,
    left: 20,
  },
  title: {
    marginTop: windowHeight * 0.15,
    fontSize: Theme.sizes.titleText,
    fontWeight: "bold",
  },
  header: {
    marginTop: windowHeight * 0.02,
    fontSize: Theme.sizes.headerText,
    fontWeight: "bold",
    marginBottom: windowHeight * 0.05,
  },
  inputBox: {
    fontSize: Theme.sizes.bodyText,
    height: windowHeight * 0.06,
    width: windowWidth * 0.8,
    borderColor: Theme.colors.border,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: Theme.colors.backgroundSecodary,
  },
  buttonContainer: {
    marginTop: windowHeight * 0.1,
    backgroundColor: Theme.colors.buttonBlue,
    padding: 15,
    borderRadius: 8,
    width: windowWidth * 0.8,
    alignItems: "center",
    marginVertical: 20,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: Theme.sizes.headerText,
    fontWeight: "500",
    justifyContent: "center",
    textAlign: "center",
  },
});
