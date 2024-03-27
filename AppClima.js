import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { FontAwesome5, Feather, Entypo} from '@expo/vector-icons';

const conditionImages =  {
    'storm': require('../appClima/assets/storm.png'),
    'snow': require('../appClima/assets/snow.png'),
    'rain': require('../appClima/assets/rain.png'),
    'none_night': require('../appClima/assets/none_night.png'),
    'none_day': require('../appClima/assets/none_day.png'),
    'hail': require('../appClima/assets/hail.png'),
    'fog': require('../appClima/assets/fog.png'),
    'cloudly_night': require('../appClima/assets/cloudly_night.png'),
    'cloudly_day': require('../appClima/assets/cloudly_day.png'),
    'cloud': require('../appClima/assets/cloud.png'),
  }

  const cities = ['Recife', 'Fortaleza', 'São Paulo', 'Salvador'];
const AppClima = () => {
  const [dadosClima, setdadosClima] = useState(null);
  const [city, setCity] = useState('Recife');

  const buscarDadosClimaticos = () => {
    axios.get(`https://api.hgbrasil.com/weather`, {
        params: 
        {
            key: 'SUA-CHAVE',
            city_name: city
        }
    })
      .then(response => {
        setdadosClima(response.data.results);
      })
      .catch(error => {
        console.error('Erro ao buscar dados climáticos:', error);
      });
  };

  useEffect(() => {
    buscarDadosClimaticos();
  }, [city]);

  if (!dadosClima) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cityPicker}>
        {cities.map((cityOption) => (
          <TouchableOpacity
            key={cityOption}
            onPress={() =>{
              setCity(cityOption);
            }}
            style={[
              styles.cityButton,
              { backgroundColor: city === cityOption ? '#2CA4ED' : '#0582CA' },
            ]}
          >
            <Text style={{color: "#F5F5F5"}}>{cityOption}</Text>
          </TouchableOpacity>
        ))}
      </View>
    <View><Image source={conditionImages[dadosClima.condition_slug]} 
      style={{ width: 75, height: 75 }}></Image></View>
      <Text style={styles.city}>{dadosClima.city}</Text>
      <Text style={styles.temperature}>{dadosClima.temp}°C</Text>
      <Text style={styles.description}>{dadosClima.description}</Text>
      <Text style={styles.minMaxTemp}>
        Max: {dadosClima.forecast[0].max}°C | Min: {dadosClima.forecast[0].min}°C
      </Text>
      <View style={styles.additionalInfo}>
        <Text style={{color: 'white'}}><FontAwesome5 name="cloud-rain" size={24} color="#F5F5F5" />   {dadosClima.rain}%</Text>
        <Text>      </Text>
        <Text style={{color: 'white'}}><Entypo name="water" size={24} color="#F5F5F5" />  {dadosClima.humidity}%</Text>
        <Text>      </Text>
        <Text style={{color: 'white'}}><Feather name="wind" size={24} color="#F5F5F5" />  {dadosClima.wind_speedy}</Text>
      </View>
      <Text></Text>

      <View style={styles.infoSun}>
      <Text style={{color: 'white', fontSize:15}}><Feather name="sunrise" size={15} color="#F5F5F5" />   {dadosClima.sunrise}</Text>
      <Text style={{color: 'white', fontSize:15}}><Feather name="sunset" size={15} color="#F5F5F5" />   {dadosClima.sunset}</Text>
      </View>
      <Text></Text>
      
      <Text style={{color: 'white', fontSize:20}}> Próxima semana</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {dadosClima.forecast.slice(1, 8).map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.weekday}>{day.weekday}</Text>
            <Image
              source={conditionImages[day.condition]}
              style={{ width: 40, height: 40 }}
            />
            <Text style={styles.maxMinTemp}>
              {day.max}°C / {day.min}°C
            </Text>
          </View>
        ))}
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  city: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#F5F5F5",
  },
  temperature: {
    fontSize: 36,
    color: "#F5F5F5",
  },
  description: {
    fontSize: 18,
    color: "#F5F5F5",
  },
  minMaxTemp: {
    fontSize: 16,
    color: '#F5F5F5', 
  },
  additionalInfo: {
    marginTop: 20,
    padding: 17,
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#0582CA',
    opacity: 0.85
  },

  infoSun: {
    display: "flex",
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 50,
    backgroundColor: '#0582CA',
    opacity: 0.85
  },
  scrollContainer: {
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#0582CA',
    opacity: 0.85
  },
  dayContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  weekday: {
    fontSize: 14,
    color: '#F5F5F5', 
  },
  maxMinTemp: {
    fontSize: 12,
    color: '#F5F5F5', 
  },
  cityPicker: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  cityButton: {
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
});

export default AppClima;