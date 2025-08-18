import { View, Text, StyleSheet, Image, FlatList, Button } from "react-native"
import { useEffect, useState } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"

export default function Curiosity() {
  const [date, setDate] = useState(new Date())
  const [photos, setPhotos] = useState([])

  function fetchPhotos(selectedDate) {
    const formattedDate = selectedDate.toISOString().split("T")[0]
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${formattedDate}&api_key=exMqslCiUXdM31JPmZ34uSseN3PuXSSWYGVdiodt`
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.photos[0].img_src)
        setPhotos(result.photos || [])
      })
  }

  useEffect(() => {
    fetchPhotos(date)
  }, [])

  const showDate = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          setDate(selectedDate)
          fetchPhotos(selectedDate)
        }
      },
      mode: "date",
      is24Hour: true,
    })
  }
  return (
    <SafeAreaProvider>
      <View style={styles.homeContainer}>
        <Text style={styles.title}>Curiosity Rover on Mars</Text>
        <Button title="Chose date" onPress={showDate} color="0b3d91"></Button>
        <Text style={styles.subTitle}>
          Chosen date: {date.toISOString().split("T")[0]}
        </Text>
      </View>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          data={photos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.imageSection}>
              <Image style={styles.img} source={{ uri: item.img_src }}></Image>
              <Text style={styles.text}>
                Taken on {item.earth_date} by {item.camera.full_name}
              </Text>
            </View>
          )}
          vertical
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backGroundColor: "#f5f5f5",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0b3d91",
    textAlign: "center",
    marginBottom: 15,
  },
  list: {
    paddingBottom: 10,
    backgroundColor: "#e1e1e1ff",
  },
  imageSection: {
    borderRadius: 10,
    shadowColor: "#0f0f0f",
    overflow: "hidden",
    shadowRadius: 5,
    marginBottom: 15,
    backgroundColor: "#c8c6c6ff",
  },
  img: {
    width: "90%",
    height: 250,
    margin: 5,
    backgroundColor: "#e7e7e7",
    alignSelf: "center",
  },
  text: {
    color: "#ff9800",
    fontWeight: 600,
    fontSize: 14,
    padding: 5,
    backgroundColor: "#e7e7e7ff",
  },
})
