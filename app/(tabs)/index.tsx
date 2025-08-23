import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { CheckCircle, User, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import EmptyState from "@/components/EmptyState";
import ServiceCard from "@/components/ServiceCard";
import ServiceSelector from "@/components/ServiceSelector";
import colors from "@/constants/Colors";
import services from "@/constants/services";
import { useTransactions } from "@/hooks/useTransactionStore";
import { Service } from "@/types";
import { Link } from "expo-router";

export default function ServicesScreen() {
  const {
    selectedServices,
    toggleService,
    updateServiceQuantity,
    clearSelection,
    saveTransaction,
    calculateTotal,
    isLoading,
  } = useTransactions();

  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Get unique categories from services
  const categories = [
    "All",
    ...Array.from(new Set(services.map((s) => s.category))),
  ];

  // Filter services by category
  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter((service) => service.category === activeCategory);

  const handleServicePress = (service: Service) => {
    if (Platform.OS !== "web") {
      Haptics.selectionAsync();
    }
    toggleService(service);
  };

  const handleSaveTransaction = () => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    saveTransaction();
  };

  const isServiceSelected = (serviceId: string) => {
    return selectedServices.some((s) => s.id === serviceId);
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
          <Text style={styles.headerTitle}>Sajilo Salon</Text>
          <Text style={styles.headerSubtitle}>Get Your Dream Haircut</Text>
        </View>
        <View style={styles.headerIcon}>
          <Link href={"/(tabs)/Profile"}>
            <User size={24} color="#fff" />
          </Link>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                activeCategory === category && styles.activeCategoryButton,
              ]}
              onPress={() => setActiveCategory(category)}
              testID={`category-${category}`}
            >
              <LinearGradient
                colors={
                  activeCategory === category
                    ? colors.gradient.secondary
                    : [colors.backgroundSecondary, colors.backgroundSecondary]
                }
                style={styles.categoryGradient}
              >
                <Text
                  style={[
                    styles.categoryText,
                    activeCategory === category && styles.activeCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Services List */}
      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ServiceCard
            service={item}
            isSelected={isServiceSelected(item.id)}
            onPress={() => handleServicePress(item)}
            testID={`service-${item.id}`}
          />
        )}
        contentContainerStyle={styles.servicesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            title="No Services Found"
            message="There are no services in this category."
            testID="empty-services"
          />
        }
      />

      {/* Selected Services Panel */}
      {selectedServices.length > 0 && (
        <View style={styles.selectedServicesContainer}>
          <LinearGradient
            colors={[colors.card, colors.backgroundSecondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.selectedServicesGradient}
          >
            <View style={styles.selectedServicesHeader}>
              <Text style={styles.selectedServicesTitle}>
                Selected Services
              </Text>
              <TouchableOpacity
                onPress={clearSelection}
                style={styles.clearButton}
                testID="clear-selection"
              >
                <LinearGradient
                  colors={[colors.error, "#DC2626"]}
                  style={styles.clearButtonGradient}
                >
                  <X size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.selectedServicesList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.selectedServicesContent}
            >
              {selectedServices.map((service) => (
                <ServiceSelector
                  key={service.id}
                  service={service}
                  onUpdateQuantity={updateServiceQuantity}
                  onRemove={(id) => updateServiceQuantity(id, 0)}
                  testID={`selected-service-${service.id}`}
                />
              ))}
            </ScrollView>

            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <LinearGradient
                colors={colors.gradient.success}
                style={styles.totalAmountContainer}
              >
                <Text style={styles.totalAmount}>
                  ${calculateTotal().toFixed(2)}
                </Text>
              </LinearGradient>
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveTransaction}
              testID="save-transaction"
            >
              <LinearGradient
                colors={colors.gradient.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.saveButtonGradient}
              >
                <CheckCircle size={25} color="#fff" />
                <Text style={styles.saveButtonText}>Complete Transaction</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}
    </View>
  );
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
  categoriesContainer: {
    backgroundColor: colors.card,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoriesScrollContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    marginRight: 12,
    borderRadius: 25,
    overflow: "hidden",
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
  categoryText: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: "600",
  },
  activeCategoryText: {
    color: "#fff",
    fontWeight: "700",
  },
  servicesList: {
    padding: 20,
    paddingBottom: 200,
  },
  selectedServicesContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    maxHeight: "45%",
    overflow: "hidden",
  },
  selectedServicesGradient: {
    flex: 1,
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: 160,
  },
  selectedServicesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  selectedServicesTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  clearButton: {
    borderRadius: 16,
    overflow: "hidden",
  },
  clearButtonGradient: {
    padding: 8,
  },
  selectedServicesList: {
    maxHeight: 170,
    marginBottom: 8,
    paddingVertical: 2,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  totalAmountContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
  },
  saveButton: {
    marginTop: 12,
    borderRadius: 16,
    overflow: "hidden",
  },
  saveButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
  selectedServicesContent: {
    paddingBottom: 8,
  },
});
