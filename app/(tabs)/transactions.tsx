import { LinearGradient } from "expo-linear-gradient";
import { Calendar, Filter, TrendingUp } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import EmptyState from "@/components/EmptyState";
import TransactionCard from "@/components/TransactionCard";
import colors from "@/constants/Colors";
import { useTransactions } from "@/hooks/useTransactionStore";
import { FilterPeriod } from "@/types";

export default function TransactionsScreen() {
  const { isLoading } = useTransactions();
  const [activeFilter, setActiveFilter] = useState<FilterPeriod>("7days");

  const filteredTransactions = useFilteredTransactions(activeFilter);

  const filters: { label: string; value: FilterPeriod }[] = [
    { label: "Last 7 Days", value: "7days" },
    { label: "Last 15 Days", value: "15days" },
    { label: "Last 30 Days", value: "30days" },
    { label: "All", value: "all" },
  ];

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
            <Text style={styles.headerTitle}>Transaction History</Text>
            <Text style={styles.headerSubtitle}>Track your salon business</Text>
          </View>
          <View style={styles.headerIcon}>
            <TrendingUp size={24} color="#fff" />
          </View>
        </View>
      </LinearGradient>

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <LinearGradient
          colors={[colors.card, colors.backgroundSecondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.filterGradient}
        >
          <View style={styles.filterHeader}>
            <View style={styles.filterIconContainer}>
              <Filter size={16} color={colors.primary} />
            </View>
            <Text style={styles.filterTitle}>Filter Transactions</Text>
          </View>

          <View style={styles.filterButtons}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.value}
                style={styles.filterButtonContainer}
                onPress={() => setActiveFilter(filter.value)}
                testID={`filter-${filter.value}`}
              >
                <LinearGradient
                  colors={
                    activeFilter === filter.value
                      ? colors.gradient.primary
                      : [colors.backgroundSecondary, colors.backgroundSecondary]
                  }
                  style={styles.filterButton}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      activeFilter === filter.value &&
                        styles.activeFilterButtonText,
                    ]}
                  >
                    {filter.label}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </LinearGradient>
      </View>

      {/* Transactions List */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionCard
            transaction={item}
            testID={`transaction-${item.id}`}
          />
        )}
        contentContainerStyle={styles.transactionsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            title="No Transactions Found"
            message="There are no transactions in the selected time period."
            icon={<Calendar size={40} color={colors.primaryLight} />}
            testID="empty-transactions"
          />
        }
      />
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
