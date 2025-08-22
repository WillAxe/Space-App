import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Button,
  ScrollView,
  Pressable,
  Modal,
} from "react-native"

import { useEffect, useState } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
import { RadioGroup } from "react-native-radio-buttons-group"
import ImageViewer from "react-native-image-zoom-viewer"

export default function Rovers() {
  //For better and cleaner code I could have used, useMemo for radioButtons but
  //have no idea on  neither how to implement it correctly, nor how it works
  const radioButtons = [
    {
      id: "1",
      label: "Curiosity",
      value: "curiosity",
    },
    {
      id: "2",
      label: "Opportunity",
      value: "opportunity",
    },
    {
      id: "3",
      label: "Spirit",
      value: "spirit",
    },
  ]

  const [value, setValue] = useState("")
  const [selectedId, setSelectedId] = useState()
  const [date, setDate] = useState(new Date())
  const [photos, setPhotos] = useState([])
  const [status, setStatus] = useState("")
  const [landingDate, setLandingDate] = useState("")
  const [launchDate, setLaunchDate] = useState("")
  const [totalImages, setTotalImages] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  //Fetch some data about the rover's mission's
  function fetchMissionData(roverName) {
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}?api_key=exMqslCiUXdM31JPmZ34uSseN3PuXSSWYGVdiodt`
    )
      .then((response) => response.json())
      .then((result) => {
        setStatus(result.photo_manifest.status)
        setLandingDate(result.photo_manifest.landing_date)
        setLaunchDate(result.photo_manifest.launch_date)
        setTotalImages(result.photo_manifest.total_photos)
      })
  }

  useEffect(() => {
    if (selectedId) {
      const selectedRover = radioButtons.find(
        (radioButtons) => radioButtons.id === selectedId
      )
      if (selectedRover) {
        setValue(selectedRover.value)
      }
    }
  }, [selectedId])

  useEffect(() => {
    if (value) {
      fetchMissionData(value)
    }
  }, [value])

  //Fetch for the curiosity rover, sadly the api no longer got the images from the spririt and opportunity rovers
  function fetchPhotos(selectedDate) {
    const formattedDate = selectedDate.toISOString().split("T")[0]
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${formattedDate}&page=1&api_key=exMqslCiUXdM31JPmZ34uSseN3PuXSSWYGVdiodt`
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.photos[0].img_src)
        setPhotos(result.photos || [])
      })
  }

  useEffect(() => {
    fetchPhotos(date)
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
  return (
    <SafeAreaProvider style={styles.rovers}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.homeContainer}>
          <Text style={styles.title}>Rovers on Mars</Text>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={setSelectedId}
            selectedId={selectedId}
          ></RadioGroup>
          <View style={styles.missionInfo}>
            <Text style={styles.missionTitle}>Mission Info: {value}</Text>
            <View style={styles.missionInfoRow}>
              <Text style={styles.textLabel}>Mission status:</Text>
              <Text style={styles.textValue}>{status}</Text>
            </View>
            <View style={styles.missionInfoRow}>
              <Text style={styles.textLabel}>Launch date:</Text>
              <Text style={styles.textValue}>{launchDate}</Text>
            </View>
            <View style={styles.missionInfoRow}>
              <Text style={styles.textLabel}>Landing date:</Text>
              <Text style={styles.textValue}>{landingDate}</Text>
            </View>
            <View style={styles.missionInfoRow}>
              <Text style={styles.textLabel}>Total images:</Text>
              <Text style={styles.textValue}>{totalImages}</Text>
            </View>
          </View>

          <Button
            title="Select date"
            onPress={showDate}
            color="#000000"
          ></Button>
          <Text style={styles.subTitle}>
            Selected date: {date.toISOString().split("T")[0]}
          </Text>
        </View>
        <View style={styles.container}>
          {photos.length > 0 ? (
            <FlatList
              contentContainerStyle={styles.list}
              data={photos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.imageSection}>
                  <Pressable
                    onPress={() => {
                      setSelectedImage(item.img_src)
                      setModalVisible(true)
                    }}
                    style={({ pressed }) => [
                      {
                        width: pressed ? "80%" : "90%",
                        height: pressed ? 300 : 250,
                      },
                      styles.pressable,
                    ]}
                  >
                    <Image
                      alt="picture taken from Curiosity on Mars"
                      style={styles.img}
                      source={{ uri: item.img_src }}
                    ></Image>
                  </Pressable>
                  <Text style={styles.text}>
                    Taken on {item.earth_date} by {item.camera.full_name} camera
                  </Text>
                </View>
              )}
              vertical
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          ) : (
            <Text style={styles.errMsg}>No images for the selected date!</Text>
          )}
        </View>
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <ImageViewer
            imageUrls={photos.map((p) => ({ url: p.img_src }))}
            index={photos.findIndex((p) => p.img_src === selectedImage)}
            enableSwipeDown
            onCancel={() => setModalVisible(false)}
            onSwipeDown={() => setModalVisible(false)}
          ></ImageViewer>
        </Modal>
      </ScrollView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  rovers: {
    backgroundColor: "#f5f5f5",
    padding: 50,
  },
  missionInfo: {
    padding: 2,
    backgroundColor: "#f5f5f5",
    elevation: 3,
  },
  missionTitle: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: "#0b3d91",
    marginBottom: 10,
  },
  missionInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  textLabel: {
    fontWeight: "600",
    color: "#333333",
    marginBottom: 12,
  },
  textValue: {
    color: "#555555",
  },
  homeContainer: {
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
  subTitle: {
    marginTop: 10,
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
    color: "#0b3d91",
    fontWeight: 600,
    fontSize: 14,
    padding: 5,
    backgroundColor: "#e7e7e7",
  },
  errMsg: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#0b3d91",
  },
})
