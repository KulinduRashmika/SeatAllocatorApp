import React, { useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { mockExams } from "../data/mockExams";
import type { Exam } from "../types/models";
import { buildExamPriorityList } from "../utils/seatAllocator";

type Props = NativeStackScreenProps<RootStackParamList, "Dashboard">;

export default function DashboardScreen({ navigation }: Props) {
  const [exams] = useState<Exam[]>(mockExams);

  const sorted = useMemo(() => buildExamPriorityList(exams), [exams]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Exams</Text>
      <Text style={styles.sub}>Sorted by Priority + Closing Date</Text>

      <FlatList
        data={sorted}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("ExamDetails", { exam: item })}
          >
            <View style={styles.row}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={[styles.badge, badgeStyle(item.priority)]}>{item.priority}</Text>
            </View>

            <Text style={styles.meta}>Type: {item.type}</Text>
            <Text style={styles.meta}>Closing: {item.closing}</Text>
            <Text style={styles.meta}>Seats: {item.seatsAvailable}</Text>

            {item.seatsAvailable === 0 && <Text style={styles.lock}>Seats full — Registration locked</Text>}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function badgeStyle(priority: Exam["priority"]) {
  if (priority === "High") return { backgroundColor: "#DBEAFE", color: "#1D4ED8" };
  if (priority === "Low") return { backgroundColor: "#F3F4F6", color: "#6B7280" };
  return { backgroundColor: "#E5E7EB", color: "#374151" };
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 16 },
  header: { fontSize: 28, fontWeight: "900", color: "#111827" },
  sub: { marginTop: 6, marginBottom: 14, color: "#6B7280", fontWeight: "600" },
  card: { backgroundColor: "white", padding: 14, borderRadius: 14, marginBottom: 12, elevation: 2 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  name: { fontSize: 16, fontWeight: "800", color: "#111827", flex: 1, paddingRight: 8 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, fontSize: 12, fontWeight: "800" },
  meta: { marginTop: 6, color: "#4B5563", fontWeight: "600" },
  lock: { marginTop: 10, fontWeight: "800", color: "#DC2626" }
});
