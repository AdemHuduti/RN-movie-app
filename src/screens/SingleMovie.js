import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import APIService from '../APIService';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import singleMovieStyle from './singleMovieStyle';
import Icon from "react-native-vector-icons/AntDesign";
import MainMenu from '../components/MainMenu';
import MainNavbar from '../components/MainNavBar';
import moment from 'moment';

class SingleMovie extends Component {

  constructor(props) {
    super(props);

    this.state = {
      singleMovie: {}
    }
  }

  componentWillMount() {
    const id = this.props.navigation.getParam('id');
    this.getSingleMovie(id)
  };

  getSingleMovie() {
    const id = this.props.navigation.getParam('id');
    APIService.getMoviesById(id)
      .then(res => this.setState({ singleMovie: res.data }))
  }

  toggleMainMenu = () => this.props.dispatch({type: 'TOGGLE_MENU'});
  
  render() {
    const { singleMovie } = this.state;
    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
        colors={['#0f0c29', '#302b63', '#24243e']}
        style={{ flex: 1 }}
      >
        <View style={{ top: '3%' }}>
          {this.props.menuIsOpen &&
            <MainMenu
              onCloseButton={() => this.toggleMainMenu()}
              navigation={this.props.navigation}
            />
          }
          <MainNavbar
            navigation={this.props.navigation}
            navbarColor='white'
            title="Movie info"
          />
          <ScrollView>
            <View style={{ marginBottom: 200 }}>
              <View style={{ top: '10%', }}>
                <Image
                  resizeMode="cover"
                  style={styles.backdropImage}
                  source={{ uri: `https://image.tmdb.org/t/p/w300${singleMovie.backdrop_path}` }}
                />
              </View>

              <View style={styles.movieDetailBox}>
                <Image
                  resizeMode="contain"
                  style={styles.posterImage}
                  source={{ uri: `https://image.tmdb.org/t/p/w300${singleMovie.poster_path}` }}
                />
              </View>

              {
                singleMovie.genres && singleMovie.genres.length ?
                  <View style={styles.parent}>
                    <Text style={styles.genres}>{singleMovie.genres.map((g, i) => i === singleMovie.genres.length - 1 ? g.name : g.name + ", ")}</Text>
                    <Icon
                      style={styles.iconStar}
                      size={20}
                      name="star"
                      color={'rgb(218,165,32)'} />
                    <Text style={styles.voteAverage}>{singleMovie.vote_average}</Text>
                    <Text style={styles.runtimeInfoText}>Runtime: {singleMovie.runtime}min</Text>
                  </View>
                  :
                  <ActivityIndicator size="large" color="#fff" />
              }

              <View style={styles.boxInfo}>
                <Text style={styles.singleMovieTitle}>{singleMovie.title}</Text>
                <Text style={styles.movieOverview}>{singleMovie.overview}</Text>
              </View>

              <View style={styles.info}>
                <Text style={{ color: '#fff' }}>Popularity: {singleMovie.popularity}</Text>
                <Text style={{ color: '#fff' }}>Release date: {moment(singleMovie.release_date).format('DD.MM.YYYY')}</Text>
              </View>


              {
                singleMovie.spoken_languages && singleMovie.spoken_languages.length ?
                  <View>
                    <Text style={styles.spokenLanguagesTitle}>Spoken Languages</Text>
                    <Text style={styles.spokenLanguages}>
                      {singleMovie.spoken_languages.map((language, i) => i === singleMovie.genres.length - 1 ? language.name : language.name + ", ")}
                    </Text>
                  </View>
                  :
                  null
              }
            </View>

          </ScrollView>

        </View>
      </LinearGradient>


    );
  };
};

const styles = StyleSheet.create(singleMovieStyle);

const mapStateToProps = (state) => ({
  menuIsOpen: state.menuIsOpen,
});

export default connect(mapStateToProps)(SingleMovie);
