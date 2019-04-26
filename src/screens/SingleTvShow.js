import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import APIService from '../APIService';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import singleTvShowStyle from './singleTvShowStyle';
import Icon from "react-native-vector-icons/AntDesign";
import MainMenu from '../components/MainMenu';
import MainNavbar from '../components/MainNavBar';
import moment from 'moment';

class SingleTvShow extends Component {

  constructor(props) {
    super(props);

    this.state = {
      singleTvShow: {}
    }
  }

  componentWillMount() {
    const id = this.props.navigation.getParam('id');
    this.getShowsById(id)
  };

  getShowsById() {
    const id = this.props.navigation.getParam('id');
    APIService.getShowsById(id)
      .then(res => this.setState({ singleTvShow: res.data }))
  }

  toggleMainMenu = () => this.props.dispatch({ type: 'TOGGLE_MENU' });

  render() {
    const { singleTvShow } = this.state;
    console.log(singleTvShow)
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
            title="Tv show info"
          />
          <ScrollView>
            <View style={{ marginBottom: 200 }}>
                <Image
                  resizeMode="cover"
                  style={styles.backdropImage}
                  source={{ uri: `https://image.tmdb.org/t/p/w300${singleTvShow.backdrop_path}` }}
                />

              <View style={styles.mainDetailBox}>
                <Image
                  resizeMode="contain"
                  style={styles.posterImage}
                  source={{ uri: `https://image.tmdb.org/t/p/w300${singleTvShow.poster_path}` }}
                />
              </View>

              {
                singleTvShow.genres && singleTvShow.genres.length ?
                  <View style={styles.parent}>
                    <Text style={styles.genres}>{singleTvShow.genres.map((g, i) => i === singleTvShow.genres.length - 1 ? g.name : g.name + ", ")}</Text>
                    <Icon
                      style={styles.iconStar}
                      size={20}
                      name="star"
                      color={'rgb(218,165,32)'} />
                    <Text style={styles.voteAverage}>{singleTvShow.vote_average}</Text>
                    <Text style={styles.runtimeInfoText}>Runtime: {singleTvShow.episode_run_time}min</Text>
                  </View>
                  :
                  <ActivityIndicator size="large" color="#fff" />
              }

              <View style={styles.boxInfo}>
                <Text style={{
                  fontSize: 24,
                  color: "#fff",
                  marginTop: 34,
                  marginBottom: 24
                }}>{singleTvShow.name}</Text>
                <Text style={styles.mainOverview}>{singleTvShow.overview}</Text>
              </View>

              <View style={styles.info}>
                <Text style={{ color: '#fff' }}>Popularity: {singleTvShow.popularity}</Text>
                <Text style={{ color: '#fff' }}>Release date: {moment(singleTvShow.first_air_date).format('DD.MM.YYYY')}</Text>
              </View>

              {
                singleTvShow.languages && singleTvShow.languages.length ?
                  <View>
                    <Text style={styles.spokenLanguagesTitle}>Spoken Languages</Text>
                    <Text style={styles.spokenLanguages}>
                      {singleTvShow.languages.map((language, i) => i === singleTvShow.languages.length - 1 ? language : language + ", ")}
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

const styles = StyleSheet.create(singleTvShowStyle);

const mapStateToProps = (state) => ({
  menuIsOpen: state.menuIsOpen,
});

export default connect(mapStateToProps)(SingleTvShow);
