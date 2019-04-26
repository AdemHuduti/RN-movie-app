import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import APIService from '../../APIService';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import MainMenu from '../../components/MainMenu';
import MainNavbar from '../../components/MainNavBar';

import style from './allPopularMovieStyle';

class Movies extends Component {
  componentDidMount() {
    this.getPopularHomeMovies()
  }

  getPopularHomeMovies() {
    const { showMovies } = this.props;
    if (!showMovies.length) {
      APIService.getPopularMovies()
        .then(response => {
          this.loadMovies(response.data)
        })
    }
  }

  loadMovies = (data) => this.props.dispatch({ type: 'GET_MOVIES', data });
  toggleMainMenu = () => this.props.dispatch({type: 'TOGGLE_MENU'});

  showSingleMovie(id) {
    this.props.navigation.navigate('SingleMovie', {
      id
    })
  }

  renderMovies() {
    const { showMovies } = this.props;
    return showMovies.map((movie, i) => {
      return (

        <View key={i}>
          <Image
            resizeMode="cover"
            style={styles.imageStyle}
            source={{ uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}` }}
          />
          <View style={styles.viewMovie}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <Text style={styles.movieOverview}>{movie.overview.substring(0, 150) + '...'}</Text>
            <View style={styles.detailInfo}>

            </View>
            <TouchableOpacity style={styles.moreButton} onPress={() => this.showSingleMovie(movie.id)}>
              <Text style={styles.moreButtonText}>More</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  };

  render() {
    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
        colors={['#0f0c29', '#302b63', '#24243e']}
        style={{ flex: 1 }}
      >
      
        <View style={{ top: '3%', marginBottom: 100 }}>
        {this.props.menuIsOpen &&
        <MainMenu
          onCloseButton={() => this.toggleMainMenu()}
          navigation={this.props.navigation}
        />
        }
        <MainNavbar
        navigation={this.props.navigation}
        navbarColor='white'
        title="Popular Movies"
      />
          <ScrollView>
            {
              this.renderMovies()
            }
          </ScrollView>

        </View>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create(style)

const mapStateToProps = (state) => ({
  showMovies: state.showMovies,
  menuIsOpen: state.menuIsOpen,
});

export default connect(mapStateToProps)(Movies)