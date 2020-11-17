import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import Header from '../components/header';
import { theme } from '../styles/ThemeColour';

export default function Settings() {

    return(
        <View style= { styles.container }>
            <Header 
                home
                title= "Settings" 
            /> 

            <TouchableOpacity style= {{ alignItems: 'center' }}>
                <View style= { styles.notifications }>
                    <Icon 
                        name= "notifications" 
                        size= { 18 }
                        style= {{ color: 'white' }}
                    />
                    <Text style= {{ color: 'white', marginLeft: 5 }}> Notifications </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style= {{ alignItems: 'center' }}>
                <View style= { styles.info }>
                    <Icon 
                        name= "info" 
                        size= { 18 }
                        style= {{ color: 'white' }}
                    />
                    <Text style= {{ color: 'white', marginLeft: 5 }}> About </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style= {{ alignItems: 'center' }}>
                <View style= { styles.logOut }>
                    <Icon 
                        name= "logout" 
                        size= { 18 }
                        style= {{ color: 'white' }}
                    />
                    <Text style= {{ color: 'white', marginLeft: 5 }}> Log Out </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },

    info: {
        width: 250,
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: theme.primary
    },

    logOut: {
        width: 250,
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: theme.primary
    },

    textStyle: {
        fontSize: 30,
        marginTop: 30,
        marginLeft: 10,
        textAlign: 'center'
    },

    notifications: {
        width: 250,
        padding: 10,
        marginTop: 25,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: theme.primary
    }
})