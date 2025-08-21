import colors from "@/constants/Colors";
import { useTransactions } from "@/hooks/useTransactionStore";
import { FilterPeriod } from "@/types";
import * as imagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { IndianRupee } from "lucide-react-native";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function PaymentScreen() {
  const { isLoading } = useTransactions();
  const [ImageUrl, setImageUri] = useState<string | null>(null);

  const selectImageFromGallery = async () => {
    const image = await imagePicker.launchImageLibraryAsync({
      mediaTypes: imagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!image.canceled) {
      setImageUri(image.assets[0].uri);
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
      <LinearGradient
        colors={colors.gradient.secondary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Payment </Text>
            <Text style={styles.headerSubtitle}>Scan qr code for payment</Text>
          </View>
          <View style={styles.headerIcon}>
            <IndianRupee size={24} color="#fff" />
          </View>
        </View>
      </LinearGradient>

      {/* image Section */}
      <View style={styles.filterContainer}>
        {/* {if(ImageUrl) {
          <Text>{ImageUrl}</Text>
        }
        } */}
      </View>
    </View>
  );
}

// Custom hook for filtered transactions
function useFilteredTransactions(filter: FilterPeriod) {
  const { getFilteredTransactions } = useTransactions();
  return getFilteredTransactions(filter);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingTop: 40,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
});
