import colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as imagePicker from "expo-image-picker";
import { router } from "expo-router";
import { CameraIcon, User } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function ProfilePage() {
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [avatar, setAvatar] = useState<string>(
    "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"
  );
  const [email, setEmail] = useState("");

  // Fetch profile from supabase
  const fetchProfile = async () => {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) {
      console.log(sessionError.message);
      return;
    }
    if (!session) return;

    setEmail(session.user.email ?? "");

    const { data, error } = await supabase
      .from("profiles")
      .select("username, PhoneNumber, Address, avatar_url")
      .eq("id", session.user.id)
      .single();

    if (error) {
      console.log("Error fetching profile:", error.message);
      return;
    }

    if (data) {
      setUsername(data.username || "");
      setPhone(data.PhoneNumber || "");
      setAddress(data.Address || "");
      setAvatar(
        data.avatar_url &&
          "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"
      );
    }
  };

  // Save/update profile in supabase
  const saveProfile = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    const { error } = await supabase.from("profiles").upsert({
      id: session.user.id,
      username,
      PhoneNumber: phone,
      Address: address,
      avatar_url: avatar,
      updated_at: new Date(),
    });

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    Alert.alert("Success", "Profile updated!");
    setEdit(false);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    fetchProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!session) {
          router.replace("/(auth)/Auth");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const selectImageFromGallery = async () => {
    const image = await imagePicker.launchImageLibraryAsync({
      mediaTypes: imagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!image.canceled) {
      const qrImageUrl = image.assets[0].uri;
      setAvatar(qrImageUrl);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContent}>
        <View>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <View style={styles.headerIcon}>
          <User size={15} color="#fff" />
        </View>
      </View>

      {/* Profile Card */}
      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <TouchableOpacity
            style={styles.editIcon}
            onPress={selectImageFromGallery}
          >
            <CameraIcon size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        {edit ? (
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
          />
        ) : (
          <Text style={styles.name}>{username}</Text>
        )}
        <Text style={styles.email}>{email}</Text>
      </View>

      {/* Info Section */}
      <View style={styles.infoCard}>
        <Ionicons name="call-outline" size={20} color="#555" />
        {edit ? (
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
          />
        ) : (
          <Text style={styles.infoText}>{phone}</Text>
        )}
      </View>
      <View style={styles.infoCard}>
        <Ionicons name="location-outline" size={20} color="#555" />
        {edit ? (
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter address"
          />
        ) : (
          <Text style={styles.infoText}>{address}</Text>
        )}
      </View>

      {/* Action Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => (edit ? saveProfile() : setEdit(true))}
      >
        <Text style={styles.buttonText}>{edit ? "Save" : "Edit Profile"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.lgbutton} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    width: 250,
    marginTop: 10,
    color: "black",
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: colors.card,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  avatarWrapper: { position: "relative" },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.border,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 5,
  },
  name: { fontSize: 20, fontWeight: "600", marginTop: 10, color: colors.text },
  email: { fontSize: 14, color: colors.textLight },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: colors.text,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: { marginLeft: 10, fontSize: 16, color: colors.text },
  button: {
    backgroundColor: colors.primary,
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  lgbutton: {
    backgroundColor: colors.primary,
    marginTop: -5,
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: colors.card, fontSize: 16, fontWeight: "600" },
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
  headerIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 12,
    borderRadius: 20,
  },
});
