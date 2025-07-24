import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { FilterPeriod, Service, SelectedService, Transaction } from "@/types";

const STORAGE_KEY = "salon_transactions";

export const [TransactionProvider, useTransactions] = createContextHook(() => {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load transactions from AsyncStorage
  const transactionsQuery = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          return JSON.parse(storedData) as Transaction[];
        }
        return [];
      } catch (error) {
        console.error("Error loading transactions:", error);
        return [];
      }
    }
  });

  // Save transactions to AsyncStorage
  const saveMutation = useMutation({
    mutationFn: async (updatedTransactions: Transaction[]) => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
        return updatedTransactions;
      } catch (error) {
        console.error("Error saving transactions:", error);
        throw error;
      }
    }
  });

  // Update local state when query data changes
  useEffect(() => {
    if (transactionsQuery.data) {
      setTransactions(transactionsQuery.data);
    }
  }, [transactionsQuery.data]);

  // Calculate total from selected services
  const calculateTotal = (): number => {
    return selectedServices.reduce((sum, service) => sum + service.price * service.quantity, 0);
  };

  // Add or update service in selection
  const toggleService = (service: Service) => {
    setSelectedServices(prev => {
      const existingIndex = prev.findIndex(s => s.id === service.id);
      
      if (existingIndex >= 0) {
        // If service exists, remove it
        return prev.filter(s => s.id !== service.id);
      } else {
        // If service doesn't exist, add it with quantity 1
        return [...prev, { ...service, quantity: 1 }];
      }
    });
  };

  // Update quantity of a selected service
  const updateServiceQuantity = (serviceId: string, quantity: number) => {
    if (quantity <= 0) {
      setSelectedServices(prev => prev.filter(s => s.id !== serviceId));
      return;
    }

    setSelectedServices(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { ...service, quantity } 
          : service
      )
    );
  };

  // Clear selected services
  const clearSelection = () => {
    setSelectedServices([]);
  };

  // Save transaction
  const saveTransaction = () => {
    if (selectedServices.length === 0) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      services: [...selectedServices],
      total: calculateTotal()
    };

    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    saveMutation.mutate(updatedTransactions);
    clearSelection();
  };

  // Get filtered transactions based on time period
  const getFilteredTransactions = (filter: FilterPeriod): Transaction[] => {
    if (filter === 'all') return transactions;

    const now = new Date();
    let daysAgo: number;

    switch (filter) {
      case '7days':
        daysAgo = 7;
        break;
      case '15days':
        daysAgo = 15;
        break;
      case '30days':
        daysAgo = 30;
        break;
      default:
        daysAgo = 30;
    }

    const cutoffDate = new Date(now);
    cutoffDate.setDate(now.getDate() - daysAgo);

    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= cutoffDate;
    });
  };

  return {
    selectedServices,
    transactions,
    isLoading: transactionsQuery.isLoading,
    toggleService,
    updateServiceQuantity,
    clearSelection,
    saveTransaction,
    calculateTotal,
    getFilteredTransactions
  };
});

// Custom hook for filtered transactions
export function useFilteredTransactions(filter: FilterPeriod) {
  const { getFilteredTransactions } = useTransactions();
  return getFilteredTransactions(filter);
}