import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookingGymMember = ({ navigation }) => {
  const [bookingGym, setBookingGym] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "List Booking Gym",
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
        .get(`http://127.0.0.1:8000/api/bookingGym/show/${id}`)
        .then((response) => {
          // filter bookingGym instruktur yang sesuai dengan ID instruktur
          setBookingGym(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const cancelBooking = async (id) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/bookingGym/cancel/${id}`);
      // Hapus data booking dengan id yang sesuai dari state bookingGym
      setBookingGym((prevBookingKelas) => prevBookingKelas.filter((bookingGym) => bookingGym.id !== id));
    } catch (error) {
      if (error.response.data.telat) {
        alert("Tidak Bisa Cancel Booking Gym Hari-H!");
      }
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("AddBookingGym")} style={styles.button}>
        <Text style={styles.buttonText}>Mulai Booking Gym</Text>
      </TouchableOpacity>
      <ScrollView>
        {bookingGym.map((bookingGym) => (
          <View style={styles.card} key={bookingGym.id}>
            <Text style={styles.label}>Nomor Booking:</Text>
            <Text style={styles.inputan}>{bookingGym.no_booking}</Text>
            <Text style={styles.label}>Nama Member:</Text>
            <Text style={styles.inputan}>{bookingGym.nama_member}</Text>
            <Text style={styles.label}>Sesi:</Text>
            <Text style={styles.inputan}>{bookingGym.id_sesi}</Text>
            <Text style={styles.label}>Jam Mulai:</Text>
            <Text style={styles.inputan}>{bookingGym.jam_mulai}</Text>
            <Text style={styles.label}>Jam Selesai:</Text>
            <Text style={styles.inputan}>{bookingGym.jam_selesai}</Text>
            <Text style={styles.label}>Tanggal Booking:</Text>
            <Text style={styles.inputan}>{bookingGym.tgl_booking}</Text>
            <Text style={styles.label}>Tanggal Mengajukan Booking:</Text>
            <Text style={styles.inputan}>{bookingGym.created_at}</Text>
            <TouchableOpacity onPress={() => cancelBooking(bookingGym.id)} style={styles.buttonRed}>
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

export default BookingGymMember;
