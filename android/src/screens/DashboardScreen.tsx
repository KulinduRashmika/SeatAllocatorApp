import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Dashboard">;

export default function DashboardScreen({ navigation }: Props) {
  const [exams, setExams] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://192.168.1.7:8080/api/exams")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        setExams(data);
      })
      .catch((error) => console.log("ERROR:", error));
  }, []);

  const filtered = useMemo(() => {
    return exams.filter(
      (exam) =>
        exam.name?.toLowerCase().includes(search.toLowerCase()) ||
        exam.id?.toString().includes(search)
    );
  }, [exams, search]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>Exam Dashboard</Text>
          <Text style={styles.subtitle}>Academic Year 2023/24</Text>

          <TextInput
            placeholder="Search exams or codes..."
            value={search}
            onChangeText={setSearch}
            style={styles.search}
          />
        </View>

        {/* EXAMS */}
        <View style={{ paddingHorizontal: 16 }}>
          {filtered.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                index === 0 && styles.highlightCard,
              ]}
              onPress={() =>
                navigation.navigate("ExamDetails", { exam: item })
              }
            >
              {/* Card Header */}
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.examName}>{item.name}</Text>
                  <Text style={styles.examCode}>
                    CODE: {item.id}
                  </Text>
                </View>

                {/* Static Badge (since backend has no priority yet) */}
                <Text style={styles.badge}>
                  NORMAL
                </Text>
              </View>

              {/* Info Row */}
              <View style={styles.infoRow}>
                <View>
                  <Text style={styles.infoLabel}>DATE</Text>
                  <Text style={styles.infoValue}>
                    {item.date || "Not Set"}
                  </Text>
                </View>

                <View>
                  <Text style={styles.infoLabel}>SEATS LEFT</Text>
                  <Text style={styles.seatValue}>
                    {item.availableSeats ?? 0} Remaining
                  </Text>
                </View>
              </View>

              {/* Button */}
              {item.availableSeats > 0 ? (
                <View style={styles.primaryBtn}>
                  <Text style={styles.primaryBtnText}>
                    Register Now →
                  </Text>
                </View>
              ) : (
                <View style={styles.disabledBtn}>
                  <Text style={styles.disabledBtnText}>
                    Seats Full
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}

          {filtered.length === 0 && (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No exams found
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },

  headerSection: {
    backgroundColor: "white",
    padding: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#111827",
  },

  subtitle: {
    marginTop: 4,
    color: "#6B7280",
    fontWeight: "600",
  },

  search: {
    marginTop: 16,
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 14,
  },

  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 20,
    marginTop: 14,
    elevation: 3,
  },

  highlightCard: {
    borderWidth: 2,
    borderColor: "#60A5FA",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  examName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },

  examCode: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "800",
    backgroundColor: "#FEF3C7",
    color: "#D97706",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  infoLabel: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "700",
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
  },

  seatValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2563EB",
  },

  primaryBtn: {
    marginTop: 16,
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
  },

  primaryBtnText: {
    color: "white",
    fontWeight: "800",
  },

  disabledBtn: {
    marginTop: 16,
    backgroundColor: "#E5E7EB",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
  },

  disabledBtnText: {
    color: "#6B7280",
    fontWeight: "800",
  },
});