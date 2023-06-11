import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProfileMember = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Profile Member",
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
            .get(`https://api.gofit.given.website/api/user/${id}`)
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      const id = data.id;
      axios
        .get(`https://api.gofit.given.website/api/depositKelas/profile/${id}`)
        .then((response) => {
          setDeposits(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

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
          <Text style={styles.profileLabel}>ID:</Text>
          <Text style={styles.profileValue}>{user.id_member}</Text>

          <Text style={styles.profileLabel}>Nama:</Text>
          <Text style={styles.profileValue}>{user.nama_member}</Text>

          <Text style={styles.profileLabel}>Email:</Text>
          <Text style={styles.profileValue}>{user.email}</Text>

          <Text style={styles.profileLabel}>Tanggal Lahir:</Text>
          <Text style={styles.profileValue}>{user.tgl_lahir_member}</Text>

          <Text style={styles.profileLabel}>Telepon:</Text>
          <Text style={styles.profileValue}>{user.telp_member}</Text>

          <Text style={styles.profileLabel}>Alamat:</Text>
          <Text style={styles.profileValue}>{user.alamat_member}</Text>

          <Text style={styles.profileLabel}>Aktif Hingga:</Text>
          <Text style={styles.profileValue}>{user.tgl_expired_member}</Text>

          <Text style={styles.profileLabel}>Sisa Deposit Uang:</Text>
          <Text style={styles.profileValue}>{user.deposit_uang_member}</Text>

          <Text style={styles.profileLabel}>Status:</Text>
          <Text style={styles.profileValue}>{user.status_member === "1" ? "Aktif" : "Tidak Aktif"}</Text>
        </View>

        <View style={styles.depositSection}>
          <Text style={styles.depositTitle}>Data Deposit Kelas</Text>
          {deposits.map((deposit) => (
            <View key={deposit.id} style={styles.depositItem}>
              <Text style={styles.depositLabel}>Nama Kelas:</Text>
              <Text style={styles.depositValue}>{deposit.nama_kelas}</Text>

              <Text style={styles.depositLabel}>Masa Berlaku Deposit:</Text>
              <Text style={styles.depositValue}>{deposit.masa_berlaku_depositK}</Text>

              <Text style={styles.depositLabel}>Sisa Deposit:</Text>
              <Text style={styles.depositValue}>{deposit.sisa_depositK}</Text>

              <Text style={styles.center}>- - - - -</Text>
            </View>
          ))}
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

export default ProfileMember;
