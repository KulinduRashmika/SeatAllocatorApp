import React, { useMemo, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { createRegistration } from "../utils/seatAllocator";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ route, navigation }: Props) {
  const { exam } = route.params;

  const isRepeat = useMemo(() => exam.type !== "Exam", [exam.type]);

  const [studentName, setStudentName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = () => {
    if (!studentName || !regNo || !email) {
      Alert.alert("Missing fields", "Please fill all fields.");
      return;
    }

    const registration = createRegistration({
      exam,
      studentName,
      regNo,
      email,
    });

    if (isRepeat) {
      navigation.replace("Payment", { exam, registrationId: registration.id });
    } else {
      navigation.replace("Status", { registrationId: registration.id });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.exam}>{exam.name}</Text>

      <Text style={styles.label}>Student Name</Text>
      <TextInput value={studentName} onChangeText={setStudentName} style={styles.input} placeholder="Full name" />

      <Text style={styles.label}>Registration No</Text>
      <TextInput value={regNo} onChangeText={setRegNo} style={styles.input} placeholder="Eg: IT2020xxx" />

      <Text style={styles.label}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="example@mail.com" />

      <TouchableOpacity style={styles.primaryBtn} onPress={onSubmit}>
        <Text style={styles.primaryText}>{isRepeat ? "Continue to Payment" : "Submit"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.secondaryText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 18, paddingTop: 40 },
  title: { fontSize: 24, fontWeight: "900", color: "#111827" },
  exam: { marginTop: 8, color: "#2563EB", fontWeight: "800" },
  label: { marginTop: 16, color: "#374151", fontWeight: "800" },
  input: {
    marginTop: 8, borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 12,
    paddingHorizontal: 12, paddingVertical: 10, backgroundColor: "#F9FAFB"
  },
  primaryBtn: { marginTop: 22, backgroundColor: "#2563EB", padding: 14, borderRadius: 12, alignItems: "center" },
  primaryText: { color: "white", fontWeight: "900", fontSize: 16 },
  secondaryBtn: { marginTop: 14, padding: 12, borderRadius: 12, alignItems: "center", borderWidth: 1, borderColor: "#E5E7EB" },
  secondaryText: { color: "#111827", fontWeight: "800" }
});
