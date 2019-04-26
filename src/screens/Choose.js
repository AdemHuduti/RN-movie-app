import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import style from './style';
import LinearGradient from 'react-native-linear-gradient';

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

        <View style={{top: '100%', flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity style={styles.seeMoreButton} onPress={() => navigate('MovieHome')}>
            <Text style={styles.seeMoreButtonTexy}>See Movies</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.seeMoreButton} onPress={() => navigate('TvShowHome')}>
            <Text>See TV Shows</Text>
          </TouchableOpacity>

        </View>

      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create(style)

export default Choose;
