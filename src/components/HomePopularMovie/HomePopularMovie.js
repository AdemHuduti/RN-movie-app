import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native';
import PopularMovieStyle from './style';
import APIService from '../../APIService';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

class HomePopularMovie extends Component {
  componentDidMount() {
    this.getPopularHomeMovies()
  }

  getPopularHomeMovies() {
    const { showHomePopularMovies } = this.props;
    if (!showHomePopularMovies.length) {
      APIService.getPopularHomeMovies()
        .then(response => {
          this.loadMovies(response.data)
        })
    }
  }

  loadMovies = (data) => this.props.dispatch({ type: 'GET_MOVIES_FOR_HOME_SCREEN', data });

  renderMovies() {
    const { showHomePopularMovies } = this.props;
    return showHomePopularMovies.map((movie, i) => {
      return (
        <View key={i}>
          <Image
            resizeMode="cover"
            style={styles.imageStyle}
            source={{ uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}` }}
          />
          <View style={styles.viewMovie}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
          </View>
        </View>
      );
    });
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
        colors={['#0f0c29', '#000', '#24243e']}
        style={{ flex: 1}}
      >
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View style={{top: '10%',  marginBottom: 50 }}>
          <Text style={styles.popularMovieTitle}>Popular movies</Text>
          <ScrollView horizontal={true}>
            {this.renderMovies()}
          </ScrollView>
          <TouchableOpacity style={styles.popularMoviesButton} onPress={() => navigate('PopularMovies')}>
            <Text style={styles.popularMoviesButtonText}>View all popular movies</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create(PopularMovieStyle);


const mapStateToProps = (state) => ({
  showHomePopularMovies: state.showHomePopularMovies
});

export default connect(mapStateToProps)(HomePopularMovie)
