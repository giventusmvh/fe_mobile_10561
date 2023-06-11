import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProfileInstruktur = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Profile Instruktur",
    });
  }, [navigation]);
  const [user, setUser] = useState(null);
  const [deposits, setDeposits] = useState([]);
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
    const fetchUser = async () => {
      try {
        const data = await getData();
        const id = data.id;
        if (id) {
          axios
            .get(`https://api.gofit.given.website/api/instruktur/${id}`)
            .then((response) => {
              setUser(response.data.data);
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

    fetchUser();
  }, []);
  if (!user) {
    return (
      <View>
        <Text>User not found</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.profileContainer}>
          <Text style={styles.profileLabel}>Nama:</Text>
          <Text style={styles.profileValue}>{user.nama_instruktur}</Text>

          <Text style={styles.profileLabel}>Email:</Text>
          <Text style={styles.profileValue}>{user.email}</Text>

          <Text style={styles.profileLabel}>Tanggal Lahir:</Text>
          <Text style={styles.profileValue}>{user.tgl_lahir_instruktur}</Text>

          <Text style={styles.profileLabel}>Telepon:</Text>
          <Text style={styles.profileValue}>{user.telp_instruktur}</Text>

          <Text style={styles.profileLabel}>Alamat:</Text>
          <Text style={styles.profileValue}>{user.alamat_instruktur}</Text>
          <Text style={styles.profileLabel}>Akumulasi Keterlambatan:</Text>
          <Text style={styles.profileValue}>{user.akumulasi_terlambat} detik</Text>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  center: {
    textAlign: "center", // <-- the magic
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  profileContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  profileLabel: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileValue: {
    marginBottom: 12,
  },
  depositSection: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  depositTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  depositItem: {
    marginBottom: 12,
  },
  depositLabel: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  depositValue: {
    marginBottom: 8,
  },
});
export default ProfileInstruktur;
