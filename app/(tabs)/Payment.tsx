import colors from "@/constants/Colors";
import { useTransactions } from "@/hooks/useTransactionStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as imagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { CheckCircle, IndianRupee } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PaymentScreen() {
  const { isLoading } = useTransactions();
  const [ImageUrl, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    const GetqrImage = async () => {
      const QRImage: string | null = await AsyncStorage.getItem(
        "qr_image_saloonApp"
      );
      setImageUri(QRImage);
    };
    GetqrImage();
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
      await AsyncStorage.setItem("qr_image_saloonApp", qrImageUrl);
      setImageUri(qrImageUrl);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.headerContent}>
        <View>
          <Text style={styles.headerTitle}>Payment </Text>
          <Text style={styles.headerSubtitle}>Scan qr code for payment</Text>
        </View>
        <View style={styles.headerIcon}>
          <IndianRupee size={24} color="#fff" />
        </View>
      </View>

      {/* image Section */}
      <View style={styles.Container}>
        {ImageUrl && <Image source={{ uri: ImageUrl }} style={styles.image} />}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={selectImageFromGallery}
        >
          <LinearGradient
            colors={colors.gradient.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveButtonGradient}
          >
            <CheckCircle size={25} color="#fff" />
            <Text style={styles.saveButtonText}>Upload your Qr</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  activeCategoryButton: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  categoryGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  image: {
    width: 400,
    height: 550,
    borderRadius: 10,
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
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
  filterContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterGradient: {
    padding: 20,
  },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  filterIconContainer: {
    backgroundColor: colors.secondaryLight,
    padding: 8,
    borderRadius: 12,
    marginRight: 12,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  filterButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterButtonContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  filterButtonText: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: "600",
  },
  activeFilterButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  transactionsList: {
    padding: 20,
    paddingBottom: 32,
  },
  saveButton: {
    marginTop: 50,
    borderRadius: 16,
    overflow: "hidden",
  },
  saveButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    width: 400,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});
