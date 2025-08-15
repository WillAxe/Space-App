import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import Curiosity from "./curiosity"
import Home from "./home"
import DailyPicture from "./dailyPicture"
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"
import { NativeRouter, Route, Routes, Link } from "react-router-native"

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeRouter>
        <SafeAreaView style={styles.container}>
          <View style={styles.navbar}>
            <Link to="/">
              <Text>Home</Text>
            </Link>
            <Link to="/curiosity">
              <Text>Curiosity</Text>
            </Link>
            <Link to="/dailyPicture">
              <Text>Picture of the day</Text>
            </Link>
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/curiosity" Component={Curiosity} />
              <Route path="/dailyPicture" Component={DailyPicture} />
            </Routes>
            <StatusBar style="auto" />
          </View>
        </SafeAreaView>
      </NativeRouter>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  navbar: {
    justifyContent: "center",
    alignItems: "center",
  },
})
