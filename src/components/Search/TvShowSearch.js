import React, { Component } from 'react';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import MainNavbar from '../../components/MainNavBar';
import MainMenu from '../../components/MainMenu';
import style from './style';
import { ScrollView } from 'react-native-gesture-handler';

class TvShowSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTvShow: '',
      searchedTvShows: []
    };
  }

  getSearchedTvShows() {
    const { searchTvShow } = this.state
    
    const API_KEY = "b6ae17c5481c2abdc5c03bc07d7186e7";
    const SEARCH_MOVIE = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=${searchTvShow}&include_adult=false`;

    axios.get(SEARCH_MOVIE).then(res => {
      this.setState({ searchedTvShows: res.data.results.slice(0, 6) })
    });

    this.setState({ searchTvShow: '' })
  }

  showSingleTvShow(id) {
    this.props.navigation.navigate('SingleTvShow', {
      id
    })
  }

  toggleMainMenu = () => this.props.dispatch({ type: 'TOGGLE_MENU' });

  render() {
    const { searchedTvShows } = this.state

    const showSearchedTvShows = searchedTvShows.map((show, i) => {
      return (
        <View key={i}>
          <Image
            resizeMode="cover"
            style={styles.imageStyle}
            source={{ uri: `https://image.tmdb.org/t/p/w300${show.poster_path}` }}
          />
          <View style={styles.viewMovie}>
            <Text style={styles.movieTitle}>{show.name}</Text>
            <Text style={styles.movieOverview}>{show.overview.substring(0, 150) + '...'}</Text>
            <View style={styles.detailInfo}>

            </View>
            <TouchableOpacity style={styles.moreButton} onPress={() => this.showSingleTvShow(show.id)}>
              <Text style={styles.moreButtonText}>More &raquo;</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    })

    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
        colors={['#0f0c29', '#302b63', '#24243e']}
        style={{ flex: 1 }}
      >

        {this.props.menuIsOpen &&
          <MainMenu
            onCloseButton={() => this.toggleMainMenu()}
            navigation={this.props.navigation}
          />
        }

        <MainNavbar
          navigation={this.props.navigation}
          navbarColor='white'
          title="Search your favorite show"
        />
        <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={searchTvShow => this.setState({ searchTvShow })}
            value={this.state.searchTvShow}
            placeholder="Search..."
            placeholderTextColor={'#fff'}
          />
          <TouchableOpacity style={styles.sentButton} disabled={this.state.searchTvShow.length < 1} onPress={() => this.getSearchedTvShows()}>
            <Text style={styles.sentButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <View style={{ top: '10%', marginBottom: 220 }}>
          <ScrollView>
            {showSearchedTvShows}
          </ScrollView>
        </View>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create(style)

const mapStateToProps = (state) => ({
  menuIsOpen: state.menuIsOpen,
});

export default connect(mapStateToProps)(TvShowSearch)