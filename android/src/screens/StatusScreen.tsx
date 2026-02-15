import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { getRegistration, simulateAdminApproveAndAllocate } from "../utils/seatAllocator";

type Props = NativeStackScreenProps<RootStackParamList, "Status">;

export default function StatusScreen({ route, navigation }: Props) {
  const { registrationId } = route.params;

  const reg = useMemo(() => getRegistration(registrationId), [registrationId]);

  if (!reg) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Status</Text>
        <Text style={styles.bad}>Registration not found.</Text>
      </View>
    );
  }

  const onAllocate = () => {
    simulateAdminApproveAndAllocate(registrationId);
    navigation.replace("SeatResult", { registrationId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration Status</Text>

      <View style={styles.card}>
        <Text style={styles.bold}>{reg.examName}</Text>
        <Text style={styles.meta}>Student: {reg.studentName}</Text>
        <Text style={styles.meta}>Reg No: {reg.regNo}</Text>
        <Text style={styles.meta}>Email: {reg.email}</Text>
        <Text style={styles.meta}>Status: {reg.status}</Text>
        <Text style={styles.meta}>Paid: {reg.paid ? "Yes" : "No"}</Text>
      </View>

      <Text style={styles.note}>
        This tool simulates admin review. Press the button to approve and allocate a seat.
      </Text>

      <TouchableOpacity style={styles.primaryBtn} onPress={onAllocate}>
        <Text style={styles.primaryText}>Admin Approve + Allocate Seat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 18, paddingTop: 40 },
  title: { fontSize: 24, fontWeight: "900", color: "#111827" },
  card: { marginTop: 18, backgroundColor: "#F9FAFB", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "#E5E7EB" },
  bold: { fontWeight: "900", color: "#111827", fontSize: 16 },
  meta: { marginTop: 8, color: "#374151", fontWeight: "600" },
  note: { marginTop: 16, color: "#6B7280", fontWeight: "600" },
  primaryBtn: { marginTop: 18, backgroundColor: "#2563EB", padding: 14, borderRadius: 12, alignItems: "center" },
  primaryText: { color: "white", fontWeight: "900", fontSize: 15 },
  bad: { marginTop: 18, color: "#DC2626", fontWeight: "800" },
});
