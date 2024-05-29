import { View, Text, StyleSheet, Pressable, Image } from "react-native"; 
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const ProductsScreen = ({ route }) => {
    const [email, setEmail] = useState('');
    const [products, setProducts] = useState([]);
    const infoCategory = route.params.infoCategory;

    useEffect(() => {
        getEmail();
    }, []);

    useEffect(() => {
        if (email) {
            getProduct();
        }
    }, [email]);

    const getEmail = async () => {
        try {
            const value = await AsyncStorage.getItem('email');
            if (value) {
                setEmail(value);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getProduct = async () => {  
        try {
            const result = await axios.get(`https://listadesejo.azurewebsites.net/api/produtos/${infoCategory.categoriaId}/${email}`);
            if (!result) {
                throw new Error('Nenhum produto encontrado');
            }
            setProducts(result.data);
        } catch (error) {  
            console.error(error.message);
        }
    };

    const postWishlist = async (productId) => {
        try {
            await axios.post(`https://listadesejo.azurewebsites.net/api/listadesejo/${productId}/${email}`);
        } catch (error) {  
            console.error(error.message);
        }
    };

    return (
        <View>
            {products.map((product) => (
                <View style={styles.mainContainer} key={product.produtoId}>
                    <View>
                        <Image source={{ uri: product.urlImagem }} style={styles.image} />
                        <Text>{product.nome}</Text>
                        <View>
                            <Text>Preço: {product.preco}</Text>
                        </View>
                    </View>
                    <Pressable style={{ marginTop: 10 }} onPress={() => postWishlist(product.produtoId)}>
                        <Text>Adicionar a lista de desejos</Text>
                    </Pressable>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: 15,
        margin: 14,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10
    }
});
