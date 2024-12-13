import { useState } from "react";
import {
  Text,
  Alert,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import db from "@/database/db";
import { useRouter } from "expo-router";

import Theme from "@/assets/theme";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const signInWithEmail = async () => {
    setLoading(true);
    try {
      const { data, error } = await db.auth.signInWithPassword({
        email: email,
        password: password,
        options: {
          shouldCreateUser: false,
        },
      });

      if (error) {
        Alert.alert(error.message);
        setEmail("");
        setPassword("");
      } else {
        console.log("Success");
        router.push("/tabs/groupHome");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isSignInDisabled =
    loading || email.length === 0 || password.length === 0;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={30} color="black" />
      </TouchableOpacity>
      <Image
        style={styles.logo}
        source={require("@/assets/images/logo.png")}
        resizeMode="contain"
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
        placeholderTextColor={Theme.colors.placeholderText}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => signInWithEmail()}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginTop: windowHeight * 0.2,
    width: windowWidth * 0.9,
    height: windowHeight * 0.2,
  },
  container: {
    alignItems: "center",
    flex: 1,
    padding: 20,
    backgroundColor: "#EEF7FB",
  },
  back: {
    position: "absolute",
    top: 75,
    left: 20,
  },
  inputBox: {
    fontSize: Theme.sizes.bodyText,
    height: windowHeight * 0.06,
    width: windowWidth * 0.8,
    borderColor: Theme.colors.border,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: "white",
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
