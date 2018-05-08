import React from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button
            vertical
            onPress={() => this.props.navigation.navigate('home')}
          >
            <Icon name="notifications" />
            <Text style={styles.tabText}>Thông Báo</Text>
          </Button>
          <Button
            vertical
            onPress={() => this.props.navigation.navigate('home1')}
          >
            <Icon name="clipboard" />
            <Text style={styles.tabText}>Các Quy Trình</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const styles = StyleSheet.create({
  tabText: {
    fontSize: width * 14 * 0.00265
  }
});
