import React,{useState} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { postProfilePicture } from '../../service';

const Home = ({ navigation }) => {
  const [image, setimage] = useState(null)
    const handleLogout = () => {
        navigation.navigate('Login');
    };

    const imagePicker= async()=>{
         let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
          })  

          if(!result.canceled){
           setimage(result.assets[0].uri)
           console.log(result.assets[0].uri)
          }
          const response = await postProfilePicture('profile-picture-upload',image);
            if(response.success){
                console.log(response.data)
            }
            else{
                console.log(response.data)
            }
    }

    

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <Text style={styles.messageText}>You have successfully logged in.</Text>
            <Button title="Logout" onPress={handleLogout} />
            <Button title='Open Gallary' onPress={imagePicker} ></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    messageText: {
        fontSize: 18,
        marginBottom: 40,
    },
});

export default Home;