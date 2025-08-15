import { View, Text, StyleSheet, Image } from "react-native"
import { useEffect, useState } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"

export default function Opportunity() {
  const [photo, setPhoto] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=exMqslCiUXdM31JPmZ34uSseN3PuXSSWYGVdiodt"
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.title)
        setPhoto(result.url)
        setDescription(result.explanation)
        setDate(result.date)
      })
  }, [])
  return (
    <SafeAreaProvider>
      <View style={styles.text}>
        <Image style={styles.img} source={{ uri: photo }}></Image>
        <Text>{date}</Text>
        <Text>{description}</Text>
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  text: {
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
    margin: 5,
  },
})
