import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const AjukanIzin = () => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Ajukan Izin",
    });
  }, [navigation]);
  const [idInstruktur, setIdInstruktur] = useState("");
  const [idInstrukturPengganti, setIdInstrukturPengganti] = useState("");
  const [idJadwalHarian, setIdJadwalHarian] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [tglIzin, setTglIzin] = useState("");
  const navigation = useNavigation();

  const [instrukturs, setInstrukturs] = useState([]);
  const [jadwalHarians, setJadwalHarians] = useState([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@dataKey");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // Get data instruktur from API
    axios
      .get("http://127.0.0.1:8000/api/instruktur")
      .then((response) => {
        setInstrukturs(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Get data jadwalHarian from API
    axios
      .get("http://127.0.0.1:8000/api/jadwalHarian/index")
      .then((response) => {
        setJadwalHarians(response.data.data);
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
        "http://127.0.0.1:8000/api/izinInstruktur/ajukanIzin",
        {
          id_instruktur: id,
          id_instruktur_pengganti: idInstrukturPengganti,
          id_jadwalHarian: idJadwalHarian,
          keterangan: keterangan,
        },
        {}
      )
      .then((response) => {
        console.log(response);
        alert("Izin berhasil diajukan");
        navigation.navigate("Instruktur");
      })
      .catch((error) => {
        console.log(error.response);
        navigation.navigate("Instruktur");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pilih Instruktur Pengganti</Text>
      <View>
        <Picker style={styles.dropdownContainer} selectedValue={idInstrukturPengganti} onValueChange={(value) => setIdInstrukturPengganti(value)}>
          <Picker.Item label="Pilih Instruktur Pengganti" value="" />
          {instrukturs.map((instruktur) => (
            <Picker.Item key={instruktur.id} label={instruktur.nama_instruktur} value={instruktur.id} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Pilih Jadwal Harian</Text>
      <View>
        <Picker style={styles.dropdownContainer} selectedValue={idJadwalHarian} onValueChange={(value) => setIdJadwalHarian(value)}>
          <Picker.Item label="Pilih Jadwal Harian" value="" />
          {jadwalHarians.map((jadwal) => (
            <Picker.Item key={jadwal.id} label={`${jadwal.nama_instruktur}-${jadwal.nama_kelas} - ${jadwal.tanggal}`} value={jadwal.id} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Keterangan</Text>
      <TextInput style={styles.input} value={keterangan} onChangeText={(value) => setKeterangan(value)} placeholder="Masukkan Keterangan Izin" />
      <TouchableOpacity style={styles.button} onPress={submitIzin}>
        <Text style={styles.buttonText}>Ajukan Izin</Text>
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
export default AjukanIzin;
