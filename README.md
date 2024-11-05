# React Native Expo with Django Authentication

Welcome everyone! In this documentation, I will teach you how to connect a React Native Expo app with a Django backend using a simple example with two screens: login and signup. By understanding this fundamental setup, you'll gain a solid understanding of full-stack development. Let's get started!

## Prerequisites

- Basic knowledge of React Native Expo and Django.
- React Native development environment set up.
- Python and Django installed.

## Getting Started

### Frontend Setup (React Native Expo)

1. Clone the repository:
    ```sh
    git clone https://github.com/itznishantthapa/React-Native-Expo-With-Django-Authentication.git
    cd React-Native-Expo-With-Django-Authentication
    ```

2. Install the dependencies:
    ```sh
    yarn install
    ```

3. Start the React Native Expo project:
    ```sh
    npx expo start
    ```

   You can scan the QR code from the Expo Go app on your physical device or run it on an Android emulator by pressing `a`. It is recommended to run the app on your own Android phone using the Expo Go app.

### Backend Setup (Django)

1. Create a virtual environment:
    ```sh
    python -m virtualenv env
    ```

2. Activate the virtual environment:
    ```sh
    env\scripts\activate
    ```

3. Install Django:
    ```sh
    pip install django
    ```

4. Start a new Django project:
    ```sh
    django-admin startproject my_project
    ```

   Ensure that you do not create your Django project inside the `env` folder. The structure should look like this:
    ```
    env/
    my_project/
    ```

5. Open the `my_project` folder in VS Code:
    ```sh
    cd my_project
    code .
    ```

6. Create a signup app:
    ```sh
    python manage.py startapp signup
    ```

7. Add the `signup` app to the `INSTALLED_APPS` in `my_project/settings.py`:
    ```python
    INSTALLED_APPS = [
        ...,
        "signup",
    ]
    ```

8. Install Django REST framework and Simple JWT:
    ```sh
    pip install djangorestframework djangorestframework-simplejwt
    ```

9. Add the following to `my_project/settings.py`:
    ```python
    REST_FRAMEWORK = {
        'DEFAULT_AUTHENTICATION_CLASSES': (
            'rest_framework_simplejwt.authentication.JWTAuthentication',
        ),
    }
    ```

10. In `signup/views.py`, write the logic to save user credentials to the database:
    ```python
    from django.contrib.auth.models import User
    from rest_framework.response import Response
    from rest_framework.decorators import api_view, permission_classes
    from rest_framework.permissions import AllowAny
    from rest_framework import status

    @api_view(['POST'])
    @permission_classes([AllowAny])
    def signup_view(request):
        data = request.data
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if User.objects.filter(username=username).exists():
            return Response({'message': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    ```

11. In `my_project/urls.py`, add the signup view:
    ```python
    from django.contrib import admin
    from django.urls import path, include
    from signup.views import signup_view

    urlpatterns = [
        path('admin/', admin.site.urls),
        path('signup/', signup_view),
    ]
    ```

12. Migrate the database:
    ```sh
    python manage.py migrate
    ```

13. Run the Django server on your local network:
    ```sh
    ipconfig
    ```

14. Find your IPv4 address and run:
    ```sh
    python manage.py runserver your_laptopIP_address:port
    #Example
    python manage.py runserver 192.168.1.65:5555 
    ```

### Connecting Frontend to Backend

1. In `service.js`, set up Axios to communicate with the Django API:
    ```javascript
    import axios from "axios";

    const api = axios.create({
      baseURL: "http://192.168.1.64:5555/",
    });

    export const postData = async (endpoint, data) => {
      try {
        const response = await api.post(`${endpoint}/`, data);
        return { success: true, data: response.data.message };
      } catch (error) {
        return { success: false, data: error.response?.data?.message || "Something went wrong" };
      }
    };
    ```

2. In `SignUp.tsx`, handle the signup process:
    ```tsx
    import React, { useState } from 'react';
    import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
    import { postData } from '../../service';

    const SignUp = ({ navigation }) => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [username, setUsername] = useState('');

        const data = {
            username: username,
            email: email,
            password: password
        }

        const handleSignUp = async () => {
            const response = await postData('signup', data);
            if (response.success) {
                Alert.alert('Success', response.data);
                navigation.navigate('Home');
            } else {
                Alert.alert('Error', response.data);
            }
        };

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />
                <Button title="Sign Up" onPress={handleSignUp} />
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text>Login?</Text>
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

    export default SignUp;
    ```

## Conclusion

You are now ready to go! Activate the Django server over the network and start the React Native app. When you click the signup button, the `handleSignUp` function is invoked asynchronously, sending the data to the backend. The backend processes the data and saves it to the database.

For practice, try implementing the login functionality yourself.

Happy coding!
