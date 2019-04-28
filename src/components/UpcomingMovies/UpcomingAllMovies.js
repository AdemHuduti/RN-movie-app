import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native';
import UpcomingMovieStyle from '../../styles/globalStyleForAllMovies';
import APIService from '../../APIService';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import MainNavbar from '../MainNavBar';
import MainMenu from '../MainMenu';

class UpcomingAllMovies extends Component {
  componentDidMount() {
    this.getUpcomingAllMovies()
  }

  getUpcomingAllMovies() {
    const { upcomingMovies } = this.props;
    if (!upcomingMovies.length) {
      APIService.getUpcomingMovies()
        .then(response => {
          this.loadUpcomingMovies(response.data)
        })
    }
  }

  loadUpcomingMovies = (data) => this.props.dispatch({ type: 'GET_ALL_UPCOMING_MOVIES', data });
  toggleMainMenu = () => this.props.dispatch({type: 'TOGGLE_MENU'});

  showSingleMovie(id) {
    this.props.navigation.navigate('SingleMovie', {
      id
    })
  }

  renderUpcomingMovies() {
    const { upcomingMovies } = this.props;
    return upcomingMovies.map((movie, i) => {
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
        <StatusBar
          translucent={true} backgroundColor={'transparent'}
          barStyle="light-content"
        />
        <View style={{ top: '3%', marginBottom: 50 }}>
          {this.props.menuIsOpen &&
            <MainMenu
              onCloseButton={() => this.toggleMainMenu()}
              navigation={this.props.navigation}
            />
          }
          <MainNavbar
            navigation={this.props.navigation}
            navbarColor='white'
            title="Upcoming Movies"
          />
          <ScrollView>
            {this.renderUpcomingMovies()}
          </ScrollView>

        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create(UpcomingMovieStyle);


const mapStateToProps = (state) => ({
  upcomingMovies: state.upcomingMovies,
  menuIsOpen: state.menuIsOpen
});

export default connect(mapStateToProps)(UpcomingAllMovies)
