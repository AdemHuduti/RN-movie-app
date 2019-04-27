import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import PopularShowsStyle from '../../styles/homeScreenTvShowsStyle';
import APIService from '../../APIService';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

class OnTvShowsHome extends Component {
  componentDidMount() {
    this.getOnTvShows()
  }

  getOnTvShows() {
    const { showOnTvShows } = this.props;
    if (!showOnTvShows.length) {
      APIService.getOnTvShows()
        .then(response => {
          this.loadPopularTVShows(response.data)
          console.log(response.data)
        })
    }
  }

  loadPopularTVShows = (data) => this.props.dispatch({ type: 'GET_ON_TV_SHOWS_FOR_HOME_SCREEN', data });

  showSingleTvShow(id) {
    this.props.navigation.navigate('SingleTvShow', {
      id
    })
  }

  renderShows() {
    const { showOnTvShows } = this.props;
    return showOnTvShows.map((show, i) => {
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
    const { showOnTvShows } = this.props;

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
          <Text style={styles.showMainTitle}>On tv shows</Text>
          <ScrollView horizontal={true}>
            {
              showOnTvShows.length > 1 ? this.renderShows() : <ActivityIndicator size="large" color="#fff" style={{paddingLeft: 170}} />
            }
          </ScrollView>
          <TouchableOpacity onPress={() => navigate('AllOnTvShows')}>
            <Text style={styles.viewMoreButton}>View all on tv shows</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create(PopularShowsStyle);


const mapStateToProps = (state) => ({
  showOnTvShows: state.showOnTvShows
});

export default connect(mapStateToProps)(OnTvShowsHome)
