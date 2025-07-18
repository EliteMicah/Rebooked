import {
  StyleSheet,
  TouchableOpacity,
  Linking,
  Text,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ResourcesScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.mainContainer} edges={["top"]}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerBackVisible: true,
          headerTransparent: true,
          headerBackTitle: "‎", // Empty Whitespace Character for back button
          headerTintColor: "black",
        }}
      />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Text style={styles.mainTitle}>Resources</Text>

        {/* First Column */}
        <View style={styles.columnContainer}>
          <Text style={styles.columnTitle}>School</Text>
          <TouchableOpacity style={styles.buttonContainer}>
            <Ionicons name="happy-outline" size={23} style={styles.icon} />
            <Text style={styles.buttonTitle}>Clubs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Ionicons name="sparkles-outline" size={23} style={styles.icon} />
            <Text style={styles.buttonTitle}>Events</Text>
          </TouchableOpacity>
        </View>

        {/* Second Column */}
        <View style={styles.columnContainer}>
          <Text style={styles.columnTitle}>Church</Text>
          <TouchableOpacity style={styles.buttonContainer}>
            <Ionicons name="flame-outline" size={23} style={styles.icon} />
            <Text style={styles.buttonTitle}>Churches near you</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Ionicons name="journal-outline" size={23} style={styles.icon} />
            <Text style={styles.buttonTitle}>Bible Studies</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Ionicons name="people-outline" size={23} style={styles.icon} />
            <Text style={styles.buttonTitle}>Get Connected</Text>
          </TouchableOpacity>
        </View>

        {/* Third Column */}
        <View style={styles.columnContainer}>
          <Text style={styles.columnTitle}>About Us</Text>
          <TouchableOpacity style={styles.buttonContainer}>
            <Ionicons name="leaf-outline" size={23} style={styles.icon} />
            <Text style={styles.buttonTitle}>Mission Statement</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Ionicons name="download-outline" size={23} style={styles.icon} />
            <Text style={styles.buttonTitle}>Updates · What's new</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => router.push("/home/homeScreens/donateScreen")}
          >
            <Ionicons name="heart-outline" size={23} style={styles.icon} />
            <Text style={styles.buttonTitle}>Donate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() =>
              Linking.openURL("https://forms.gle/6C28tioZvK54M6CG6")
            }
          >
            <Ionicons name="hammer-outline" size={23} style={styles.icon} />
            <Text style={styles.buttonTitle}>Give Feedback</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f2f2f2",
    justifyContent: "flex-start",
  },
  scroll: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 35,
    fontWeight: "800",
    color: "#38b6ff",
    shadowColor: "#aaa",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    marginBottom: 10,
    marginTop: -40,
    alignSelf: "center",
  },
  columnContainer: {
    flex: 0,
    width: "85%",
    flexDirection: "column",
    marginHorizontal: 30,
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
  },
  columnTitle: {
    fontSize: 20,
    fontWeight: 600,
    shadowColor: "#aaa",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    marginBottom: "2%",
  },
  buttonContainer: {
    width: "100%",
    height: 40,
    borderRadius: 10,
    backgroundColor: "#e3e2e7",
    flexDirection: "row",
    marginBottom: 10,
  },
  icon: {
    paddingLeft: 10,
    paddingRight: 5,
    alignSelf: "center",
    opacity: 0.7,
    marginRight: 5,
  },
  buttonTitle: {
    alignSelf: "center",
    fontSize: 18,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
