import React, { Component } from 'react';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import HomePopularMovie from '../components/HomePopularMovie/HomePopularMovie';
import HomeUpcomingMovies from '../components/UpcomingMovies/UpcomingMovies';
import TopRatedMovieHome from '../components/TopRatedMovies/TopRatedMovieHome';
import OnTvMoviesHome from '../components/OnTvMovies/OnTvMoviesHome';
import AntIcon from "react-native-vector-icons/AntDesign";
import SearchIcon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from 'react-native-gesture-handler';

class App extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
        colors={['#0f0c29', '#302b63', '#24243e']}
        style={{ flex: 1 }}
      >
        <StatusBar
          translucent={true} backgroundColor={'transparent'}
          barStyle="light-content"
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20, marginTop: 70 }}>
          <TouchableOpacity onPress={() => navigate('Choose')}>
            <AntIcon name="arrowleft" size={36} color="#fff"  />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('MovieSearch')}>
            <SearchIcon name="search" size={30} color="#fff"  />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <HomePopularMovie navigation={this.props.navigation} />
          <HomeUpcomingMovies navigation={this.props.navigation} />
          <TopRatedMovieHome navigation={this.props.navigation} />
          <OnTvMoviesHome navigation={this.props.navigation} />
        </ScrollView>

      </LinearGradient>
    );
  }
}


export default connect()(App)
