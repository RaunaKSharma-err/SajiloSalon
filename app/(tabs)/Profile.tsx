import colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { CameraIcon, User } from "lucide-react-native";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfilePage() {
  const user = {
    name: "john adam",
    email: "john@example.com",
    phone: "+977 00000000",
    address: "Kathmandu, Nepal",
    avatar: "https://i.pravatar.cc/307", // placeholder avatar
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContent}>
        <View>
          <Text style={styles.headerTitle}>Profile </Text>
          {/* <Text style={styles.headerSubtitle}>Scan qr code for payment</Text> */}
        </View>
        <View style={styles.headerIcon}>
          <User size={15} color="#fff" />
        </View>
      </View>

      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <TouchableOpacity style={styles.editIcon}>
            <CameraIcon size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* Info Section */}
      <View style={styles.infoCard}>
        <Ionicons name="call-outline" size={20} color="#555" />
        <Text style={styles.infoText}>{user.phone}</Text>
      </View>
      <View style={styles.infoCard}>
        <Ionicons name="location-outline" size={20} color="#555" />
        <Text style={styles.infoText}>{user.address}</Text>
      </View>

      {/* Action Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.lgbutton}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // was "#f9f9f9"
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: colors.card, // was "#fff"
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight, // was "#eee"
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.border, // was "#ddd"
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary, // was "#007AFF"
    borderRadius: 20,
    padding: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    color: colors.text, // was default text color
  },
  email: {
    fontSize: 14,
    color: colors.textLight, // was "#666"
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card, // was "#fff"
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: colors.text, // subtle shadow
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.text, // was "#333"
  },
  button: {
    backgroundColor: colors.primary, // was "#007AFF"
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  lgbutton: {
    backgroundColor: colors.primary, // was "#007AFF"
    marginTop: -5,
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: colors.card, // was "#fff"
    fontSize: 16,
    fontWeight: "600",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingTop: 40,
    backgroundColor: "#8a964c",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
  },
  headerIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 12,
    borderRadius: 20,
  },
});
