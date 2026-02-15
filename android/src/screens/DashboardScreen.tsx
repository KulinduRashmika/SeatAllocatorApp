import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { mockExams } from "../data/mockExams";
import type { Exam } from "../types/models";
import { buildExamPriorityList } from "../utils/seatAllocator";

type Props = NativeStackScreenProps<RootStackParamList, "Dashboard">;

export default function DashboardScreen({ navigation }: Props) {
  const [exams] = useState<Exam[]>(mockExams);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const sorted = useMemo(() => buildExamPriorityList(exams), [exams]);

  const filtered = sorted.filter(
    (exam) =>
      exam.name.toLowerCase().includes(search.toLowerCase()) ||
      exam.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>Exam Dashboard</Text>
          <Text style={styles.subtitle}>Academic Year 2023/24</Text>

          {/* SEARCH */}
          <TextInput
            placeholder="Search exams or codes..."
            value={search}
            onChangeText={setSearch}
            style={styles.search}
          />

          {/* TABS */}
          <View style={styles.tabs}>
            {["all", "batch", "special"].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabBtn,
                  activeTab === tab && styles.activeTab,
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab === "all"
                    ? "All Exams"
                    : tab === "batch"
                    ? "Batch Repeat"
                    : "Special Rep"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* EXAM CARDS */}
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
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.examName}>{item.name}</Text>
                  <Text style={styles.examCode}>CODE: {item.id}</Text>
                </View>

                <Text style={[styles.badge, badgeStyle(item.priority)]}>
                  {item.priority.toUpperCase()}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <View>
                  <Text style={styles.infoLabel}>CLOSING DATE</Text>
                  <Text style={styles.infoValue}>{item.closing}</Text>
                </View>

                <View>
                  <Text style={styles.infoLabel}>SEATS LEFT</Text>
                  <Text style={styles.seatValue}>
                    {item.seatsAvailable} Remaining
                  </Text>
                </View>
              </View>

              {item.seatsAvailable > 0 ? (
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

          {/* SCHOLARSHIP BANNER */}
          <View style={styles.banner}>
            <Text style={styles.bannerTitle}>
              Scholarship Exam 2024
            </Text>
            <Text style={styles.bannerText}>
              Registration for the annual excellence scholarship
              is now open for top 5% achievers.
            </Text>
            <TouchableOpacity style={styles.bannerBtn}>
              <Text style={styles.bannerBtnText}>APPLY NOW</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>
        <Text style={styles.navActive}>DASHBOARD</Text>
        <Text style={styles.navItem}>MY EXAMS</Text>
        <Text style={styles.navItem}>RESULTS</Text>
        <Text style={styles.navItem}>PROFILE</Text>
      </View>
    </SafeAreaView>
  );
}

/* PRIORITY BADGE STYLE */
function badgeStyle(priority: Exam["priority"]) {
  if (priority === "High")
    return { backgroundColor: "#FEE2E2", color: "#DC2626" };
  if (priority === "Low")
    return { backgroundColor: "#DBEAFE", color: "#2563EB" };
  return { backgroundColor: "#FEF3C7", color: "#D97706" };
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

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

  tabs: {
    flexDirection: "row",
    marginTop: 14,
  },

  tabBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 20,
    marginRight: 8,
  },

  activeTab: {
    backgroundColor: "#2563EB",
  },

  tabText: {
    fontWeight: "700",
    color: "#374151",
  },

  activeTabText: {
    color: "white",
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

  banner: {
    marginTop: 20,
    backgroundColor: "#2563EB",
    padding: 20,
    borderRadius: 20,
  },

  bannerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "white",
  },

  bannerText: {
    marginTop: 8,
    color: "#DBEAFE",
    fontWeight: "600",
  },

  bannerBtn: {
    marginTop: 12,
    backgroundColor: "white",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  bannerBtnText: {
    fontWeight: "800",
    color: "#2563EB",
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 14,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },

  navActive: {
    fontWeight: "900",
    color: "#2563EB",
  },

  navItem: {
    fontWeight: "700",
    color: "#9CA3AF",
  },
});
