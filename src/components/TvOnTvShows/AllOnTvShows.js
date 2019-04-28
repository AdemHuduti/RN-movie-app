import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native';
import PopularTvShowStyle from '../../styles/globalStyleForAllTvShows';
import APIService from '../../APIService';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import MainNavbar from '../MainNavBar';
import MainMenu from '../MainMenu';

class AllOnTvShows extends Component {
  componentDidMount() {
    this.getOnTvShows()
  }

  getOnTvShows() {
    const { showAllOnTvShows } = this.props;
    if (!showAllOnTvShows.length) {
      APIService.getOnTvShows()
        .then(response => {
          this.loadAllOnTvShows(response.data)
        })
    }
  }

  loadAllOnTvShows = (data) => this.props.dispatch({ type: 'GET_ALL_ON_TV_SHOWS', data });
  toggleMainMenu = () => this.props.dispatch({type: 'TOGGLE_MENU'});

  showSingleTvShow(id) {
    this.props.navigation.navigate('SingleTvShow', {
      id
    })
  }

  renderPopularTvShows() {
    const { showAllOnTvShows } = this.props;
    return showAllOnTvShows.map((show, i) => {
      return (
        <View key={i}>
          <Image
            resizeMode="cover"
            style={styles.imageStyle}
            source={{ uri: `https://image.tmdb.org/t/p/w300${show.poster_path}` }}
          />
          <View style={styles.viewTvShowBox}>
            <Text style={styles.tvShowTitle}>{show.name}</Text>
            <Text style={styles.tvShowOverview}>{show.overview.substring(0, 150) + '...'}</Text>
            <View style={styles.detailInfo}>

            </View>
            <TouchableOpacity style={styles.moreButton} onPress={() => this.showSingleTvShow(show.id)}>
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
            title="Popular tv shows"
          />
          <ScrollView>
            {this.renderPopularTvShows()}
          </ScrollView>

        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create(PopularTvShowStyle);


const mapStateToProps = (state) => ({
  showAllOnTvShows: state.showAllOnTvShows,
  menuIsOpen: state.menuIsOpen
});

export default connect(mapStateToProps)(AllOnTvShows)
