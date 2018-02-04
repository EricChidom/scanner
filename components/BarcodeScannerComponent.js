import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import call from 'react-native-phone-call';
import PropTypes from 'prop-types';


const _ = require('lodash');

export default class BarcodeScannerComponent extends React.Component {
  constructor(props) {
    super(props);

    this._handleBarCodeRead =
      _.debounce(this._handleBarCodeRead.bind(this), 1500, { leading: true, trailing: false });
    this.state = {
      hasCameraPermission: null,
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  _handleBarCodeRead({ data }) {
    let rechargeCardCode = 'Error';
    switch (this.props.phoneNetworkProvider) {
      case 'MTN':
        rechargeCardCode = '555';
        break;
      case 'Globacom':
        rechargeCardCode = '123';
        break;
      case '9Mobile':
        rechargeCardCode = '222';
        break;
      case 'Airtel':
        rechargeCardCode = '126';
        break;
      default:
        rechargeCardCode = '555';
    }
    const args = {
      number: `*${rechargeCardCode}*${data}#`,
      prompt: false,
    };
    return call(args);
  }

  render() {
    const {
      toggleCameraMode,
      toggleFlashlightMode,
    } = this.props;

    const { hasCameraPermission } = this.props;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
    // <View>
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeRead={this._handleBarCodeRead}
          torchMode={toggleFlashlightMode}
          type={toggleCameraMode}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }
}

BarcodeScannerComponent.propTypes = {
  phoneNetworkProvider: PropTypes.string.isRequired,
  toggleCameraMode: PropTypes.string.isRequired,
  toggleFlashlightMode: PropTypes.string.isRequired,
};

