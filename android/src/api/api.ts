import axios from "axios";

const BASE_URL = "http://192.168.1.10:8080/api";

// If real device → replace with your PC IP

export const getExams = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const registerStudent = async (examId: number, name: string) => {
  const response = await axios.post(
    `${BASE_URL}/${examId}/register?name=${name}`
  );
  return response.data;
};