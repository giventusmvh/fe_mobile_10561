import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MemberScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="ios-log-out"
          size={20}
          color="#000"
          style={{ marginRight: 15 }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
      ),
      headerLeft: () => <Ionicons name="home-outline" size={20} color="#fff" style={{ marginLeft: 15 }} />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, { marginLeft: 10, marginRight: 10 }]} onPress={() => navigation.navigate("BookingKelasMember")}>
          <Ionicons name="clipboard-outline" size={40} color="#000" />
          <Text style={styles.buttonText}>Booking Kelas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { marginLeft: 10, marginRight: 10 }]} onPress={() => navigation.navigate("BookingGymMember")}>
          <Ionicons name="clipboard-outline" size={40} color="#000" />
          <Text style={styles.buttonText}>Booking Gym</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, { marginLeft: 10, marginRight: 10 }]} onPress={() => navigation.navigate("HistoryKelas")}>
          <Ionicons name="person-circle-outline" size={24} color="black" />
          <Text style={styles.buttonText}>Histori Kelas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { marginLeft: 10, marginRight: 10 }]} onPress={() => navigation.navigate("HistoryGym")}>
          <Ionicons name="person-circle-outline" size={24} color="black" />
          <Text style={styles.buttonText}>Histori Gym</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, { marginLeft: 10, marginRight: 10 }]} onPress={() => navigation.navigate("ProfileMember")}>
          <Ionicons name="person-circle-outline" size={24} color="black" />
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    width: 130,
    height: 130,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MemberScreen;
