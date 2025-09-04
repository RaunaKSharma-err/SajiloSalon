import { supabase } from "@/lib/supabase";
import createContextHook from "@nkzw/create-context-hook";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { FilterPeriod, SelectedService, Service, Transaction } from "@/types";
import { Session } from "@supabase/supabase-js";

export const [TransactionProvider, useTransactions] = createContextHook(() => {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
   const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  

  // ✅ Load transactions from Supabase
  const transactionsQuery = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching transactions:", error.message);
        return [];
      }
      return data as Transaction[];
    }
  });

  // ✅ Save new transaction to Supabase
  const saveMutation = useMutation({
    mutationFn: async (newTransaction: Transaction) => {
      const { data, error } = await supabase.from("transactions").insert([newTransaction]);

      if (error) {
        console.error("Error saving transaction:", error.message);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      transactionsQuery.refetch(); // refresh after saving
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
        return prev.filter(s => s.id !== service.id);
      } else {
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
        service.id === serviceId ? { ...service, quantity } : service
      )
    );
  };

  // Clear selected services
  const clearSelection = () => {
    setSelectedServices([]);
  };

  // ✅ Save transaction (local + Supabase)
  const saveTransaction = async () => {
    if (selectedServices.length === 0) return;

    if (!session || !session.user) {
    console.warn("No logged in user, cannot save transaction.");
    return;
  }

    const newTransaction: Transaction = {
      date: new Date().toISOString(),
      services: [...selectedServices],
      total: calculateTotal(),
      user_id: session.user.id,
    };

    // Local update for instant UI feedback
    setTransactions([newTransaction, ...transactions]);

    // Save to Supabase
     saveMutation.mutate(newTransaction);
     clearSelection();
  };

  // Filter transactions by time period
  const getFilteredTransactions = (filter: FilterPeriod): Transaction[] => {
    if (filter === "all") return transactions;
    const now = new Date();
    let daysAgo: number;
    switch (filter) {
      case "7days":
        daysAgo = 7;
        break;
      case "15days":
        daysAgo = 15;
        break;
      case "30days":
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
