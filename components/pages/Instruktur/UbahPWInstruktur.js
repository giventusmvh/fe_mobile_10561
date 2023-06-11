import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UbahPWInstruktur = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Ubah Password Instruktur",
    });
  }, [navigation]);
  const [password, setPassword] = useState("");
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@dataKey");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
  const handleUbahPassword = async () => {
    const data = await getData();
    const id = data.id;
    const url = `https://api.gofit.given.website/api/instruktur/ubahPW/${id}`;
    // const token = await AsyncStorage.getItem("token");

    try {
      const response = await axios.put(url, { password });
      alert("Berhasil Ubah Password");
      console.log(response.data);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ubah Password</Text>
      <TextInput style={styles.input} placeholder="Password Baru" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleUbahPassword}>
        <Text style={styles.buttonText}>Simpan</Text>
      </TouchableOpacity>
    </View>
  );
};
UbahPWInstruktur.navigationOptions = {
  title: "Ubah Password Instruktur",
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "80%",
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default UbahPWInstruktur;
