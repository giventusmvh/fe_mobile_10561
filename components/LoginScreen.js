import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, ToastAndroid } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();
  // const showToastMember = () => {
  //   ToastAndroid.show('Berhasil Login Member !', ToastAndroid.SHORT);
  // };

  // const showToastInstruktur = () => {
  //   ToastAndroid.show('Berhasil Login Instruktur !', ToastAndroid.SHORT);
  // };

  // const showToastMO = () => {
  //   ToastAndroid.show('Berhasil Login MO !', ToastAndroid.SHORT);
  // };

  const handleLogin = () => {
    axios
      .post("http://127.0.0.1:8000/api/loginMobile", { email, password }, {})
      .then(async (response) => {
        if (response.data.success) {
          if (response.data.instruktur) {
            alert("berhasil login instruktur");
            const { id, name, email, user } = response.data;

            await saveData({ id, user }); // simpan data ke AsyncStorage
            console.log(id);

            console.log(user);
            navigation.navigate("Instruktur");
            // ToastAndroid.show("Request Instruktur successfully!", ToastAndroid.SHORT);
          } else if (response.data.member) {
            alert("berhasil login member");
            const { id, name, email, user } = response.data;

            await saveData({ id, user }); // simpan data ke AsyncStorage
            console.log(id);

            console.log(user);
            navigation.navigate("Member");
            // ToastAndroid.show("Request Member successfully!", ToastAndroid.SHORT);
          } else if (response.data.manager) {
            alert("berhasil login MO");
            const { id, name, email, user } = response.data;

            await saveData({ id, user }); // simpan data ke AsyncStorage
            console.log(id);

            console.log(user);
            navigation.navigate("Manager");
            // ToastAndroid.show("Request MO successfully!", ToastAndroid.SHORT);
          } else {
            alert("Tidak berhak login");
          }
        } else {
          alert("CEK LAGI BANG");
        }
        // simpan data user dan token pada AsyncStorage atau Redux store

        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log("network error1");
          // jika response diterima dari server, tampilkan pesan error pada aplikasi
          alert(error.response.data.message);
        } else if (error.request) {
          // jika tidak ada response, tampilkan pesan error "Network Error2"
          console.log("network error2");
          setErrorMessage("Network Error2");
        } else {
          // jika terdapat kesalahan lain, tampilkan pesan error pada konsol
          console.log("network error3");
          console.log(error.message);
        }
      });
  };

  const handlePricelist = () => {
    navigation.navigate("Pricelist");
  };

  const handleJadwalHarian = () => {
    navigation.navigate("JadwalHarianUmum");
  };

  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem("@dataKey", JSON.stringify(data));
      console.log("Data berhasil disimpan.");
    } catch (e) {
      console.log("Terjadi kesalahan saat menyimpan data:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.title}>Welcome to GoFit</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} value={password} onChangeText={setPassword} />
      <View style={styles.buttonContainer}>
        <Button title="Jadwal" onPress={handleJadwalHarian} style={styles.colorGreen} />
        <Button title="Login" onPress={handleLogin} />
        <Button title="Pricelist" onPress={handlePricelist} style={styles.colorGreen} />
      </View>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginVertical: 10,
    minWidth: "80%",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    width: "80%",
  },
  colorGreen: {
    backgroundColor: "green",
  },
});

export default Login;
