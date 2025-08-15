import { View, Text, StyleSheet, Image, FlatList } from "react-native"
import { useEffect, useState } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"

export default function Curiosity() {
  const [photos, setPhotos] = useState([])
  useEffect(() => {
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=exMqslCiUXdM31JPmZ34uSseN3PuXSSWYGVdiodt`
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.photos[0].img_src)
        setPhotos(result.photos)
      })
  }, [])
  return (
    <SafeAreaProvider>
      <View style={styles.text}>
        <FlatList
          contentContainerStyle={styles.list}
          data={photos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Image style={styles.img} source={{ uri: item.img_src }}></Image>
          )}
          vertical
        />
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  text: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
    margin: 5,
    // resizeMode: "cover",
  },
  list: {
    // flex: 1,
    // height: 10,
    alignItems: "center",
    justifyContent: "center",
  },
})
