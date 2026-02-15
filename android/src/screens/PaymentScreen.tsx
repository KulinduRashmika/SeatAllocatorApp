import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { markPaid } from "../utils/seatAllocator";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = NativeStackScreenProps<RootStackParamList, "Payment">;

export default function PaymentScreen({ route, navigation }: Props) {
  const { exam, registrationId } = route.params;

  const [selectedPayment, setSelectedPayment] = useState("card");

  const examFee = exam.fee ?? 0;
  const serviceFee = 0;
  const total = examFee + serviceFee;

  const payNow = () => {
    markPaid(registrationId);

    Alert.alert(
      "Payment Success",
      "Payment received. Sent to admin review (simulated)."
    );

    navigation.replace("Status", { registrationId });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exam Payment</Text>
      </View>

      {/* Exam Card */}
      <View style={styles.examCard}>
        <Text style={styles.examType}>REPEAT EXAMINATION</Text>
        <Text style={styles.examName}>{exam.name}</Text>
        <Text style={styles.courseCode}>Course Code: {exam.code ?? "N/A"}</Text>
        <Text style={styles.price}>Rs. {examFee.toFixed(2)}</Text>
      </View>

      {/* Payment Methods */}
      <Text style={styles.sectionTitle}>SELECT PAYMENT METHOD</Text>

      {[
        {
          id: "card",
          icon: "card-outline",
          title: "Credit Card",
          subtitle: "Visa, Mastercard",
          color: "#2563EB",
          bg: "#DBEAFE",
        },
        {
          id: "bank",
          icon: "business-outline",
          title: "Bank Transfer",
          subtitle: "Direct bank deposit",
          color: "#EA580C",
          bg: "#FFEDD5",
        },
        {
          id: "wallet",
          icon: "wallet-outline",
          title: "Student Wallet",
          subtitle: "Balance: Rs. 120.50",
          color: "#16A34A",
          bg: "#DCFCE7",
        },
      ].map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.paymentMethod,
            selectedPayment === method.id && styles.paymentSelected,
          ]}
          onPress={() => setSelectedPayment(method.id)}
        >
          <View style={[styles.iconBox, { backgroundColor: method.bg }]}>
            <Ionicons
              name={method.icon as any}
              size={24}
              color={method.color}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.paymentTitle}>{method.title}</Text>
            <Text style={styles.paymentSubtitle}>{method.subtitle}</Text>
          </View>

          <View
            style={[
              styles.radioOuter,
              selectedPayment === method.id && styles.radioOuterActive,
            ]}
          >
            {selectedPayment === method.id && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
      ))}

      {/* Price Breakdown */}
      <View style={styles.breakdownCard}>
        <View style={styles.rowBetween}>
          <Text style={styles.breakdownLabel}>Exam Fee</Text>
          <Text style={styles.breakdownValue}>
            Rs. {examFee.toFixed(2)}
          </Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.breakdownLabel}>Service Fee</Text>
          <Text style={styles.breakdownValue}>
            Rs. {serviceFee.toFixed(2)}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.rowBetween}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>
            Rs. {total.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Pay Button */}
      <TouchableOpacity style={styles.payBtn} onPress={payNow}>
        <Ionicons name="lock-closed-outline" size={18} color="#fff" />
        <Text style={styles.payText}>Pay Rs. {total.toFixed(2)} Now</Text>
      </TouchableOpacity>

      <Text style={styles.securityText}>
        SECURE 256-BIT ENCRYPTED TRANSACTION
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

  examCard: {
    backgroundColor: "#2563EB",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  examType: {
    color: "#DBEAFE",
    fontSize: 12,
    fontWeight: "800",
  },

  examName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    marginTop: 6,
  },

  courseCode: {
    color: "#DBEAFE",
    marginTop: 4,
  },

  price: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "900",
    marginTop: 16,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#6B7280",
    marginBottom: 10,
  },

  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    marginBottom: 10,
  },

  paymentSelected: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#2563EB",
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  paymentTitle: {
    fontWeight: "800",
    fontSize: 16,
    color: "#111827",
  },

  paymentSubtitle: {
    fontSize: 12,
    color: "#6B7280",
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
  },

  radioOuterActive: {
    borderColor: "#2563EB",
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2563EB",
  },

  breakdownCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginTop: 20,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  breakdownLabel: {
    color: "#6B7280",
  },

  breakdownValue: {
    fontWeight: "700",
    color: "#111827",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },

  totalLabel: {
    fontWeight: "900",
    fontSize: 16,
    color: "#111827",
  },

  totalValue: {
    fontWeight: "900",
    fontSize: 18,
    color: "#2563EB",
  },

  payBtn: {
    marginTop: 24,
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  payText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
    marginLeft: 6,
  },

  securityText: {
    textAlign: "center",
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 10,
    marginBottom: 40,
  },
});
