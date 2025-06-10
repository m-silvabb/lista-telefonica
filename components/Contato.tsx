import { SQLiteDatabase } from "expo-sqlite"
import _contato from "../types/contato"
import { Button, Text, View, TouchableOpacity, StyleSheet } from "react-native"
import {Linking} from 'react-native' 

type _propsContato = {
    dados: _contato,
    db: SQLiteDatabase,
    recarregar: any,
    navigation: any,
}


export default function Tarefa(props: _propsContato) {

    const ligarParaContato = () => {
        const numero = props.dados.telefone;
        Linking.openURL(`tel:${numero}`);
    };

    return <View style={styles.container}>
        <View style={styles.infoContainer}>
                <Text style={styles.textoNome}>{props.dados.nome}</Text>
                <Text style={styles.textoTelefone}>{props.dados.telefone}</Text>
        </View>

        <View style={styles.botoesContainer}>
            <TouchableOpacity style={[styles.botao, styles.botaoEditar]} onPress={props.navigation.navigate('TelaEditarContato', { contatoId: props.dados.id })}>
                <Text style={styles.textoBotao}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.botao, styles.botaoLigar]} onPress={ligarParaContato}>
                <Text style={styles.textoBotao}>Ligar</Text>
            </TouchableOpacity>
        </View>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    infoContainer: {
        marginBottom: 15, 
    },
    textoNome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    textoTelefone: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    botoesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 15,
    },
    botao: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 6,
        alignItems: 'center',
    },
    botaoEditar: {
        backgroundColor: '#3498db', 
    },
    botaoLigar: {
        backgroundColor: '#2ecc71', 
    },
    textoBotao:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    }
});