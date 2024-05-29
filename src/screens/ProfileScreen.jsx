import { View, Text } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'

export const ProfileScreen = () => {
    const [data, setData] = useState({})

    useEffect(() => {
        getDataLogin()
    },[])

    const getDataLogin = async() => {
        try {
            const name = await AsyncStorage.getItem('nome')
            const email = await AsyncStorage.getItem('email')
            setData({name: name, email: email})
        }catch(error){
            console.log(error)
        }
    }


    return(
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Nome: {data.name}</Text>
            <Text>Email: {data.email}</Text>
        </View>
    ) 
}