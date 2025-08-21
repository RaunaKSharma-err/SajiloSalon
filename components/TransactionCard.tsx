import { LinearGradient } from "expo-linear-gradient";
import { Calendar, Receipt } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "@/constants/Colors";
import { Transaction } from "@/types";

interface TransactionCardProps {
  transaction: Transaction;
  onPress?: () => void;
  testID?: string;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onPress,
  testID,
}) => {
  // Format date to a readable string
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Count total number of services
  const serviceCount = transaction.services.reduce(
    (count, service) => count + service.quantity,
    0
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
      testID={testID}
    >
      <LinearGradient
        colors={[colors.card, colors.backgroundSecondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <View style={styles.iconContainer}>
              <Receipt size={16} color={colors.primary} />
            </View>
            <View>
              <View style={styles.dateContainer}>
                <Calendar size={12} color={colors.textMuted} />
                <Text style={styles.date}>{formatDate(transaction.date)}</Text>
              </View>
              <Text style={styles.serviceCount}>
                {serviceCount} {serviceCount === 1 ? "service" : "services"}
              </Text>
            </View>
          </View>
          <LinearGradient
            colors={colors.gradient.success}
            style={styles.totalContainer}
          >
            <Text style={styles.total}>${transaction.total.toFixed(2)}</Text>
          </LinearGradient>
        </View>

        <View style={styles.servicesContainer}>
          {transaction.services.slice(0, 2).map((service) => (
            <View key={service.id} style={styles.serviceItem}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                {service.quantity > 1 && (
                  <View style={styles.quantityBadge}>
                    <Text style={styles.quantityText}>×{service.quantity}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.servicePrice}>
                ${(service.price * service.quantity).toFixed(2)}
              </Text>
            </View>
          ))}

          {transaction.services.length > 2 && (
            <View style={styles.moreServicesContainer}>
              <Text style={styles.moreServices}>
                +{transaction.services.length - 2} more services
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    overflow: "hidden",
  },
  gradientContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    backgroundColor: colors.secondaryLight,
    padding: 8,
    borderRadius: 12,
    marginRight: 12,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: colors.textMuted,
    marginLeft: 4,
    fontWeight: "500",
  },
  serviceCount: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: "600",
  },
  totalContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
    alignItems: "center",
  },
  total: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
  },
  servicesContainer: {
    gap: 8,
  },
  serviceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.backgroundSecondary,
    padding: 12,
    borderRadius: 12,
  },
  serviceInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  serviceName: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "600",
    flex: 1,
  },
  quantityBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  quantityText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "700",
  },
  servicePrice: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "700",
  },
  moreServicesContainer: {
    backgroundColor: colors.accentLight,
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  moreServices: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: "600",
  },
});

export default TransactionCard;
