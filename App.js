import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import Rovers from "./rovers"
import Home from "./home"
import DailyPicture from "./dailyPicture"
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"
import {
  NativeRouter,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-native"

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeRouter>
        <SafeAreaView style={styles.container}>
          <View style={styles.navbar}>
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/rovers" Component={Rovers} />
              <Route path="/dailyPicture" Component={DailyPicture} />
            </Routes>
          </View>
          <Navbar />
          <StatusBar style="inverted" />
        </SafeAreaView>
      </NativeRouter>
    </SafeAreaProvider>
  )
}

function Navbar() {
  const locataion = useLocation()
  return (
    <View style={styles.navLinks}>
      <NavItem
        to="/"
        label="Home"
        active={locataion.pathname === "/"}
      ></NavItem>
      <NavItem
        to="/rovers"
        label="Rovers"
        active={locataion.pathname === "/rovers"}
      ></NavItem>
      <NavItem
        to="/dailyPicture"
        label="Picture"
        active={locataion.pathname === "/dailyPicture"}
      ></NavItem>
    </View>
  )
}

function NavItem({ to, label, active }) {
  return (
    <Link
      to={to}
      component={TouchableOpacity}
      style={[styles.navItem, active && styles.navItemActive]}
    >
      <Text style={[styles.navText, active && styles.navTextActive]}>
        {label}
      </Text>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b3d91",
  },
  navbar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  navLinks: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#0b3d91",
  },
  navItem: {
    padding: 8,
    borderRadius: 8,
  },
  navItemActive: {
    backgroundColor: "#ff9800",
  },
  navText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  navTextActive: {
    color: "#ffffff",
    fontWeight: "heavy",
  },
})
