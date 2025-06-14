import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync("to-do.sqlite");

export default function TelaEditarContato({route, navigation}) {

    const { contato } = route.params;

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');

    useEffect(() => {
        if (contato?.id) {
            setNome(contato.nome);
            setTelefone(contato.telefone);
        }
    }, [contato.id]);

    const editar = async () => {
        if (nome === "" || telefone === "") {
            Alert.alert("Erro", "Nome e telefone não podem estar vazios.");
            return;
        }

        await db.runAsync(
            `UPDATE contatos SET nome = ?, telefone = ? WHERE id = ?`,
            [nome, telefone, contato.id] 
        );
        
        navigation.navigate('TelaInicial');
    }
    const excluir = async() => {
        await db.runAsync(`DELETE FROM  contatos  WHERE id = (?)`, [contato.id]);
        navigation.navigate('TelaInicial');
  }

    return <SafeAreaView style={styles.container}>

            <View style={styles.main}>
                <Text style={styles.h1}>Editar Contato</Text>

                <View style={styles.inputArea}>
                    <Text style={styles.textInput}>Digite o nome</Text>
                    <TextInput
                        placeholder={contato.nome}
                        style={styles.input}
                        value={nome}
                        onChangeText={text => setNome(text)}
                    />
                </View>

                <View style={styles.inputArea}>
                    <Text style={styles.textInput}>Digite o telefone</Text>
                    <TextInput
                        placeholder={contato.telefone}
                        style={styles.input}
                        value={telefone}
                        onChangeText={text => setTelefone(text)}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={editar}>
                    <Text style={styles.textButton}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={excluir}>
                    <Text style={styles.textButton}>Excluir</Text>
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