import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HistoryKelas = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "List History Kelas Member",
    });
  }, [navigation]);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@dataKey");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const data = await getData();
        const id = data.id;
        if (id) {
          axios
            .get(`https://api.gofit.given.website/api/bookingKelas/history/${id}`)
            .then((response) => {
              setHistoryData(response.data.data);
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, []);
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!historyData) {
    return (
      <View>
        <Text>User not found</Text>
      </View>
    );
  }
  const renderHistoryItem = ({ item }) => (
    <View style={styles.row}>
      <View style={[styles.column, styles.borderRight]}>
        <Text style={styles.label}> Date:</Text>
        <Text>{item.tanggal}</Text>
      </View>
      <View style={[styles.column, styles.borderRight]}>
        <Text style={styles.label}>Kelas:</Text>
        <Text>{item.nama_kelas}</Text>
      </View>
      <View style={[styles.column, styles.borderRight]}>
        <Text style={styles.label}>Instruktur:</Text>
        <Text>{item.nama_instruktur}</Text>
      </View>
      <View style={[styles.column, styles.borderRight]}>
        <Text style={styles.label}>Jam:</Text>
        <Text>{item.jam_kelas}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.label}>Presensi:</Text>
        <Text>{item.cancel === "1" ? "cancel" : item.waktu_presensi_kelas}</Text>
      </View>
    </View>
  );

  return (
    <View>
      <FlatList data={historyData} renderItem={renderHistoryItem} keyExtractor={(item) => item.id.toString()} contentContainerStyle={styles.container} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
  rowAlternate: {
    backgroundColor: "#f2f2f2",
  },
  column: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 4,
  },
  borderRight: {
    borderRightWidth: 1,
    borderColor: "black",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
});

export default HistoryKelas;
