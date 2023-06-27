import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState('');
  const [singer, setSinger] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleAddSong = () => {
    if (title && singer) {
      if (editIndex !== -1) {
        // Update existing song
        const updatedSongs = [...songs];
        updatedSongs[editIndex] = { title, singer };
        setSongs(updatedSongs);
        setTitle('');
        setSinger('');
        setEditIndex(-1);
      } else {
        // Add new song
        const newSong = { title, singer };
        setSongs([...songs, newSong]);
        setTitle('');
        setSinger('');
      }
    }
  };

  const handleEditSong = (index) => {
    const songToEdit = songs[index];
    setTitle(songToEdit.title);
    setSinger(songToEdit.singer);
    setEditIndex(index);
  };

  const handleDeleteSong = (index) => {
    const updatedSongs = [...songs];
    updatedSongs.splice(index, 1);
    setSongs(updatedSongs);
  };

  const handleSearch = () => {
    const results = songs.filter(
      (song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.singer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Músicas</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Cantor(a)"
          value={singer}
          onChangeText={setSinger}
        />
        <Button title={editIndex !== -1 ? 'Atualizar Música' : 'Adicionar Música'} onPress={handleAddSong} />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Procure se a música está na sua lista..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Procurar" onPress={handleSearch} />
      </View>
      <FlatList
        style={styles.songList}
        data={searchQuery ? searchResults : songs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.songItem}>
            <View>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.songSinger}>{item.singer}</Text>
            </View>
            <View style={styles.songButtons}>
              <Button title="Atualizar" onPress={() => handleEditSong(index)} />
              <Button title="Excluir" onPress={() => handleDeleteSong(index)} color="#C11838" />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 50,
    },
    formContainer: {
    marginBottom:10,
    width: '100%',
    },
    input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    },
    searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
    borderColor: '#ccc',
    marginTop: 20,
    },
    searchInput: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    },
    songList: {
    width: '100%',
    },
    songItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    },
    songTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    },
    songSinger: {
    fontSize: 16,
    fontStyle: 'italic',
    },
    songButtons: {
    flexDirection: 'row',
    },

  });