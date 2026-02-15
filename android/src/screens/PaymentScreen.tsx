import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { markPaid } from "../utils/seatAllocator";

type Props = NativeStackScreenProps<RootStackParamList, "Payment">;

export default function PaymentScreen({ route, navigation }: Props) {
  const { exam, registrationId } = route.params;

  const fee = exam.fee ?? 0;

  const payNow = () => {
    markPaid(registrationId);
    Alert.alert("Payment Success", "Payment received. Sent to admin review (simulated).");
    navigation.replace("Status", { registrationId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <Text style={styles.exam}>{exam.name}</Text>

      <View style={styles.card}>
        <Text style={styles.amountLabel}>Amount</Text>
        <Text style={styles.amount}>Rs. {fee}</Text>
        <Text style={styles.note}>Repeat exams require payment before review.</Text>
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={payNow}>
        <Text style={styles.primaryText}>Pay Now</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.secondaryText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 18, paddingTop: 40 },
  title: { fontSize: 24, fontWeight: "900", color: "#111827" },
  exam: { marginTop: 8, color: "#2563EB", fontWeight: "800" },
  card: { marginTop: 18, backgroundColor: "#F9FAFB", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "#E5E7EB" },
  amountLabel: { color: "#6B7280", fontWeight: "800" },
  amount: { marginTop: 6, fontSize: 26, fontWeight: "900", color: "#111827" },
  note: { marginTop: 10, color: "#6B7280", fontWeight: "600" },
  primaryBtn: { marginTop: 22, backgroundColor: "#2563EB", padding: 14, borderRadius: 12, alignItems: "center" },
  primaryText: { color: "white", fontWeight: "900", fontSize: 16 },
  secondaryBtn: { marginTop: 14, padding: 12, borderRadius: 12, alignItems: "center", borderWidth: 1, borderColor: "#E5E7EB" },
  secondaryText: { color: "#111827", fontWeight: "800" }
});
