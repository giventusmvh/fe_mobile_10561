import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import axios from "axios";

const JadwalHarianUmum = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Jadwal Harian",
    });
  }, [navigation]);
  const [jadwalHarian, setJadwalHarian] = useState([]);

  useEffect(() => {
    fetchJadwalHarian();
  }, []);

  const fetchJadwalHarian = async () => {
    try {
      const response = await axios.get("https://api.gofit.given.website/api/jadwalHarian/index");
      setJadwalHarian(response.data.data);
    } catch (error) {
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
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Jadwal Harian</Text>

      <FlatList data={jadwalHarian} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} contentContainerStyle={styles.listContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default JadwalHarianUmum;
