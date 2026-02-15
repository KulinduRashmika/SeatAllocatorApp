import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "SeatAllocation"
>;

export default function SeatAllocationScreen({
  route,
  navigation,
}: Props) {
  const { registrationId } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seat Allocation</Text>
      </View>

      {/* Success Icon */}
      <View style={styles.successWrapper}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <Ionicons name="checkmark" size={40} color="#fff" />
          </View>
        </View>
      </View>

      {/* Message */}
      <View style={styles.centerText}>
        <Text style={styles.successTitle}>Allocation Confirmed</Text>
        <Text style={styles.successSub}>
          Your seat has been successfully reserved.
        </Text>
      </View>

      {/* Allocation Card */}
      <View style={styles.card}>
        <View style={styles.blueBar} />

        <View style={styles.cardContent}>
          {/* Student */}
          <View style={styles.studentRow}>
            <View>
              <Text style={styles.label}>STUDENT NAME</Text>
              <Text style={styles.studentName}>Johnathan Doe</Text>
            </View>
            <View style={styles.avatarCircle}>
              <Ionicons name="person-outline" size={22} color="#6B7280" />
            </View>
          </View>

          {/* Exam Info */}
          <View style={styles.examBox}>
            <Text style={styles.examLabel}>EXAM TITLE</Text>
            <Text style={styles.examTitle}>
              Final Term: Advanced Mathematics & Physics
            </Text>

            <View style={styles.dateRow}>
              <Ionicons
                name="calendar-outline"
                size={16}
                color="#6B7280"
              />
              <Text style={styles.dateText}>
                Monday, Dec 15 • 09:00 AM
              </Text>
            </View>
          </View>

          {/* Hall & Seat */}
          <View style={styles.gridRow}>
            <View style={styles.gridBox}>
              <Text style={styles.label}>HALL NUMBER</Text>
              <Text style={styles.bigValue}>A-102</Text>
            </View>

            <View style={styles.gridBox}>
              <Text style={styles.label}>SEAT NUMBER</Text>
              <Text style={styles.bigValue}>S-42</Text>
            </View>
          </View>

          {/* QR Placeholder */}
          <View style={styles.qrWrapper}>
            <View style={styles.qrBox}>
              <Text style={{ color: "#6B7280" }}>QR CODE</Text>
            </View>
            <Text style={styles.scanText}>SCAN AT ENTRANCE</Text>
          </View>
        </View>
      </View>

      {/* Notice */}
      <View style={styles.noticeBox}>
        <Ionicons
          name="information-circle-outline"
          size={18}
          color="#2563EB"
        />
        <Text style={styles.noticeText}>
          Please arrive at least 15 minutes before the exam.
          Bring your physical student ID for verification.
        </Text>
      </View>

      {/* Primary Button */}
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Text style={styles.primaryText}>Back to Dashboard</Text>
      </TouchableOpacity>

      {/* Secondary Buttons */}
      <View style={styles.secondaryRow}>
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => Alert.alert("PDF", "Saved as PDF (simulated)")}
        >
          <Ionicons name="download-outline" size={18} color="#374151" />
          <Text style={styles.secondaryText}>Save PDF</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => Alert.alert("Calendar", "Added to calendar")}
        >
          <Ionicons name="calendar-outline" size={18} color="#374151" />
          <Text style={styles.secondaryText}>Calendar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.supportText}>
        Incorrect details? Contact Support
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 18,
    paddingTop: 50,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "900",
    color: "#111827",
    marginRight: 24,
  },

  successWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },

  outerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
  },

  innerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  centerText: {
    alignItems: "center",
    marginBottom: 20,
  },

  successTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
  },

  successSub: {
    color: "#6B7280",
    marginTop: 6,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
  },

  blueBar: {
    height: 6,
    backgroundColor: "#2563EB",
  },

  cardContent: {
    padding: 18,
  },

  studentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  label: {
    fontSize: 11,
    fontWeight: "800",
    color: "#6B7280",
  },

  studentName: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
    marginTop: 4,
  },

  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  examBox: {
    backgroundColor: "#EFF6FF",
    padding: 14,
    borderRadius: 16,
    marginBottom: 18,
  },

  examLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#2563EB",
  },

  examTitle: {
    fontSize: 16,
    fontWeight: "900",
    marginTop: 6,
    color: "#111827",
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  dateText: {
    marginLeft: 6,
    color: "#6B7280",
  },

  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  gridBox: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 14,
    borderRadius: 14,
    marginRight: 8,
  },

  bigValue: {
    fontSize: 22,
    fontWeight: "900",
    color: "#2563EB",
    marginTop: 6,
  },

  qrWrapper: {
    alignItems: "center",
  },

  qrBox: {
    width: 180,
    height: 180,
    borderRadius: 16,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },

  scanText: {
    marginTop: 10,
    fontSize: 12,
    color: "#9CA3AF",
  },

  noticeBox: {
    backgroundColor: "#EFF6FF",
    flexDirection: "row",
    padding: 12,
    borderRadius: 14,
    marginBottom: 20,
  },

  noticeText: {
    marginLeft: 8,
    flex: 1,
    fontSize: 12,
    color: "#1E3A8A",
  },

  primaryBtn: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 14,
  },

  primaryText: {
    color: "#fff",
    fontWeight: "900",
  },

  secondaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  secondaryBtn: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 12,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  secondaryText: {
    marginLeft: 6,
    fontWeight: "700",
    color: "#374151",
  },

  supportText: {
    textAlign: "center",
    color: "#2563EB",
    marginTop: 20,
    marginBottom: 40,
  },
});
