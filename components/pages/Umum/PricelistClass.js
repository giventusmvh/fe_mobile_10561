import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const PricelistClass = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Pricelist",
    });
  }, [navigation]);
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    fetchClassList();
  }, []);

  const fetchClassList = async () => {
    try {
      const response = await fetch("https://api.gofit.given.website/api/kelas");
      const data = await response.json();
      setClassList(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderClassItem = ({ item }) => (
    <View style={styles.classItem}>
      <Text style={styles.className}>{item.nama_kelas}</Text>
      <Text style={styles.classPrice}>Rp.{item.harga_kelas}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biaya Lain-Lain</Text>
      <Text style={styles.className}>Aktivasi</Text>
      <Text style={styles.classPrice}>Rp.3000000</Text>
      <Text style={styles.className}>Deposit Reguler Uang</Text>
      <Text style={styles.classPrice}>Bonus Rp.300000 untuk transaksi Rp.3000000</Text>
      <Text style={styles.className}>Deposit Kelas Paket</Text>
      <Text style={styles.classPrice}>Bonus 1 pertemuan untuk transaksi 5 pertemuan</Text>
      <Text style={styles.classPrice}>Bonus 3 pertemuan untuk transaksi 10 pertemuan</Text>
      <Text style={styles.title}>Daftar Kelas</Text>
      <FlatList data={classList} renderItem={renderClassItem} keyExtractor={(item) => item.id.toString()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 16,
  },
  classItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  className: {
    fontSize: 16,
    fontWeight: "bold",
  },
  classPrice: {
    fontSize: 16,
    color: "green",
  },
});

export default PricelistClass;
