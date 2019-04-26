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

  showSingleTvShow(id) {
    this.props.navigation.navigate('SingleTvShow', {
      id
    })
  }

  renderShows() {
    const { showTvShows } = this.props;
    return showTvShows.map((show, i) => {
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
          <Text style={styles.showMainTitle}>Popular tv shows</Text>
          <ScrollView horizontal={true}>
            {this.renderShows()}
          </ScrollView>
          <TouchableOpacity onPress={() => navigate('AllPopularTvShows')}>
            <Text style={styles.viewMoreButton}>View all popular tv shows</Text>
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
