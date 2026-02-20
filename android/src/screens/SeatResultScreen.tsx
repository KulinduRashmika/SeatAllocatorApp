import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { getRegistration } from "../utils/seatAllocator";

type Props = NativeStackScreenProps<RootStackParamList, "SeatResult">;

export default function SeatResultScreen({ route, navigation }: Props) {
  const { registrationId } = route.params;

  const reg = useMemo(() => getRegistration(registrationId), [registrationId]);

  if (!reg) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Seat Result</Text>
        <Text style={styles.bad}>Registration not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seat Allocated</Text>

      <View style={styles.bigCard}>
        <Text style={styles.seatLabel}>Seat Number</Text>
        <Text style={styles.seat}>{reg.seatNumber ?? "N/A"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.meta}>Exam: {reg.examName}</Text>
        <Text style={styles.meta}>Student: {reg.studentName}</Text>
        <Text style={styles.meta}>Email sent (simulated): {reg.email}</Text>
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.popToTop()}>
        <Text style={styles.primaryText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 18, paddingTop: 40 },
  title: { fontSize: 24, fontWeight: "900", color: "#111827" },
  bigCard: { marginTop: 18, backgroundColor: "#DBEAFE", borderRadius: 16, padding: 16 },
  seatLabel: { color: "#1D4ED8", fontWeight: "900" },
  seat: { marginTop: 6, fontSize: 34, fontWeight: "900", color: "#111827" },
  card: { marginTop: 14, backgroundColor: "#F9FAFB", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "#E5E7EB" },
  meta: { marginTop: 8, color: "#374151", fontWeight: "700" },
  primaryBtn: { marginTop: 18, backgroundColor: "#2563EB", padding: 14, borderRadius: 12, alignItems: "center" },
  primaryText: { color: "white", fontWeight: "900", fontSize: 16 },
  bad: { marginTop: 18, color: "#DC2626", fontWeight: "800" },
});