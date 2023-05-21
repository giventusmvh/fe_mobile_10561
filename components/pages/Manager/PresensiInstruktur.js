import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import axios from "axios";
import { ScrollView } from "react-native";

const PresensiInstruktur = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Presensi Instruktur",
    });
  }, [navigation]);

  const [jadwalHarian, setJadwalHarian] = useState([]);

  useEffect(() => {
    fetchJadwalHarian();
  }, []);

  const fetchJadwalHarian = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/jadwalHarian/indexToday");
      setJadwalHarian(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateJamMulai = async (id) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/presensiInstruktur/jamMulai/${id}`);
      alert("Berhasil Update Jam Mulai");
      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      if (error.response.data.jamMulai) {
        alert("Tidak Bisa Update Jam Mulai!!");
      }
      console.error(error);
    }
  };

  const updateJamSelesai = async (id) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/presensiInstruktur/jamSelesai/${id}`);
      alert("Berhasil Update Jam Selesai");
      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      if (error.response.data.jamSelesai) {
        alert("Tidak Bisa Update Jam Selesai!!");
      }
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.jadwalItem}>
      <Text style={styles.hari}>{item.hari}</Text>
      <Text style={styles.tanggal}>Tanggal : {item.tanggal}</Text>
      <Text style={styles.jamKelas}>Jam : {item.jam_kelas}</Text>
      <Text style={styles.kelas}>Kelas : {item.nama_kelas}</Text>
      <Text style={styles.instruktur}>Instruktur : {item.nama_instruktur}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Jam Mulai" onPress={() => updateJamMulai(item.id)} />
        <Button title="Jam Selesai" onPress={() => updateJamSelesai(item.id)} />
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kelas Hari Ini</Text>
      <ScrollView>
        <FlatList data={jadwalHarian} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} contentContainerStyle={styles.listContainer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  jadwalItem: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  tanggal: {
    fontSize: 14,
    marginBottom: 4,
  },
  jamKelas: {
    fontSize: 14,
    marginBottom: 4,
  },
  hari: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  kelas: {
    fontSize: 14,
    marginBottom: 4,
  },
  instruktur: {
    fontSize: 14,
  },
});

export default PresensiInstruktur;
