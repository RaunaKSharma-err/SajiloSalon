import { LinearGradient } from "expo-linear-gradient";
import { FileQuestion } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "@/constants/Colors";

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
  testID?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  message, 
  icon,
  testID 
}) => {
  return (
    <View style={styles.container} testID={testID}>
      <LinearGradient
        colors={colors.gradient.warm}
        style={styles.iconContainer}
      >
        {icon || <FileQuestion size={48} color="#fff" />}
      </LinearGradient>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  iconContainer: {
    marginBottom: 24,
    padding: 20,
    borderRadius: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
    maxWidth: 300,
    lineHeight: 24,
  },
});

export default EmptyState;