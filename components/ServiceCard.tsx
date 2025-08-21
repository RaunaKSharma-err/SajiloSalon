import { LinearGradient } from "expo-linear-gradient";
import { Scissors, Star } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "@/constants/Colors";
import { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onPress: () => void;
  testID?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isSelected,
  onPress,
  testID,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onPress}
      activeOpacity={0.8}
      testID={testID}
    >
      <LinearGradient
        colors={
          isSelected
            ? [colors.card, colors.secondaryLight]
            : [colors.card, colors.card]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{service.name}</Text>
              <View style={styles.ratingContainer}>
                <Star size={12} color={colors.accent} fill={colors.accent} />
                <Text style={styles.rating}>4.8</Text>
              </View>
            </View>
            <LinearGradient
              colors={colors.gradient.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.priceContainer}
            >
              <Text style={styles.price}>${service.price}</Text>
            </LinearGradient>
          </View>
          <Text style={styles.description}>{service.description}</Text>
          <View style={styles.footer}>
            <View style={styles.metaContainer}>
              <View style={styles.durationContainer}>
                <Text style={styles.duration}>{service.duration} min</Text>
              </View>
              <View style={styles.categoryContainer}>
                <Text style={styles.category}>{service.category}</Text>
              </View>
            </View>
          </View>
        </View>
        {isSelected && (
          <View style={styles.selectedIndicator}>
            <LinearGradient
              colors={colors.gradient.secondary}
              style={styles.selectedIconContainer}
            >
              <Scissors size={16} color="#fff" />
            </LinearGradient>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  selectedContainer: {
    shadowColor: colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  gradientContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  nameContainer: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.accent,
    marginLeft: 4,
  },
  priceContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 70,
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
  },
  description: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 16,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  durationContainer: {
    backgroundColor: colors.accentLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 12,
  },
  duration: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.accent,
  },
  categoryContainer: {
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  category: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "600",
  },
  selectedIndicator: {
    position: "absolute",
    top: 16,
    right: 16,
    borderRadius: 20,
    overflow: "hidden",
  },
  selectedIconContainer: {
    padding: 8,
  },
});

export default ServiceCard;
