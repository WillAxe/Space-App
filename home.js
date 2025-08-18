import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
export default function Home() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Nasa</Text>
        <Text style={styles.text}>
          Nasa has 2 rovers currenlty exploring the martian surface, (Curiosity,
          Perseverance) with highly equipped instruments and cameras. This app
          give you opportunity to discover Nasas latest images from Curiosity
          and the daily astronomical picture of the day (APOD).
        </Text>
      </View>
    </SafeAreaProvider>
  )
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0b3d91",
    marginBottom: 12,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: "#333333",
    textAlign: "center",
  },
})
