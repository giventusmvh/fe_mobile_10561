import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";

const CekPresensiKelas = ({ route, navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Cek Presensi",
    });
  }, [navigation]);
  const [presensiData, setPresensiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { bookingId } = route.params;
      axios
        .get(`http://127.0.0.1:8000/api/presensiKelas/showToday/${bookingId}`)
        .then((response) => {
          // filter presensiData instruktur yang sesuai dengan ID instruktur
          setPresensiData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const presensiKelasH = async (id) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/presensiKelas/presensiHadir/${id}`);
      alert("Berhasil Presensi Member");
      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      if (error.response.data.cekPresensi) {
        alert("Instruktur belum Presensi!!!");
      }
      console.error(error);
    }
  };
  const presensiKelasT = async (id) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/presensiKelas/presensiTidakHadir/${id}`);
      alert("Berhasil Presensi Member");
      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      if (error.response.data.cekPresensi) {
        alert("Instruktur belum Presensi!!!");
      }
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Presensi Kelas</Text>
      <ScrollView>
        {presensiData.map((presensi) => (
          <View style={styles.card} key={presensi.id}>
            <Text style={styles.label}>Nomor Booking:</Text>
            <Text style={styles.inputan}>{presensi.no_booking}</Text>
            <Text style={styles.label}>Nama Member:</Text>
            <Text style={styles.inputan}>{presensi.nama_member}</Text>
            <Text style={styles.label}>Status Kelas:</Text>
            <Text style={styles.inputan}>{presensi.status_presensi === 0 ? "Tidak Hadir" : "Hadir"}</Text>
            {presensi.waktu_presensi_kelas !== null ? (
              <TouchableOpacity style={styles.buttonDisabled} disabled={true}>
                <Text style={styles.buttonText}>Hadir</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.buttonGreen} onPress={() => presensiKelasH(presensi.id)}>
                <Text style={styles.buttonText}>Hadir</Text>
              </TouchableOpacity>
            )}
            {presensi.waktu_presensi_kelas !== null ? (
              <TouchableOpacity style={styles.buttonDisabled} disabled={true}>
                <Text style={styles.buttonText}>Tidak Hadir</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.buttonRed} onPress={() => presensiKelasT(presensi.id)}>
                <Text style={styles.buttonText}>Tidak Hadir</Text>
              </TouchableOpacity>
            )}
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
  buttonGreen: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginBottom: 16,
  },
  buttonRed: {
    backgroundColor: "red",
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

export default CekPresensiKelas;
