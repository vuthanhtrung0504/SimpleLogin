import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ActivityIndicator,
  Platform,
  Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  textContent: {
    top: 80,
    height: 50,
    fontSize: 20,
    fontWeight: 'bold'
  }
});

const ANIMATION = ['none', 'slide', 'fade'];
const SIZES = ['small', 'normal', 'large'];

export default class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      textContent: this.props.textContent
    };
  }

  static propTypes = {
    visible: PropTypes.bool,
    cancelable: PropTypes.bool,
    textContent: PropTypes.string,
    animation: PropTypes.oneOf(ANIMATION),
    color: PropTypes.string,
    size: PropTypes.oneOf(SIZES),
    overlayColor: PropTypes.string
  };

  static defaultProps = {
    visible: false,
    cancelable: false,
    textContent: '',
    animation: 'fade',
    color: Platform.OS === 'ios' ? '#007aff' : '#3F51B5',
    size: 'large', // 'normal',
    overlayColor: 'rgba(0, 0, 0, 0)',
    isModal: false
  };

  close() {
    this.setState({ visible: false });
  }

  componentWillReceiveProps(nextProps) {
    const { visible, textContent } = nextProps;
    this.setState({ visible, textContent });
  }

  _handleOnRequestClose() {
    if (this.props.cancelable) {
      this.close();
    }
  }

  _renderDefaultContent() {
    return (
      <View style={styles.background}>
        <ActivityIndicator
          color={this.props.color}
          size={this.props.size}
          style={{ flex: 1 }}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.textContent, this.props.textStyle]}>
            {this.state.textContent}
          </Text>
        </View>
      </View>
    );
  }
  _renderModalSpiner(spinner) {
    return (
      <Modal
        animationType={this.props.animation}
        onRequestClose={() => this._handleOnRequestClose()}
        supportedOrientations={['landscape', 'portrait']}
        transparent={true}
        visible={this.state.visible}
      >
        {spinner}
      </Modal>
    );
  }
  _renderViewSpiner(spinner) {
    if (this.state.visible) {
      return (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            height: height,
            width: width
          }}
        >
          {spinner}
        </View>
      );
    } else {
      return null;
    }
  }
  _renderSpinner() {
    const { visible } = this.state;

    if (!visible) return null;

    const spinner = (
      <View
        style={[styles.container, { backgroundColor: this.props.overlayColor }]}
        key={`spinner_${Date.now()}`}
      >
        {this.props.children
          ? this.props.children
          : this._renderDefaultContent()}
      </View>
    );
    if (this.props.isModal) {
      return this._renderModalSpiner(spinner);
    } else {
      return this._renderViewSpiner(spinner);
    }
  }

  render() {
    return this._renderSpinner();
  }
}
