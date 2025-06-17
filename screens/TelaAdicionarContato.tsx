import { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync("lista-telefonica.sqlite");

export default function TelaAdicionarContato({navigation}) {

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');

    const adicionar = async() => {
    if(nome == "" || telefone ==""){
      Alert.alert("Insira um texto!");
      return;
    }

    await db.runAsync(`INSERT INTO contatos (nome, telefone) VALUES (?, ?)`, [nome, telefone]);

    setNome('');
    setTelefone('');
    navigation.navigate('TelaInicial'); 
  }

    return <SafeAreaView style={styles.container}>

            <View style={styles.main}>
                <Text style={styles.h1}>Adicionar Contato</Text>

                <View style={styles.inputArea}>
                    <Text style={styles.textInput}>Digite o nome</Text>
                    <TextInput
                        placeholder='Nome'
                        style={styles.input}
                        value={nome}
                        onChangeText={text => setNome(text)}
                    />
                </View>

                <View style={styles.inputArea}>
                    <Text style={styles.textInput}>Digite o telefone</Text>
                    <TextInput
                        placeholder='Telefone'
                        style={styles.input}
                        value={telefone}
                        onChangeText={text => setTelefone(text)}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={adicionar}>
                    <Text style={styles.textButton}>Adicionar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        padding: 20,
    },

    main: {
        display: 'flex',
        alignItems: 'center',
    },

    h1: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'orange',
        marginTop: 25
    },

    inputArea: {
        width: '100%'
    },

    input:{
        borderWidth: 1,
        borderRadius: 10,
    },

    textInput: {
        color: 'black',
        marginLeft: 15,
        marginBottom: 5
    },

    button: {
        backgroundColor: 'orange',
        padding: 5,
        width: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginTop: 20
    },

    textButton: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});