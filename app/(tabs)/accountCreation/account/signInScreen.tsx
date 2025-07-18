import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { supabase } from "../../../../lib/supabase";

export default function SignInScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to check if all fields are filled
  const areAllFieldsFilled = () => {
    return email.trim() !== "" && password.trim() !== "";
  };

  async function signInWithEmail() {
    if (!areAllFieldsFilled()) return;

    setLoading(true);
    try {
      // First, ensure we're starting with a clean slate
      await supabase.auth.signOut();

      // Now attempt sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      if (data.session) {
        // Clear any local state if needed
        // If you have any global state management, reset it here

        // Navigate to home screen
        router.replace("/(tabs)/home");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Enter your Email and Password</Text>
      <View style={styles.separator}></View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="School Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.signUpButton,
          (!areAllFieldsFilled() || loading) && { opacity: 0.5 },
        ]}
        disabled={!areAllFieldsFilled() || loading}
        onPress={signInWithEmail}
      >
        <Text style={styles.signUpButtonText}>
          {loading ? "SIGNING IN..." : "LOGIN"}
        </Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() =>
            router.replace("/(tabs)/accountCreation/account/signUpScreen")
          }
        >
          <Text style={styles.loginLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  signUpButton: {
    backgroundColor: "#222",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  signUpButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "#666",
  },
  loginLink: {
    color: "#ff6b00",
    fontWeight: "500",
  },
  skipButton: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
  skipText: {
    color: "#999",
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    paddingHorizontal: 10,
    color: "#999",
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
  },
  socialButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  separator: {
    marginVertical: 40,
  },
});
