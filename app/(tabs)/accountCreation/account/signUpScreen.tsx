import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useState } from "react";

export default function SignUpScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Function to check if all fields are filled
  const areAllFieldsFilled = () => {
    return (
      username.trim() !== "" &&
      username.length >= 3 &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      !email.toLowerCase().endsWith(".edu") &&
      password === confirmPassword
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Create your account</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999"
          maxLength={20}
          value={username}
          onChangeText={(text) => {
            const noSpaces = text.replace(/\s/g, "");
            setUsername(noSpaces);
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === " ") {
              return;
            }
          }}
        />
        <TextInput
          style={[styles.input, emailError ? { borderColor: "red" } : null]}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (text.toLowerCase().endsWith(".edu")) {
              setEmailError("Please do not use a school email address");
            } else {
              setEmailError("");
            }
          }}
        />
        {emailError ? (
          <Text style={{ color: "red", marginTop: 5, marginLeft: 10 }}>
            {emailError}
          </Text>
        ) : null}

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
        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.passwordInput,
              passwordError ? { borderColor: "red" } : null,
            ]}
            placeholder="Confirm your password"
            placeholderTextColor="#999"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (text !== password) {
                setPasswordError("Passwords do not match");
              } else {
                setPasswordError("");
              }
            }}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Feather
              name={showConfirmPassword ? "eye" : "eye-off"}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <Text style={{ color: "red", marginTop: 5, marginLeft: 10 }}>
            {passwordError}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={[styles.signUpButton, !areAllFieldsFilled() && { opacity: 0.5 }]}
        disabled={!areAllFieldsFilled()}
        onPress={() => {
          if (!areAllFieldsFilled()) {
            return;
          }
          router.push(
            "/(tabs)/accountCreation/account/schoolVerificationScreen"
          );
        }}
      >
        <Text style={styles.signUpButtonText}>SIGN UP</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity
          onPress={() =>
            router.replace("/(tabs)/accountCreation/account/signInScreen")
          }
        >
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Or Sign Up with</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="apple1" size={20} color="black" />
          <Text style={styles.socialButtonText}>Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="google" size={20} color="#DB4437" />
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.skipButton}>
        <TouchableOpacity onPress={() => router.replace("/(tabs)/home")}>
          <Text style={styles.skipText}>Skip to Home Screen</Text>
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
    marginBottom: 50,
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
});
