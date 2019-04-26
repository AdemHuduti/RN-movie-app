import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native';
import AllTvMoviesStyle from '../../styles/globalStyleForAllMovies';
import APIService from '../../APIService';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import MainNavbar from '../MainNavBar';
import MainMenu from '../MainMenu';

class OnTvAllMovies extends Component {
  componentDidMount() {
    this.getOnTvMovies()
  }

  getOnTvMovies() {
    const { allOnTvMovies } = this.props;
    if (!allOnTvMovies.length) {
      APIService.getOnTvMovies()
        .then(response => {
          this.loadAllOnTvMovies(response.data)
        })
    }
  }

  loadAllOnTvMovies = (data) => this.props.dispatch({ type: 'ON_TV_MOVIES', data });
  toggleMainMenu = () => this.props.dispatch({type: 'TOGGLE_MENU'});

  showSingleMovie(id) {
    this.props.navigation.navigate('SingleMovie', {
      id
    })
  }

  renderOnTvMovies() {
    const { allOnTvMovies } = this.props;
    return allOnTvMovies.map((movie, i) => {
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
            title="On tv movies"
          />
          <ScrollView>
            {this.renderOnTvMovies()}
          </ScrollView>

        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create(AllTvMoviesStyle);


const mapStateToProps = (state) => ({
  allOnTvMovies: state.allOnTvMovies,
  menuIsOpen: state.menuIsOpen
});

export default connect(mapStateToProps)(OnTvAllMovies)
