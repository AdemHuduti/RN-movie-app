import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import APIService from '../../APIService';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

import UpcomingMovieStyle from '../../styles/homeScreenMoviesStyle';

class HomeUpcomingPopularMovie extends Component {
  componentDidMount() {
    this.getUpcomingHomeMovies()
  }

  getUpcomingHomeMovies() {
    const { showHomeUpcomingMovies } = this.props;
    if (!showHomeUpcomingMovies.length) {
      APIService.getUpcomingMovies()
        .then(response => {
          this.loadUpcomingMovies(response.data)
        })
    }
  }

  loadUpcomingMovies = (data) => this.props.dispatch({ type: 'GET_UPCOMING_MOVIES_FOR_HOME_SCREEN', data });

  showSingleMovie(id) {
    this.props.navigation.navigate('SingleMovie', {
      id
    })
  }

  renderMovies() {
    const { showHomeUpcomingMovies } = this.props;
    return showHomeUpcomingMovies.map((movie, i) => {
      return (
        <View key={i}>
          <TouchableOpacity onPress={() => this.showSingleMovie(movie.id)} >

            <Image
              resizeMode="cover"
              style={styles.imageStyle}
              source={{ uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}` }}
            />
            <View style={styles.viewMovie}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { showHomeUpcomingMovies } = this.props;
    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
        colors={['#0f0c29', '#000', '#24243e']}
        style={{ flex: 1 }}
      >
        <StatusBar
          translucent={true} backgroundColor={'transparent'}
          barStyle="light-content"
        />
        <View style={{ top: '10%', marginBottom: 50 }}>
          <Text style={styles.mainTitle}>Upcoming movies</Text>
          <ScrollView horizontal={true}>
            {
              showHomeUpcomingMovies.length > 1 ? this.renderMovies() : <ActivityIndicator size="large" color="#fff" style={{paddingLeft: 170}} />
            }
          </ScrollView>
          <TouchableOpacity style={styles.moviesButton} onPress={() => navigate('UpcomingAllMovies')}>
            <Text style={styles.moviesButtonText}>View all upcoming movies</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create(UpcomingMovieStyle);


const mapStateToProps = (state) => ({
  showHomeUpcomingMovies: state.showHomeUpcomingMovies
});

export default connect(mapStateToProps)(HomeUpcomingPopularMovie)
