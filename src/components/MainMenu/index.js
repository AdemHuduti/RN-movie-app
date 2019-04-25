import React from "react";
import {Animated, StyleSheet,  TouchableOpacity, Text, ScrollView} from 'react-native';
import Style from './style'
import AntIcon from 'react-native-vector-icons/AntDesign';;
import menuItems from './MenuItem';

const styles = StyleSheet.create(Style);

class MainMenu extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),
    slideAnim: new Animated.Value(-500)
  };

  componentDidMount() {
    this.animateIn()
  }

  animationToggle = (stateName, value) => {
    Animated.timing(
      this.state[stateName],
      {
        toValue: value,
        duration: 200,
        useNativeDriver: true
      }
    ).start();
  };

  animateIn() {
    this.animationToggle('fadeAnim', 1);
    this.animationToggle('slideAnim', 0);
  }

  animateOut() {
    this.animationToggle('fadeAnim', 0);
    this.animationToggle('slideAnim', -500);
  }

  closeMenu() {
    this.animateOut();
    setTimeout(() => {
      this.props.onCloseButton();
    }, 200)
  }

  navigateToItem(item) {
    this.props.onCloseButton();
    this.props.navigation.navigate(item);
  }

  navigateAndCloseMenu = (item) => {
    item === 'First'
      ? ''
      : this.navigateToItem(item)
  };

  render() {
    return (
      <Animated.View style={[styles.mainMenuContainer, {opacity: this.state.fadeAnim}]}>
        <Animated.View style={[styles.mainMenu, {transform: [{translateX: this.state.slideAnim}]}]}>
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => this.closeMenu()}
          >
            <AntIcon name="close" size={32} color={'#000'}/>
          </TouchableOpacity>

          <ScrollView>
            {menuItems.map((item, i) =>
              <TouchableOpacity
                style={[styles.menuItem, item.disabled && styles.disabledMenuItem]}
                onPress={() => this.navigateAndCloseMenu(item.navigateTo)}
                key={i}>
                <Text style={[styles.menuItemText, item.disabled && styles.disabledMenuItemText]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </Animated.View>
      </Animated.View>
    )
  };
}


export default MainMenu;
