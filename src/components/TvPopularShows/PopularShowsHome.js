import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native';
import PopularShowsStyle from './style';
import APIService from '../../APIService';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

class PopularShowsHome extends Component {
  componentDidMount() {
    this.getPopularTvShows()
  }

  getPopularTvShows() {
    const { showTvShows } = this.props;
    if (!showTvShows.length) {
      APIService.getPopularTvShows()
        .then(response => {
          this.loadPopularTVShows(response.data)
          console.log(response.data)
        })
    }
  }

  loadPopularTVShows = (data) => this.props.dispatch({ type: 'GET_POPULAR_TV_SHOWS_FOR_HOME_SCREEN', data });

  renderMovies() {
    const { showTvShows } = this.props;
    return showTvShows.map((movie, i) => {
      return (
        <View key={i}>
          <Image
            resizeMode="cover"
            style={styles.imageStyle}
            source={{ uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}` }}
          />
          <View style={styles.viewMovie}>
            <Text style={styles.movieTitle}>{movie.name}</Text>
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
        colors={['#0f0c29', '#24243e', '#000']}
        style={{ flex: 1 }}
      >
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View style={{top: '10%', marginBottom: 50}}>
          <Text style={styles.onTvMoviesTitle}>Popular tv shows</Text>
          <ScrollView horizontal={true}>
            {this.renderMovies()}
          </ScrollView>
          <TouchableOpacity style={styles.popularMoviesButton} onPress={() => navigate('AllPopularTvShows')}>
            <Text style={{color: '#fff', alignSelf: 'center'}}>View all popular tv shows</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create(PopularShowsStyle);


const mapStateToProps = (state) => ({
  showTvShows: state.showTvShows
});

export default connect(mapStateToProps)(PopularShowsHome)
