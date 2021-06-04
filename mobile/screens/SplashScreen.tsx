import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        if (isAuthenticated()) {
            navigation.navigate('Lists');
        } else {
            navigation.navigate('SignIn');
        }
    }, []);

    const isAuthenticated = () => {
        return false;
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
