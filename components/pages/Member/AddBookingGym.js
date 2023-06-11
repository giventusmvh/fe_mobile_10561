import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const AddBookingGym = () => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Tambah Booking Gym",
    });
  }, [navigation]);
  const [idMember, setIdMember] = useState("");
  const [idSesi, setIdSesi] = useState("");
  const [tglBooking, setTglBooking] = useState("");
  const navigation = useNavigation();

  const [sesis, setSesis] = useState([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@dataKey");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // Get data sesi from API
    axios
      .get("https://api.gofit.given.website/api/sesi")
      .then((response) => {
        setSesis(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submitIzin = async () => {
    const token = await AsyncStorage.getItem("token");
    const data = await getData();
    const id = data.id;

    // Set idInstruktur from AsyncStorage

    console.log(id);
    // Send data to API
    axios
      .post(
        "https://api.gofit.given.website/api/bookingGym",
        {
          id_member: id,
          id_sesi: idSesi,
          tgl_booking: tglBooking,
        },
        {}
      )
      .then((response) => {
        console.log(response);
        alert("Berhasil Booking");
        navigation.navigate("Member");
      })
      .catch((error) => {
        if (error.response.data.gagalaktivasi) {
          alert("Anda Belum Aktivasi!");
        } else if (error.response.data.gagalpernahbooking) {
          alert("Tidak bisa booking double di hari yang sama!");
        } else if (error.response.data.gagalkuota) {
          alert("Gym Full!");
        }
        console.log(error.response);
        navigation.navigate("Member");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sesi</Text>
      <View>
        <Picker selectedValue={idSesi} onValueChange={(itemValue) => setIdSesi(itemValue)} style={styles.dropdownContainer}>
          <Picker.Item label="Pilih Sesi" value="" />
          {sesis.map((sesi) => (
            <Picker.Item key={sesi.id} label={`${sesi.id} | ${sesi.jam_mulai} - ${sesi.jam_selesai}`} value={sesi.id} />
          ))}
        </Picker>
      </View>
      <View>
        <Text style={styles.label}>Tanggal Booking</Text>
        <TextInput style={styles.dropdownContainer} placeholder="YYYY-MM-DD" value={tglBooking} onChangeText={(text) => setTglBooking(text)} />
      </View>
      <TouchableOpacity style={styles.button} onPress={submitIzin}>
        <Text style={styles.buttonText}>Tambah Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#0080ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default AddBookingGym;
