import { View, Text, StyleSheet, Image, ScrollView } from "react-native"
import { useEffect, useState } from "react"

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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Image style={styles.img} source={{ uri: photo }}></Image>
        <Text style={styles.date}>Taken: {date}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
  },
  content: {
    width: "100%",
    backgroundColor: "#ffffffff",
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    elevation: 3,
    maxWidth: 400,
  },
  date: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 5,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    color: "#333333",
    marginTop: 10,
    // textAlign: "space-around",
    alignSelf: "center",
    maxWidth: 365,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  img: {
    justifyContent: "center",
    alignItems: "center",
    width: 400,
    height: 400,
    resizeMode: "cover",
  },
})
