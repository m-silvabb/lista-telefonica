import React from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, SafeAreaView  } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import _contato from '../types/contato';
import Contato from '../components/Contato';
import { FAB } from '@rneui/themed';

const db = SQLite.openDatabaseSync("to-do.sqlite");

export default function TelaInicial({ navigation }) {

  const [contatos, setContatos] = useState<_contato[]>([]);

  const [busca, setBusca] = useState('');

  const [visible, setVisible] = React.useState(true);

  useEffect(
    () => {
      db.execSync(`CREATE TABLE IF NOT EXISTS contatos (
              id INTEGER PRIMARY KEY NOT NULL,
              nome VARCHAR(100),
              telefone VARCHAR(100)
        )`);
        recarregar();
    }
  , []);

  useEffect(() => {
    recarregar();
  }, [busca]);
    
  const renderItem = ({ item }: { item: _contato }) => (
    <Contato
      dados={item}
      db={db}
      recarregar={recarregar}
      navigation={navigation}
    />
  );

  const recarregar = async () => {
    const sql = "SELECT * FROM contatos WHERE nome LIKE ? ORDER BY nome ASC";

    const temp: _contato[] = await db.getAllAsync(
    sql, 
      [`%${busca}%`]
    );
      setContatos(temp);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.texto}>Lista Telefonica</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Buscar contato"
        value={busca} 
        onChangeText={setBusca} 
      /> 
      <FlatList
        data={contatos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <FAB
        style={styles.fab}
        visible={visible}
        icon={{ name: 'add', color: 'white' }}
        color="orange"
        onPress={() => navigation.navigate('TelaAdicionarContato')}
      />     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input:{
    borderWidth: 1,
    borderRadius: 10,
  },
  texto:{
    fontSize: 20,
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold',
  },
  container:{
    padding: 10,
    paddingTop: 50,
    flex: 1,
    justifyContent: 'center',
    rowGap: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16, 
    right: 0,
    bottom: 0,
  },
});