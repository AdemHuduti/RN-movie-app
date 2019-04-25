import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';
import AntIcon from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";
import Style from "./style";
import {connect} from "react-redux";

const styles = StyleSheet.create(Style);

const MainNavbar = props => {
  return (
    <View style={styles.mainNavBar}>
      {!props.disableBackButton &&
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <AntIcon name="arrowleft" size={30} color={props.navbarColor}/>
      </TouchableOpacity>
      }
      {props.title &&
      <Text style={[styles.mainTitle, {color: props.navbarColor}]}>{props.title}</Text>
      }
      <TouchableOpacity
        onPress={() => props.dispatch({type: 'TOGGLE_MENU'})}
        style={props.disableBackButton && {marginLeft: 'auto'}}
      >
        <FeatherIcon name="menu" size={32} color={props.navbarColor}/>
      </TouchableOpacity>
    </View>
  )
};

MainNavbar.propStyles = {
  navigation: PropTypes.object,
  title: PropTypes.string,
  navbarColor: PropTypes.string,
  disableBackButton: PropTypes.bool
};

export default connect()(MainNavbar);
