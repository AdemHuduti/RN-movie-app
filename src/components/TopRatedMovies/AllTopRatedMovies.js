import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import APIService from '../../APIService';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import MainMenu from '../../components/MainMenu';
import MainNavbar from '../../components/MainNavBar';

import style from '../../styles/globalStyleForAllMovies';

class AllTopRatedMovies extends Component {
  componentDidMount() {
    this.getTopRatedMovies()
  }

  getTopRatedMovies() {
    const { showAllTopRated } = this.props;
    if (!showAllTopRated.length) {
      APIService.getTopRatedMovies()
        .then(response => {
          this.loadTopRatedMovies(response.data)
        })
    }
  }

  loadTopRatedMovies = (data) => this.props.dispatch({ type: 'GET_TOP_RATED_MOVIES', data });
  toggleMainMenu = () => this.props.dispatch({type: 'TOGGLE_MENU'});

  showSingleMovie(id) {
    this.props.navigation.navigate('SingleMovie', {
      id
    })
  }

  renderMovies() {
    const { showAllTopRated } = this.props;
    return showAllTopRated.map((movie, i) => {
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
              <Text style={styles.moreButtonText}>More &raquo;</Text>
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
        title="Top Rated Movies"
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
  showAllTopRated: state.showAllTopRated,
  menuIsOpen: state.menuIsOpen,
});

export default connect(mapStateToProps)(AllTopRatedMovies)