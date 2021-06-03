import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const onSubmit = () => {
        // submit
    };

    return (
        <View style={styles.Section}>
            <TextInput
                placeholder={'Email'}
                value={email}
                onChangeText={setEmail}
                style={styles.Input}
            />

            <TextInput
                placeholder={'Password'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.Input}
            />

            <Pressable onPress={onSubmit} style={styles.Button}>
                <Text style={styles.ButtonText}>Sign In</Text>
            </Pressable>

            <Pressable
                onPress={() => navigation.navigate('SignUp')}
                style={styles.ButtonSignUp}
            >
                <Text style={styles.ButtonTextSignUp}>
                    Don't have an account? Sign Up
                </Text>
            </Pressable>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    Section: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 15,
    },
    Input: {
        width: '100%',
        marginLeft: 10,
        marginBottom: 15,
        fontSize: 18,
        color: '#333',
        borderBottomColor: 'white',
    },
    Button: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 12,
        backgroundColor: '#e33062',
    },
    ButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    ButtonSignUp: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    ButtonTextSignUp: {
        color: '#e33062',
        fontSize: 18,
    },
});
