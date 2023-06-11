import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./components/LoginScreen";
import InstrukturScreen from "./components/pages/Instruktur/InstrukturScreen";
import UbahPWInstruktur from "./components/pages/Instruktur/UbahPWInstruktur";
import IzinInstrukturTampil from "./components/pages/Instruktur/IzinInstrukturTampil";
import AjukanIzin from "./components/pages/Instruktur/AjukanIzin";
import UbahPWManager from "./components/pages/Manager/UbahPWManager";
import MemberScreen from "./components/pages/Member/MemberScreen";
import BookingKelasMember from "./components/pages/Member/BookingKelasMember";
import BookingGymMember from "./components/pages/Member/BookingGymMember";
import AddBookingKelas from "./components/pages/Member/AddBookingKelas";
import AddBookingGym from "./components/pages/Member/AddBookingGym";
import ManagerScreen from "./components/pages/Manager/ManagerScreen";
import PresensiInstruktur from "./components/pages/Manager/PresensiInstruktur";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PricelistClass from "./components/pages/Umum/PricelistClass";
import JadwalHarianUmum from "./components/pages/Umum/JadwalHarianUmum";
import PresensiKelas from "./components/pages/Instruktur/PresensiKelas";
import CekPresensiKelas from "./components/pages/Instruktur/CekPresensiKelas";
import ProfileMember from "./components/pages/Member/ProfileMember";
import ProfileInstruktur from "./components/pages/Instruktur/ProfileInstruktur";
import HistoryGym from "./components/pages/Member/HistoryGym";
import HistoryKelas from "./components/pages/Member/HistoryKelas";
import HistoryInstruktur from "./components/pages/Instruktur/HistoryInstruktur";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Instruktur" component={InstrukturScreen} />
        <Stack.Screen name="ProfileInstruktur" component={ProfileInstruktur} />
        <Stack.Screen name="UbahPWInstruktur" component={UbahPWInstruktur} />
        <Stack.Screen name="IzinInstrukturTampil" component={IzinInstrukturTampil} />
        <Stack.Screen name="AjukanIzin" component={AjukanIzin} />
        <Stack.Screen name="Member" component={MemberScreen} />
        <Stack.Screen name="ProfileMember" component={ProfileMember} />
        <Stack.Screen name="BookingKelasMember" component={BookingKelasMember} />
        <Stack.Screen name="BookingGymMember" component={BookingGymMember} />
        <Stack.Screen name="AddBookingKelas" component={AddBookingKelas} />
        <Stack.Screen name="AddBookingGym" component={AddBookingGym} />
        <Stack.Screen name="HistoryGym" component={HistoryGym} />
        <Stack.Screen name="HistoryKelas" component={HistoryKelas} />
        <Stack.Screen name="Manager" component={ManagerScreen} />
        <Stack.Screen name="PresensiInstruktur" component={PresensiInstruktur} />
        <Stack.Screen name="HistoryInstruktur" component={HistoryInstruktur} />
        <Stack.Screen name="UbahPWManager" component={UbahPWManager} />
        <Stack.Screen name="Pricelist" component={PricelistClass} />
        <Stack.Screen name="JadwalHarianUmum" component={JadwalHarianUmum} />
        <Stack.Screen name="PresensiKelas" component={PresensiKelas} />

        <Stack.Screen name="CekPresensiKelas" component={CekPresensiKelas} options={({ route }) => ({ title: `Cek Presensi - ${route.params.bookingId}` })} />

        {/* Tambahkan screen lain di sini */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
