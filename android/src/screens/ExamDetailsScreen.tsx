import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = NativeStackScreenProps<RootStackParamList, "ExamDetails">;

export default function ExamDetailsScreen({ route, navigation }: Props) {
  const { exam } = route.params;

  const locked = exam.seatsAvailable === 0;
  const totalSeats = 100;
  const percentage = (exam.seatsAvailable / totalSeats) * 100;

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#2563EB" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Exam Details</Text>

        <Ionicons name="share-social-outline" size={20} color="#2563EB" />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Academic Year */}
        <Text style={styles.year}>ACADEMIC YEAR 2023/24</Text>

        {/* Title */}
        <Text style={styles.title}>{exam.name}</Text>

        {/* Tags */}
        <View style={styles.tagRow}>
          <View style={styles.tagBlue}>
            <Text style={styles.tagBlueText}>{exam.type}</Text>
          </View>
          <View style={styles.tagGreen}>
            <Text style={styles.tagGreenText}>
              {locked ? "Closed" : "Open"}
            </Text>
          </View>
        </View>

        {/* Info Grid */}
        <View style={styles.grid}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>DATE</Text>
            <Text style={styles.cardValue}>{exam.date}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>TIME</Text>
            <Text style={styles.cardValue}>{exam.time}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>CLOSING DATE</Text>
            <Text style={styles.cardValue}>{exam.closing}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>PRIORITY</Text>
            <Text style={styles.priority}>{exam.priority}</Text>
          </View>
        </View>

        {/* Seats Card */}
        <View style={styles.seatCard}>
          <View style={styles.seatRow}>
            <Text style={styles.seatTitle}>Available Seats</Text>
            <Text style={styles.seatCount}>
              {exam.seatsAvailable} / {totalSeats}
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                { width: `${percentage}%` },
              ]}
            />
          </View>

          <Text style={styles.seatNote}>
            Registration closes automatically once capacity is reached.
          </Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>Instructions</Text>

          <Text style={styles.instructionItem}>
            1. Arrive at least 15 minutes before the exam.
          </Text>
          <Text style={styles.instructionItem}>
            2. Bring your Student ID and registration confirmation.
          </Text>
          <Text style={styles.instructionItem}>
            3. Only basic calculators allowed. No phones.
          </Text>
          <Text style={styles.instructionItem}>
            4. Use a transparent pencil case.
          </Text>
        </View>

        {/* Register Button */}
        <TouchableOpacity
          disabled={locked}
          style={[styles.primaryBtn, locked && styles.disabledBtn]}
          onPress={() => navigation.navigate("Register", { exam })}
        >
          <Text style={[styles.primaryText, locked && styles.disabledText]}>
            {locked ? "Registration Locked" : "Register for Exam 🎯"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    position: "absolute",
    alignSelf: "center",
    fontWeight: "700",
    fontSize: 16,
    color: "#111827",
  },
  year: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 12,
  },
  tagRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tagBlue: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  tagBlueText: { color: "#1D4ED8", fontWeight: "700", fontSize: 12 },
  tagGreen: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagGreenText: { color: "#15803D", fontWeight: "700", fontSize: 12 },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 2,
  },
  cardLabel: {
    fontSize: 11,
    color: "#6B7280",
    marginBottom: 6,
  },
  cardValue: {
    fontWeight: "700",
    color: "#111827",
  },
  priority: {
    color: "#EA580C",
    fontWeight: "800",
  },

  seatCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    elevation: 2,
  },
  seatRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  seatTitle: { fontWeight: "700", color: "#111827" },
  seatCount: { color: "#2563EB", fontWeight: "900" },

  progressBackground: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: 8,
    backgroundColor: "#2563EB",
  },

  seatNote: {
    fontSize: 12,
    color: "#6B7280",
  },

  instructionsCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 24,
    elevation: 2,
  },
  instructionsTitle: {
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 10,
  },
  instructionItem: {
    color: "#374151",
    marginBottom: 6,
  },

  primaryBtn: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },
  disabledBtn: {
    backgroundColor: "#E5E7EB",
  },
  disabledText: {
    color: "#9CA3AF",
  },
});
