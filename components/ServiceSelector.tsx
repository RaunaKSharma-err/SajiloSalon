import { LinearGradient } from "expo-linear-gradient";
import { Minus, Plus } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "@/constants/Colors";
import { SelectedService } from "@/types";

interface ServiceSelectorProps {
  service: SelectedService;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  testID?: string;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  service,
  onUpdateQuantity,
  onRemove,
  testID
}) => {
  const handleIncrement = () => {
    onUpdateQuantity(service.id, service.quantity + 1);
  };

  const handleDecrement = () => {
    if (service.quantity > 1) {
      onUpdateQuantity(service.id, service.quantity - 1);
    } else {
      onRemove(service.id);
    }
  };

  return (
    <View style={styles.container} testID={testID}>
      <LinearGradient
        colors={[colors.card, colors.backgroundSecondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.servicePrice}>${service.price} each</Text>
        </View>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButtonContainer} 
            onPress={handleDecrement}
            testID={`${testID}-decrement`}
          >
            <LinearGradient
              colors={[colors.error, "#DC2626"]}
              style={styles.quantityButton}
            >
              <Minus size={14} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
          
          <View style={styles.quantityDisplay}>
            <Text style={styles.quantityText}>{service.quantity}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.quantityButtonContainer} 
            onPress={handleIncrement}
            testID={`${testID}-increment`}
          >
            <LinearGradient
              colors={colors.gradient.success}
              style={styles.quantityButton}
            >
              <Plus size={14} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        
        <LinearGradient
          colors={colors.gradient.primary}
          style={styles.totalPriceContainer}
        >
          <Text style={styles.totalPrice}>
            ${(service.price * service.quantity).toFixed(2)}
          </Text>
        </LinearGradient>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
  },
  gradientContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderLight,
    minHeight: 56,
  },
  serviceInfo: {
    flex: 1,
    marginRight: 8,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 2,
  },
  servicePrice: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: "500",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  quantityButtonContainer: {
    borderRadius: 14,
    overflow: "hidden",
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityDisplay: {
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginHorizontal: 8,
    minWidth: 40,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
  },
  totalPriceContainer: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    minWidth: 60,
    alignItems: "center",
  },
  totalPrice: {
    fontSize: 13,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
  },
});

export default ServiceSelector;