import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { addExam } from "../api/api";

type ExamType = "Exam" | "Batch Repeat" | "Special Repeat";

export default function AdminAddExamScreen() {
  const [name, setName] = useState("");
  const [type, setType] = useState<ExamType>("Exam");

  const [date, setDate] = useState("");        // exam date
  const [closing, setClosing] = useState("");  // closing date
  const [time, setTime] = useState("");        // optional

  const [totalSeats, setTotalSeats] = useState("50");
  const [seatsAvailable, setSeatsAvailable] = useState("50");

  const [loading, setLoading] = useState(false);

  const addExamHandler = async () => {
    if (!name.trim()) {
      Alert.alert("Validation", "Exam name is required.");
      return;
    }
    if (!date.trim()) {
      Alert.alert("Validation", "Exam date is required (YYYY-MM-DD).");
      return;
    }
    if (!closing.trim()) {
      Alert.alert("Validation", "Closing date is required (YYYY-MM-DD).");
      return;
    }

    const tSeats = Number(totalSeats);
    const aSeats = Number(seatsAvailable);

    if (Number.isNaN(tSeats) || tSeats <= 0) {
      Alert.alert("Validation", "Total seats must be a positive number.");
      return;
    }
    if (Number.isNaN(aSeats) || aSeats < 0) {
      Alert.alert("Validation", "Available seats must be 0 or higher.");
      return;
    }
    if (aSeats > tSeats) {
      Alert.alert("Validation", "Available seats cannot be more than total seats.");
      return;
    }

    const payload = {
      name,
      type,
      date,
      closing,
      time: time.trim() ? time.trim() : null,
      totalSeats: tSeats,
      seatsAvailable: aSeats,
    };

    try {
      setLoading(true);
      const created = await addExam(payload);
      Alert.alert("Success", `Exam added! ID: ${created.id}`);

      setName("");
      setType("Exam");
      setDate("");
      setClosing("");
      setTime("");
      setTotalSeats("50");
      setSeatsAvailable("50");
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data ||
        e?.message ||
        "Something went wrong";
      Alert.alert("Error", String(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Admin - Add Exam</Text>

      <Text style={styles.label}>Exam Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Data Structures Mid"
        style={styles.input}
      />

      <Text style={styles.label}>Type</Text>
      <View style={styles.row}>
        {(["Exam", "Batch Repeat", "Special Repeat"] as ExamType[]).map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setType(t)}
            style={[styles.chip, type === t && styles.chipActive]}
          >
            <Text style={[styles.chipText, type === t && styles.chipTextActive]}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Exam Date (YYYY-MM-DD)</Text>
      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="2026-03-01"
        style={styles.input}
      />

      <Text style={styles.label}>Closing Date (YYYY-MM-DD)</Text>
      <TextInput
        value={closing}
        onChangeText={setClosing}
        placeholder="2026-02-28"
        style={styles.input}
      />

      <Text style={styles.label}>Time (optional)</Text>
      <TextInput
        value={time}
        onChangeText={setTime}
        placeholder="09:00 AM"
        style={styles.input}
      />

      <Text style={styles.label}>Total Seats</Text>
      <TextInput
        value={totalSeats}
        onChangeText={setTotalSeats}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Available Seats</Text>
      <TextInput
        value={seatsAvailable}
        onChangeText={setSeatsAvailable}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity
        disabled={loading}
        onPress={addExamHandler}
        style={[styles.btn, loading && styles.btnDisabled]}
      >
        <Text style={styles.btnText}>{loading ? "Saving..." : "Add Exam"}</Text>
      </TouchableOpacity>

      <Text style={styles.note}>This calls: POST http://192.168.1.4:8080/api/exams</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", paddingHorizontal: 18, paddingTop: 50 },
  title: { fontSize: 22, fontWeight: "900", color: "#111827", marginBottom: 20 },
  label: { marginTop: 14, fontWeight: "800", color: "#374151" },
  input: {
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  row: { flexDirection: "row", flexWrap: "wrap", marginTop: 8, gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
  },
  chipActive: { backgroundColor: "#2563EB" },
  chipText: { fontWeight: "800", color: "#374151" },
  chipTextActive: { color: "#fff" },
  btn: {
    marginTop: 24,
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  btnDisabled: { backgroundColor: "#93C5FD" },
  btnText: { color: "#FFFFFF", fontWeight: "900", fontSize: 16 },
  note: { marginTop: 12, color: "#6B7280", fontSize: 12 },
});