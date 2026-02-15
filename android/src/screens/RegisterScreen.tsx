import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { createRegistration } from "../utils/seatAllocator";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ route, navigation }: Props) {
  const { exam } = route.params;

  const isRepeat = useMemo(() => exam.type !== "Exam", [exam.type]);

  const [studentName, setStudentName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  const seatsLeft = exam.seatsAvailable;
  const locked = seatsLeft === 0;

  const onSubmit = () => {
    if (!studentName || !regNo || !email) {
      Alert.alert("Missing fields", "Please fill all fields.");
      return;
    }

    if (!agreed) {
      Alert.alert("Confirmation Required", "Please agree to the guidelines.");
      return;
    }

    if (locked) {
      Alert.alert("Seats Full", "No seats available.");
      return;
    }

    const registration = createRegistration({
      exam,
      studentName,
      regNo,
      email,
    });

    Alert.alert("Success", "Registration completed!");

   if (isRepeat) {
  navigation.replace("Payment", {
    exam,
    registrationId: registration.id,
  });
} else {
  navigation.replace("Status", {
    exam,
    registrationId: registration.id,
  });
}

  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#2563EB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exam Registration</Text>
      </View>

      {/* Selected Exam Card */}
      <View style={styles.examCard}>
        <Text style={styles.examLabel}>SELECTED EXAMINATION</Text>
        <Text style={styles.examTitle}>{exam.name}</Text>

        <View style={styles.examMetaRow}>
          <Ionicons name="calendar-outline" size={16} color="#6B7280" />
          <Text style={styles.examMeta}>{exam.date}</Text>
        </View>

        <View style={styles.examMetaRow}>
          <Ionicons name="people-outline" size={16} color="#6B7280" />
          <Text style={styles.examMeta}>
            Seats Available: {exam.seatsAvailable}
          </Text>
        </View>
      </View>

      {/* Form */}
      <Text style={styles.label}>Student Full Name</Text>
      <TextInput
        value={studentName}
        onChangeText={setStudentName}
        style={styles.input}
        placeholder="Full Name"
      />

      <Text style={styles.label}>Registration Number</Text>
      <TextInput
        value={regNo}
        onChangeText={setRegNo}
        style={styles.input}
        placeholder="IT2020XXX"
      />

      <Text style={styles.label}>Academic Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="example@mail.com"
      />

      {/* Agreement */}
      <TouchableOpacity
        style={styles.checkboxRow}
        onPress={() => setAgreed(!agreed)}
      >
        <Ionicons
          name={agreed ? "checkbox" : "square-outline"}
          size={22}
          color={agreed ? "#2563EB" : "#9CA3AF"}
        />
        <Text style={styles.checkboxText}>
          I agree to the exam guidelines and policies.
        </Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity
        disabled={!agreed || locked}
        style={[
          styles.primaryBtn,
          (!agreed || locked) && styles.disabledBtn,
        ]}
        onPress={onSubmit}
      >
        <Text style={styles.primaryText}>
          {locked
            ? "Seats Full"
            : isRepeat
            ? "Continue to Payment"
            : "Complete Registration"}
        </Text>
      </TouchableOpacity>
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
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
  },

  examLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#2563EB",
    marginBottom: 6,
  },

  examTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 12,
  },

  examMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  examMeta: {
    marginLeft: 8,
    color: "#6B7280",
    fontWeight: "600",
  },

  label: {
    marginTop: 14,
    fontWeight: "800",
    color: "#374151",
  },

  input: {
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  checkboxText: {
    marginLeft: 10,
    color: "#6B7280",
    flex: 1,
  },

  primaryBtn: {
    marginTop: 26,
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  disabledBtn: {
    backgroundColor: "#D1D5DB",
  },

  primaryText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },
});
