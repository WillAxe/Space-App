import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  Modal,
  Pressable,
} from "react-native"
import { useEffect, useState } from "react"
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
import ImageViewer from "react-native-image-zoom-viewer"
import * as Sharing from "expo-sharing"
import * as FileSystem from "expo-file-system"

export default function Opportunity() {
  const [photo, setPhoto] = useState(null)
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(new Date())
  const [apiDate, setApiDate] = useState("")
  const [image, setImage] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  function fetchPhotoFromDate(selectedDate) {
    const formattedDate = selectedDate.toISOString().split("T")[0]
    fetch(
      `https://api.nasa.gov/planetary/apod?date=${formattedDate}&api_key=exMqslCiUXdM31JPmZ34uSseN3PuXSSWYGVdiodt`
    )
      .then((response) => response.json())
      .then((result) => {
        setPhoto(result.url)
        setDescription(result.explanation)
        setApiDate(result.date)
      })
  }

  useEffect(() => {
    fetchPhotoFromDate(new Date())
  }, [])

  useEffect(() => {
    if (date) {
      fetchPhotoFromDate(date)
    }
  }, [date])

  const showDate = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          setDate(selectedDate)
        }
      },
      mode: "date",
      is24Hour: true,
    })
  }

  //To share the image, the users needs to click on the image first, otherwise the share function wont work
  const shareImage = async () => {
    if (!image) return
    //Check if sharing is available on the device
    if (!(await Sharing.isAvailableAsync())) {
      alert("Sharing is not available on this platform")
      return
    }
    try {
      //Download the image to a temporary location so that EXPO sharing can access it
      //This is necessary because the image is not stored locally by default
      const imageUri = FileSystem.cacheDirectory + "dailyPicture.jpg"
      const downloadedImage = await FileSystem.downloadAsync(image, imageUri)
      await Sharing.shareAsync(downloadedImage.uri, {
        dialogTitle: "Share daily astronomical picture",
        url: image,
      })
    } catch (err) {
      console.log("error trying to share image", err)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Pressable
          onPress={() => {
            setImage(photo)
            setModalVisible(true)
          }}
        >
          <Image style={styles.img} source={{ uri: photo }}></Image>
        </Pressable>
        <Text style={styles.date}>Date: {apiDate}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View>
        <Button
          title="Share Picture"
          onPress={shareImage}
          color="#b4d91fff"
        ></Button>
      </View>
      <View>
        <Button title="Select date" onPress={showDate} color="#000000"></Button>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <ImageViewer
          imageUrls={[{ url: image }]}
          enableSwipeDown
          onCancel={() => setModalVisible(false)}
          onSwipeDown={() => setModalVisible(false)}
        ></ImageViewer>
      </Modal>
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
