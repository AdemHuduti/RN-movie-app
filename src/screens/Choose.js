import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import style from './style';

class Choose extends Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 0.5, y: 1.0 }}
        colors={['#0f0c29', '#302b63', '#24243e']}
        style={{ flex: 1 }}
      >
        <StatusBar
          barStyle="light-content"
          translucent={true} backgroundColor={'transparent'}
        />
        <Text style={{color:'white', top: '35%', textAlign: 'center', fontSize: 24}}>Pick something</Text>
        <View style={{top: '100%', flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity onPress={() => navigate('MovieHome')}>
            <AntIcon name="movie" size={44} color="#fff" />
            <Text style={{color: '#fff', paddingTop: 10}}>Movies</Text>
          </TouchableOpacity>
          
          <TouchableOpacity  onPress={() => navigate('TvShowHome')}>
          <EntypoIcon name="tv" size={44} color="#fff" />
            <Text style={{color: '#fff', right: 10, paddingTop: 10}}>TV Shows</Text>
          </TouchableOpacity>
        </View>
          
        
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create(style)

export default Choose;
