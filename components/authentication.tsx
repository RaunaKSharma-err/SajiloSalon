import colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Eye, EyeOff, Lock, Mail } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  AppState,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { supabase } from "../lib/supabase";

// Supabase auto-refresh session setup
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
type AuthMode = "signin" | "signup";

export default function AuthScreen() {
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    else router.replace("/(tabs)");
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    else if (session) router.replace("/(tabs)");
    else Alert.alert("Error occured while signingup!");
    setLoading(false);
  }

  const switchAuthMode = (mode: AuthMode) => {
    setAuthMode(mode);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[
          colors["wild-willow"][200],
          colors["wild-willow"][400],
          colors["wild-willow"][600],
        ]}
        style={styles.gradient}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Toggle Buttons */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                authMode === "signin" && styles.toggleButtonActive,
              ]}
              onPress={() => switchAuthMode("signin")}
              testID="signin-toggle"
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  authMode === "signin" && styles.toggleButtonTextActive,
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                authMode === "signup" && styles.toggleButtonActive,
              ]}
              onPress={() => switchAuthMode("signup")}
              testID="signup-toggle"
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  authMode === "signup" && styles.toggleButtonTextActive,
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.welcomeText}>
              {authMode === "signin" ? "Welcome Back" : "Create Account"}
            </Text>
            <Text style={styles.subtitle}>
              {authMode === "signin" ? "Sign in to continue" : "Join us today"}
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Mail size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder={
                    authMode === "signin" ? "Enter your email" : "Email Address"
                  }
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  testID="email-input"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Lock size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={styles.passwordInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder={
                    authMode === "signin" ? "Enter your password" : "Password"
                  }
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  testID="password-input"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                  testID="toggle-password"
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#9CA3AF" />
                  ) : (
                    <Eye size={20} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Input - Only for Sign Up
            {authMode === "signup" && (
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Lock size={20} color="#9CA3AF" style={styles.inputIcon} />
                  <TextInput
                    style={styles.passwordInput}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm Password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showConfirmPassword}
                    testID="confirm-password-input"
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    testID="toggle-confirm-password"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} color="#9CA3AF" />
                    ) : (
                      <Eye size={20} color="#9CA3AF" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )} */}

            {/* Forgot Password - Only for Sign In */}
            {authMode === "signin" && (
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            {/* Main Action Button */}
            <TouchableOpacity
              style={[styles.actionButton, isLoading && styles.buttonDisabled]}
              onPress={
                authMode === "signin" ? signInWithEmail : signUpWithEmail
              }
              disabled={isLoading}
              testID={authMode === "signin" ? "signin-button" : "signup-button"}
            >
              <Text style={styles.actionButtonText}>
                {isLoading
                  ? authMode === "signin"
                    ? "Signing In..."
                    : "Creating Account..."
                  : authMode === "signin"
                  ? "Sign In"
                  : "Create Account"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: colors["wild-willow"][100], // soft green tint
    borderRadius: 25,
    padding: 4,
    marginTop: Platform.OS === "ios" ? 20 : 90,
    marginBottom: 30,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 20,
  },
  toggleButtonActive: {
    backgroundColor: colors["wild-willow"][300],
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleButtonText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: "500" as const,
  },
  toggleButtonTextActive: {
    color: "white",
    fontWeight: "600" as const,
  },
  header: {
    alignItems: "center",
    marginBottom: 80,
    marginTop: 50,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold" as const,
    color: colors.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
    paddingBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputIcon: {
    marginLeft: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 18,
    color: colors.text,
    fontSize: 16,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 18,
    color: colors.text,
    fontSize: 16,
  },
  eyeIcon: {
    paddingHorizontal: 16,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 32,
  },
  forgotPasswordText: {
    color: colors.secondaryLight,
    fontSize: 14,
    fontWeight: "500" as const,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.borderLight,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.card,
    fontSize: 12,
    fontWeight: "bold" as const,
  },
  termsText: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  termsLink: {
    color: colors.primaryDark,
    fontWeight: "600" as const,
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 32,
    borderWidth: 1,
    borderColor: colors.secondaryLight,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  actionButtonText: {
    color: colors.card,
    fontSize: 18,
    fontWeight: "600" as const,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderLight,
  },
  dividerText: {
    color: colors.textLight,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
  },
  socialButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "500" as const,
  },
});
