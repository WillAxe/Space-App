import { View, Text, StyleSheet } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
export default function Home() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Astro-Lens</Text>
        <Text style={styles.text}>
          See space through NASA&#39;s eyes -- NASA has 2 rovers currenlty
          operating on Mars and exploring the martian surface, (Curiosity,
          Perseverance) with highly equipped instruments and cameras. This app
          gives you opportunity to discover NASA&#39;s latest images from the
          Curiosity rover and the daily astronomical picture of the day (APOD).
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
