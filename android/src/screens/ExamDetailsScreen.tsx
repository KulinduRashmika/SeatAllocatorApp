import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "ExamDetails">;

export default function ExamDetailsScreen({ route, navigation }: Props) {
  const { exam } = route.params;

  const locked = exam.seatsAvailable === 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exam.name}</Text>
      <Text style={styles.meta}>Type: {exam.type}</Text>
      <Text style={styles.meta}>Priority: {exam.priority}</Text>
      <Text style={styles.meta}>Closing: {exam.closing}</Text>
      <Text style={styles.meta}>Seats: {exam.seatsAvailable}</Text>

      {exam.fee ? <Text style={styles.fee}>Repeat Fee: Rs. {exam.fee}</Text> : null}

      <View style={{ height: 18 }} />

      <TouchableOpacity
        disabled={locked}
        style={[styles.primaryBtn, locked && styles.disabledBtn]}
        onPress={() => navigation.navigate("Register", { exam })}
      >
        <Text style={[styles.primaryText, locked && styles.disabledText]}>
          {locked ? "Registration Locked" : "Register"}
        </Text>
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
  meta: { marginTop: 10, color: "#374151", fontWeight: "600" },
  fee: { marginTop: 12, color: "#1D4ED8", fontWeight: "900" },
  primaryBtn: { marginTop: 24, backgroundColor: "#2563EB", padding: 14, borderRadius: 12, alignItems: "center" },
  primaryText: { color: "white", fontWeight: "900", fontSize: 16 },
  disabledBtn: { backgroundColor: "#E5E7EB" },
  disabledText: { color: "#9CA3AF" },
  secondaryBtn: { marginTop: 14, padding: 12, borderRadius: 12, alignItems: "center", borderWidth: 1, borderColor: "#E5E7EB" },
  secondaryText: { color: "#111827", fontWeight: "800" }
});
