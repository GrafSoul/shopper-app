import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkUser = async () => {
            if (await isAuthenticated()) {
                navigation.navigate('Lists');
            } else {
                navigation.navigate('SignIn');
            }
        };

        checkUser();
    }, []);

    const isAuthenticated = async () => {
        // await AsyncStorage.removeItem('token');
        const token = await AsyncStorage.getItem('token');
        return !!token;
    };

    return (
        <View style={styles.Splash}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    Splash: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
