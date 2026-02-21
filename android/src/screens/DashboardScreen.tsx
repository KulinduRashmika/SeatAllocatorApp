import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import SHA256 from "crypto-js/sha256";

type Props = NativeStackScreenProps<RootStackParamList, "Dashboard">;

const ADMIN_PASSWORD_HASH =
  "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9";

export default function DashboardScreen({ navigation }: Props) {
  const [exams, setExams] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [adminModalVisible, setAdminModalVisible] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  useEffect(() => {
    fetch("http://192.168.1.9:8080/api/exams/sorted-heap")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        setExams(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.log("ERROR:", error));
  }, []);

  // ✅ SAFE FILTER (prevents "undefined is not a function")
  const filtered = useMemo(() => {
    const safeSearch = (search || "").toLowerCase();

    return (exams || []).filter((exam) => {
      const name = exam?.name ? String(exam.name).toLowerCase() : "";
      const id = exam?.id != null ? String(exam.id) : "";

      return name.includes(safeSearch) || id.includes(safeSearch);
    });
  }, [exams, search]);

  const openAdminGate = () => {
    setAdminPassword("");
    setAdminModalVisible(true);
  };

  const checkAdminPassword = () => {
    const enteredHash = SHA256(adminPassword).toString();
    if (enteredHash === ADMIN_PASSWORD_HASH) {
      setAdminModalVisible(false);
      navigation.navigate("AdminAddExam");
    } else {
      Alert.alert("Access Denied", "Wrong admin password.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.headerSection}>
          <TouchableOpacity
            activeOpacity={0.9}
            onLongPress={openAdminGate}
            delayLongPress={1200}
          >
            <Text style={styles.title}>Exam Dashboard</Text>
          </TouchableOpacity>

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
              style={[styles.card, index === 0 && styles.highlightCard]}
              onPress={() => navigation.navigate("ExamDetails", { exam: item })}
            >
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.examName}>{item.name}</Text>
                  <Text style={styles.examCode}>CODE: {item.id}</Text>
                </View>

                {/* priority removed → show type */}
                <Text style={styles.badge}>
                  {(item.type || "EXAM").toUpperCase()}
                </Text>
              </View>

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
                    {item.seatsAvailable ?? 0} Remaining
                  </Text>
                </View>
              </View>

              {(item.seatsAvailable ?? 0) > 0 ? (
                <View style={styles.primaryBtn}>
                  <Text style={styles.primaryBtnText}>Register Now →</Text>
                </View>
              ) : (
                <View style={styles.disabledBtn}>
                  <Text style={styles.disabledBtnText}>Seats Full</Text>
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

      {/* Admin Password Modal */}
      <Modal
        visible={adminModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAdminModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Admin Access</Text>
            <Text style={styles.modalSub}>
              Enter admin password to continue
            </Text>

            <TextInput
              value={adminPassword}
              onChangeText={setAdminPassword}
              placeholder="Admin Password"
              secureTextEntry
              style={styles.modalInput}
            />

            <View style={styles.modalRow}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalCancel]}
                onPress={() => setAdminModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.modalOk]}
                onPress={checkAdminPassword}
              >
                <Text style={styles.modalOkText}>Enter</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalHint}>
              Hint: long-press the dashboard title to open this.
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  headerSection: { backgroundColor: "white", padding: 16 },
  title: { fontSize: 26, fontWeight: "900", color: "#111827" },
  subtitle: { marginTop: 4, color: "#6B7280", fontWeight: "600" },
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
  highlightCard: { borderWidth: 2, borderColor: "#60A5FA" },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  examName: { fontSize: 18, fontWeight: "800", color: "#111827" },
  examCode: { marginTop: 4, fontSize: 12, fontWeight: "700", color: "#6B7280" },
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
  infoLabel: { fontSize: 11, color: "#6B7280", fontWeight: "700" },
  infoValue: { fontSize: 14, fontWeight: "800", color: "#111827" },
  seatValue: { fontSize: 14, fontWeight: "800", color: "#2563EB" },
  primaryBtn: {
    marginTop: 16,
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryBtnText: { color: "white", fontWeight: "800" },
  disabledBtn: {
    marginTop: 16,
    backgroundColor: "#E5E7EB",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  disabledBtnText: { color: "#6B7280", fontWeight: "800" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 18,
  },
  modalCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: "900", color: "#111827" },
  modalSub: { marginTop: 6, color: "#6B7280", fontWeight: "600" },
  modalInput: {
    marginTop: 14,
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 12,
  },
  modalRow: { flexDirection: "row", gap: 10, marginTop: 14 },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  modalCancel: { backgroundColor: "#E5E7EB" },
  modalOk: { backgroundColor: "#2563EB" },
  modalCancelText: { fontWeight: "900", color: "#111827" },
  modalOkText: { fontWeight: "900", color: "white" },
  modalHint: { marginTop: 10, fontSize: 11, color: "#9CA3AF" },
});