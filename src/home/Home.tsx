import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Home = ({ navigation }) => {
    const handleLogout = () => {
        // Add your logout logic here
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <Text style={styles.messageText}>You have successfully logged in.</Text>
            <Button title="Logout" onPress={handleLogout} />
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