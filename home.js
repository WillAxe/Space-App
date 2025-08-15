import { View, Text, StyleSheet } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
export default function Home() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.text}>Nasa rovers on Mars</Text>
        <Text style={styles.text}>
          Nasa has 2 rovers currenlty exploring the martian surface,(Curiosity,
          Perseverance) with highly equipped instruments and cameras. This app
          shows pictures from Curiositys mission. This app also give you Nasas
          Astronomy Picture of the Day!
        </Text>
      </View>
    </SafeAreaProvider>
  )
}
const styles = StyleSheet.create({
  homeContainer: {
    justifyContent: "center",
  },
})
