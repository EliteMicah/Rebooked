import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useState } from "react";

export default function SchoolVerificationScreen() {
  const router = useRouter();
  const [schoolEmail, setSchoolEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const validateSchoolEmail = (email: string): boolean => {
    const eduEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/;
    return eduEmailRegex.test(email);
  };

  const handleSendCode = async () => {
    if (!validateSchoolEmail(schoolEmail)) {
      // You might want to add your own error handling UI here
      alert("Please enter a valid .edu email address");
      return;
    }

    setLoading(true);
    try {
      // Add your email verification logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
      setCodeSent(true);
    } catch (error) {
      alert("Failed to send verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      alert("Please enter the verification code");
      return;
    }

    setLoading(true);
    try {
      // Add your code verification logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
      router.replace("/(tabs)/home"); // Navigate to home after verification
    } catch (error) {
      alert("Failed to verify code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.title}>Verify Your School Email</Text>
      <Text style={styles.subtitle}>
        Please enter your school email address to verify your student status
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="School Email (.edu)"
          placeholderTextColor="#999"
          value={schoolEmail}
          onChangeText={setSchoolEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!codeSent}
        />
        {codeSent && (
          <TextInput
            style={styles.input}
            placeholder="Enter verification code"
            placeholderTextColor="#999"
            value={verificationCode}
            returnKeyType="done"
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
          />
        )}
      </View>

      {!codeSent ? (
        <TouchableOpacity
          style={[styles.verifyButton, loading && styles.buttonDisabled]}
          onPress={handleSendCode}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.verifyButtonText}>SEND VERIFICATION CODE</Text>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.verifyButton, loading && styles.buttonDisabled]}
          onPress={handleVerifyCode}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.verifyButtonText}>VERIFY CODE</Text>
          )}
        </TouchableOpacity>
      )}

      {codeSent && (
        <TouchableOpacity
          style={styles.resendButton}
          onPress={() => {
            setCodeSent(false);
            setVerificationCode("");
          }}
        >
          <Text style={styles.resendButtonText}>Resend Code</Text>
        </TouchableOpacity>
      )}

      <View style={styles.skipButton}>
        <TouchableOpacity onPress={() => router.replace("/(tabs)/home")}>
          <Text style={styles.skipText}>Skip Verification</Text>
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
  verifyButton: {
    backgroundColor: "#222",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  verifyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  resendButton: {
    alignItems: "center",
    padding: 10,
  },
  resendButtonText: {
    color: "#ff6b00",
    fontSize: 14,
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
});
