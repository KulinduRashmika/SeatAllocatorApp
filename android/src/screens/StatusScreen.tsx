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
  "Status"
>;

export default function StatusScreen({ route, navigation }: Props) {
  const { registrationId, exam } = route.params;


  const timelineSteps = [
    {
      id: 1,
      icon: "checkmark",
      title: "Application Submitted",
      description:
        "Successfully received and logged in the central system.",
      timestamp: "Oct 12, 10:30 AM",
      status: "completed",
    },
    {
      id: 2,
      icon: "card",
      title: "Payment Completed",
      description:
        "Transaction confirmed. Receipt sent to email.",
      timestamp: "Oct 12, 10:45 AM",
      status: "completed",
    },
    {
      id: 3,
      icon: "document-text",
      title: "Document Review",
      description:
        "Academic committee is verifying your documents.",
      status: "in-progress",
      badge: "In Progress",
      info:
        "Typical review time is 2-3 business days. You will be notified once completed.",
    },
    {
      id: 4,
      icon: "school",
      title: "Seat Allocation",
      description:
        "Venue and seat details will be visible after approval.",
      status: "pending",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Track Registration</Text>

        <TouchableOpacity
          onPress={() =>
            Alert.alert("Info", "Track your application progress here.")
          }
        >
          <Ionicons name="information-circle" size={24} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {/* Registration Card */}
      <View style={styles.card}>
        <Text style={styles.regLabel}>REGISTRATION ID</Text>
        <Text style={styles.regId}>#{registrationId}</Text>

        <View style={styles.activeBadge}>
          <Text style={styles.activeText}>ACTIVE</Text>
        </View>

        <Text style={styles.examTitle}>
          Advanced Mathematics Mid-term
        </Text>

        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={16} color="#6B7280" />
          <Text style={styles.dateText}>Exam Date: Nov 15, 2023</Text>
        </View>
      </View>

      {/* Timeline */}
      <Text style={styles.timelineTitle}>APPLICATION TIMELINE</Text>

      {timelineSteps.map((step, index) => {
        const isCompleted = step.status === "completed";
        const isInProgress = step.status === "in-progress";

        return (
          <View key={step.id} style={styles.timelineItem}>
            {/* Left Icon */}
            <View
              style={[
                styles.iconBox,
                isCompleted && styles.iconCompleted,
                isInProgress && styles.iconInProgress,
              ]}
            >
              <Ionicons
                name={step.icon as any}
                size={22}
                color={
                  isCompleted
                    ? "#fff"
                    : isInProgress
                    ? "#2563EB"
                    : "#9CA3AF"
                }
              />
            </View>

            {/* Right Content */}
            <View style={{ flex: 1 }}>
              <View style={styles.rowBetween}>
                <Text style={styles.stepTitle}>{step.title}</Text>

                {step.timestamp && (
                  <Text style={styles.timestamp}>
                    {step.timestamp}
                  </Text>
                )}

                {step.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {step.badge}
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.stepDescription}>
                {step.description}
              </Text>

              {step.info && (
                <View style={styles.infoBox}>
                  <Ionicons
                    name="information-circle-outline"
                    size={18}
                    color="#2563EB"
                  />
                  <Text style={styles.infoText}>{step.info}</Text>
                </View>
              )}
            </View>
          </View>
        );
      })}

      <TouchableOpacity
  style={{
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    marginTop: 30,
    alignItems: "center",
  }}
  onPress={() =>
    navigation.navigate("SeatResult", {
      registrationId,
      exam,
      hall: "A-102",
      seat: "S-42",
    })
  }
>
  <Text style={{ color: "#fff", fontWeight: "900" }}>
    View Seat Allocation
  </Text>
</TouchableOpacity>


      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.refreshBtn}
          onPress={() => Alert.alert("Refreshed", "Status updated.")}
        >
          <Ionicons name="refresh" size={18} color="#fff" />
          <Text style={styles.refreshText}>Refresh Status</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.supportBtn}>
          <Ionicons
            name="headset-outline"
            size={22}
            color="#374151"
          />
        </TouchableOpacity>
      </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111827",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
  },

  regLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#6B7280",
  },

  regId: {
    fontSize: 18,
    fontWeight: "900",
    color: "#2563EB",
    marginTop: 4,
  },

  activeBadge: {
    backgroundColor: "#DBEAFE",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 6,
  },

  activeText: {
    color: "#2563EB",
    fontSize: 12,
    fontWeight: "800",
  },

  examTitle: {
    fontSize: 18,
    fontWeight: "900",
    marginTop: 10,
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

  timelineTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#6B7280",
    marginBottom: 16,
  },

  timelineItem: {
    flexDirection: "row",
    marginBottom: 24,
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  iconCompleted: {
    backgroundColor: "#2563EB",
  },

  iconInProgress: {
    backgroundColor: "#DBEAFE",
  },

  stepTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111827",
  },

  stepDescription: {
    color: "#6B7280",
    marginTop: 4,
  },

  timestamp: {
    fontSize: 12,
    color: "#9CA3AF",
  },

  badge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },

  badgeText: {
    color: "#2563EB",
    fontSize: 11,
    fontWeight: "800",
  },

  infoBox: {
    backgroundColor: "#EFF6FF",
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },

  infoText: {
    marginLeft: 8,
    color: "#1D4ED8",
    fontSize: 12,
    flex: 1,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 40,
  },

  refreshBtn: {
    flex: 1,
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  refreshText: {
    color: "#fff",
    fontWeight: "900",
    marginLeft: 6,
  },

  supportBtn: {
    width: 56,
    height: 56,
    marginLeft: 10,
    backgroundColor: "#fff",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
});
