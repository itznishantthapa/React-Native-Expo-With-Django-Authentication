import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity,Alert } from 'react-native';
import axios from 'axios';  
import { postData } from '../../service';

const Login = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const response=await postData('login',{username:username,password:password});
        if(response.success){
            Alert.alert('Success',response.data);
            navigation.navigate('Home');
        }
        else{
            Alert.alert('Error',response.data);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text)=>setUsername(text)}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={(text)=>setPassword(text)}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
                <Text>SignUp?</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default Login;