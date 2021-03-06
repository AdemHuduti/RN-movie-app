import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import OnTvMoviesStyle from '../../styles/homeScreenMoviesStyle';
import APIService from '../../APIService';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

class OnTvMoviesHome extends Component {
  componentDidMount() {
    this.getOnTvMovies()
  }

  getOnTvMovies() {
    const { onTvMoives } = this.props;
    if (!onTvMoives.length) {
      APIService.getOnTvMovies()
        .then(response => {
          this.loadOnTvMovies(response.data)
        })
    }
  }

  loadOnTvMovies = (data) => this.props.dispatch({ type: 'GET_ON_TV_MOVIES_FOR_HOME_SCREEN', data });

  showSingleMovie(id) {
    this.props.navigation.navigate('SingleMovie', {
      id
    })
  }

  renderMovies() {
    const { onTvMoives } = this.props;
    return onTvMoives.map((movie, i) => {
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
    const { onTvMoives } = this.props;

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
          <Text style={styles.mainTitle}>On TV movies</Text>
          <ScrollView horizontal={true}>
            {
              onTvMoives.length > 1 ? this.renderMovies() : <ActivityIndicator size="large" color="#fff" style={{paddingLeft: 170}} />
            }
          </ScrollView>
          <TouchableOpacity style={styles.moviesButton} onPress={() => navigate('AllOnTvMovies')}>
            <Text style={styles.moviesButtonText}>View all on tv movies</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create(OnTvMoviesStyle);


const mapStateToProps = (state) => ({
  onTvMoives: state.onTvMoives
});

export default connect(mapStateToProps)(OnTvMoviesHome)
