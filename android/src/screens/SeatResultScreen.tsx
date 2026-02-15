import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "SeatResult"
>;

export default function SeatResultScreen({ route }: Props) {
  const { registrationId, hall, seat, exam } = route.params;

  return (
    <View>
      <Text>Registration ID: {registrationId}</Text>
      <Text>Exam: {exam.name}</Text>
      <Text>Hall: {hall}</Text>
      <Text>Seat: {seat}</Text>
    </View>
  );
}
