import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const PresensiKelas = () => {
  const navigation = useNavigation();

  const [kelas, setKelas] = useState([]);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@dataKey");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      const id = data.id;
      axios
        .get(`http://127.0.0.1:8000/api/jadwalHarian/indexToday/instruktur/${id}`)
        .then((response) => {
          // filter bookingKls instruktur yang sesuai dengan ID instruktur
          setKelas(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Kelas Hari Ini</Text>
      <ScrollView>
        {kelas.map((bookingKls) => (
          <View style={styles.card} key={bookingKls.id}>
            <Text style={styles.label}>Hari:</Text>
            <Text style={styles.inputan}>{bookingKls.hari}</Text>
            <Text style={styles.label}>Tanggal:</Text>
            <Text style={styles.inputan}>{bookingKls.tanggal}</Text>
            <Text style={styles.label}>Kelas:</Text>
            <Text style={styles.inputan}>{bookingKls.nama_kelas}</Text>
            <Text style={styles.label}>Instruktur:</Text>
            <Text style={styles.inputan}>{bookingKls.nama_instruktur}</Text>
            {/* id adalah id dari jadwal harian */}
            <TouchableOpacity style={styles.buttonRed} onPress={() => navigation.navigate("CekPresensiKelas", { bookingId: bookingKls.id })}>
              <Text style={styles.buttonText}>Cek Presensi</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  inputan: {
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginBottom: 16,
  },
  buttonRed: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PresensiKelas;
