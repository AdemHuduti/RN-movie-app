import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import PopularShowsStyle from '../../styles/homeScreenTvShowsStyle';
import APIService from '../../APIService';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

class TvAiringTodayHome extends Component {
  componentDidMount() {
    this.getAiringTodayShows()
  }

  getAiringTodayShows() {
    const { showAiringToday } = this.props;
    if (!showAiringToday.length) {
      APIService.getAiringTodayShows()
        .then(response => {
          this.loadAiringTodayTvShows(response.data)
          console.log(response.data)
        })
    }
  }

  loadAiringTodayTvShows = (data) => this.props.dispatch({ type: 'GET_AIRING_TODAY_SHOWS_FOR_HOME_SCREEN', data });

  showSingleTvShow(id) {
    this.props.navigation.navigate('SingleTvShow', {
      id
    })
  }

  renderShows() {
    const { showAiringToday } = this.props;
    return showAiringToday.map((show, i) => {
      return (
        <View key={i}>
          <TouchableOpacity onPress={() => this.showSingleTvShow(show.id)} >

            <Image
              resizeMode="cover"
              style={styles.imageStyle}
              source={{ uri: `https://image.tmdb.org/t/p/w300${show.poster_path}` }}
            />
            <View style={styles.viewShow}>
              <Text style={styles.showTitle}>{show.name}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { showAiringToday } = this.props;

    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
        colors={['#0f0c29', '#24243e', '#000']}
        style={{ flex: 1 }}
      >
        <StatusBar
          translucent={true} backgroundColor={'transparent'}
          barStyle="light-content"
        />
        <View style={{ top: '10%', marginBottom: 50 }}>
          <Text style={styles.showMainTitle}>Airing today</Text>
          <ScrollView horizontal={true}>
            {
              showAiringToday.length > 1 ? this.renderShows() : <ActivityIndicator size="large" color="#fff" style={{paddingLeft: 170}} />
            }
          </ScrollView>
          <TouchableOpacity onPress={() => navigate('AllAiringTodayShows')}>
            <Text style={styles.viewMoreButton}>View all airing today</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create(PopularShowsStyle);


const mapStateToProps = (state) => ({
  showAiringToday: state.showAiringToday
});

export default connect(mapStateToProps)(TvAiringTodayHome);
