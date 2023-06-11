import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookingKelasMember = ({ navigation }) => {
  const [bookingKelas, setBookingKelas] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "List Booking Kelas",
    });
  }, [navigation]);

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
        .get(`https://api.gofit.given.website/api/bookingKelas/show/${id}`)
        .then((response) => {
          // filter bookingKls instruktur yang sesuai dengan ID instruktur
          setBookingKelas(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const cancelBooking = async (id) => {
    try {
      await axios.post(`https://api.gofit.given.website/api/bookingKelas/cancel/${id}`);
      // Hapus data booking dengan id yang sesuai dari state bookingKelas
      setBookingKelas((prevBookingKelas) => prevBookingKelas.filter((bookingKls) => bookingKls.id !== id));
    } catch (error) {
      if (error.response.data.telat) {
        alert("Tidak Bisa Cancel Booking Kelas Hari-H!");
      }
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("AddBookingKelas")} style={styles.button}>
        <Text style={styles.buttonText}>Mulai Booking Kelas</Text>
      </TouchableOpacity>
      <ScrollView>
        {bookingKelas.map((bookingKls) => (
          <View style={styles.card} key={bookingKls.id}>
            <Text style={styles.label}>Nomor Booking:</Text>
            <Text style={styles.inputan}>{bookingKls.no_booking}</Text>
            <Text style={styles.label}>Nama Kelas:</Text>
            <Text style={styles.inputan}>{bookingKls.nama_kelas}</Text>
            <Text style={styles.label}>Instruktur:</Text>
            <Text style={styles.inputan}>{bookingKls.nama_instruktur}</Text>
            <Text style={styles.label}>Instruktur Pengganti:</Text>
            <Text style={styles.inputan}>{bookingKls.pengganti}</Text>
            <Text style={styles.label}>Tanggal Kelas:</Text>
            <Text style={styles.inputan}>{bookingKls.tanggal}</Text>
            <Text style={styles.label}>Jam Kelas:</Text>
            <Text style={styles.inputan}>{bookingKls.jam_kelas}</Text>
            <Text style={styles.label}>Status Kelas:</Text>
            <Text style={styles.inputan}>{bookingKls.status_jadwalHarian === "1" ? "Aktif" : "Libur"}</Text>
            <TouchableOpacity onPress={() => cancelBooking(bookingKls.id)} style={styles.buttonRed}>
              <Text style={styles.buttonText}>Batalkan</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default BookingKelasMember;
