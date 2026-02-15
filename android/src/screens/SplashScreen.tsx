import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace("Dashboard"), 1600);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Text style={styles.logoIcon}>✓</Text>
      </View>

      <Text style={styles.title}>
        Exam<Text style={styles.blue}>Reg</Text> Pro
      </Text>
      <Text style={styles.subtitle}>PRIORITY & SEAT ALLOCATION TOOL</Text>

      <View style={{ height: 36 }} />

      <ActivityIndicator />
      <Text style={styles.loadingText}>Initializing Academic Database...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  logoBox: {
    width: 82, height: 82, borderRadius: 20,
    backgroundColor: "#2563EB", justifyContent: "center", alignItems: "center",
    marginBottom: 18
  },
  logoIcon: { color: "white", fontSize: 32, fontWeight: "900" },
  title: { fontSize: 34, fontWeight: "900", color: "#111827" },
  blue: { color: "#2563EB" },
  subtitle: { marginTop: 10, letterSpacing: 2, fontSize: 12, color: "#6B7280", fontWeight: "800" },
  loadingText: { marginTop: 10, color: "#9CA3AF", fontWeight: "600" }
});
