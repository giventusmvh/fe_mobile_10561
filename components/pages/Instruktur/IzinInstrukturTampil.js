import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IzinInstrukturTampil = ({ navigation }) => {
  const [izinInstruktur, setIzinInstruktur] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "List Izin Instruktur",
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
        .get(`https://api.gofit.given.website/api/izinInstruktur/show/${id}`)
        .then((response) => {
          // filter izin instruktur yang sesuai dengan ID instruktur
          setIzinInstruktur(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("AjukanIzin")} style={styles.button}>
        <Text style={styles.buttonText}>Ajukan Izin</Text>
      </TouchableOpacity>
      <ScrollView>
        {izinInstruktur.map((izin) => (
          <View style={styles.card} key={izin.id}>
            <Text style={styles.label}>Nama Instruktur:</Text>
            <Text style={styles.inputan}>{izin.nama_instrukturIzin}</Text>
            <Text style={styles.label}>Nama Instruktur Pengganti:</Text>
            <Text style={styles.inputan}>{izin.nama_instrukturPengganti}</Text>
            <Text style={styles.label}>Tanggal Izin:</Text>
            <Text style={styles.inputan}>{izin.tgl_izin}</Text>
            <Text style={styles.label}>Tanggal Mengajukan Izin:</Text>
            <Text style={styles.inputan}>{izin.tgl_izin_dibuat}</Text>
            <Text style={styles.label}>Keterangan:</Text>
            <Text style={styles.inputan}>{izin.keterangan}</Text>
            <Text style={styles.label}>Status Konfirmasi:</Text>
            <Text style={styles.inputan}>{izin.konfirmasi === "1" ? "Sudah dikonfirmasi" : "Belum dikonfirmasi"}</Text>
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default IzinInstrukturTampil;
