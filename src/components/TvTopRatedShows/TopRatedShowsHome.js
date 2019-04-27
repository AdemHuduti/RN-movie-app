import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import PopularShowsStyle from '../../styles/homeScreenTvShowsStyle';
import APIService from '../../APIService';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

class TopRatedShowsHome extends Component {
  componentDidMount() {
    this.getTopRatedTvShows()
  }

  getTopRatedTvShows() {
    const { showTopRated } = this.props;
    if (!showTopRated.length) {
      APIService.getTopRatedTvShows()
        .then(response => {
          this.loadTopRatedShows(response.data)
          console.log(response.data)
        })
    }
  }

  loadTopRatedShows = (data) => this.props.dispatch({ type: 'GET_TOP_RATED_TV_SHOWS_FOR_HOME_SCREEN', data });

  showSingleTvShow(id) {
    this.props.navigation.navigate('SingleTvShow', {
      id
    })
  }

  renderShows() {
    const { showTopRated } = this.props;
    return showTopRated.map((show, i) => {
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
    const { showTopRated } = this.props;

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
          <Text style={styles.showMainTitle}>Top rated tv shows</Text>
          <ScrollView horizontal={true}>
            {
              showTopRated.length > 1 ? this.renderShows() : <ActivityIndicator size="large" color="#fff" style={{paddingLeft: 170}} />
            }
          </ScrollView>
          <TouchableOpacity onPress={() => navigate('AllTopRatedShows')}>
            <Text style={styles.viewMoreButton}>View all popular tv shows</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create(PopularShowsStyle);


const mapStateToProps = (state) => ({
  showTopRated: state.showTopRated
});

export default connect(mapStateToProps)(TopRatedShowsHome)
