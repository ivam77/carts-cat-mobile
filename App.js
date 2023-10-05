import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const App = () => {
  // Estado para almacenar los datos
  const [catData, setCatData] = useState(null);
  // Lista de razas de gatos
  const catBreeds = ['Abyssinian', 'American Shorthair', 'Asian', 'Russian Blue'];
  // Estado para almacenar la raza de gato actual
  const [currentBreed, setCurrentBreed] = useState('Abyssinian');

  // Función para obtener datos
  const fetchRandomCat = async () => {
    try {
      const apiKey = '2Tx+VxAGrxoS3MPYzMKc4g==7Lu3XUby1iJ0yHP0';
      const url = `https://api.api-ninjas.com/v1/cats?name=${currentBreed}`;

      // Realizar una solicitud GET a la API
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error al obtener los datos del gato');
      }

      const data = await response.json();

      // Establecer los datos del primer gato obtenido en el estado
      setCatData(data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  // Cambia la raza de gato actual
  useEffect(() => {
    fetchRandomCat();
  }, [currentBreed]);

  const handleButtonClick = () => {
    // Generar un índice aleatorio de la lista
    const randomIndex = Math.floor(Math.random() * catBreeds.length);
    // Obtener la raza de gato
    const randomBreed = catBreeds[randomIndex];
    // Raza aleatoria
    setCurrentBreed(randomBreed);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.catImage}>
          <Image source={{ uri: catData?.image_link }} style={styles.roundedImage} />
        </View>
        {catData && (
          <>
            <View style={styles.catInfo}>
              <Text>{catData.name}</Text>
              <Text>Length: {catData.length}</Text>
              <Text>Origin: {catData.origin}</Text>
            </View>
          </>
        )}
        <Button title="Refresh" onPress={handleButtonClick} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#3332",

  },
  content: {
    alignItems: 'center',
    padding: "1rem",
  },
  catImage: {
    marginBottom: 10,
  },
  roundedImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  catInfo: {
    alignItems: 'center',
  },
});

export default App;
