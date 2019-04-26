import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native';
import TopRatedMovieStyle from './style';
import APIService from '../../APIService';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

class TopRatedMovieHome extends Component {
  componentDidMount() {
    this.getTopRatedMovies()
  }

  getTopRatedMovies() {
    const { showTopRatedMovies } = this.props;
    if (!showTopRatedMovies.length) {
      APIService.getTopRatedMovies()
        .then(response => {
          this.loadTopRatedMovies(response.data)
        })
    }
  }

  loadTopRatedMovies = (data) => this.props.dispatch({ type: 'GET_TOP_RATED_MOVIES_FOR_HOME_SCREEN', data });

  renderMovies() {
    const { showTopRatedMovies } = this.props;
    return showTopRatedMovies.map((movie, i) => {
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
          translucent={true} backgroundColor={'transparent'}
          barStyle="light-content"
        />
        <View style={{top: '10%',  marginBottom: 50 }}>
          <Text style={styles.topRatedMovieTitle}>Top rated movies</Text>
          <ScrollView horizontal={true}>
            {this.renderMovies()}
          </ScrollView>
          <TouchableOpacity style={styles.topRatedMoviesButton} onPress={() => navigate('AllTopRatedMovies')}>
            <Text style={styles.topRatedMoviesButtonText}>View all top rated movies</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create(TopRatedMovieStyle);


const mapStateToProps = (state) => ({
  showTopRatedMovies: state.showTopRatedMovies
});

export default connect(mapStateToProps)(TopRatedMovieHome)
