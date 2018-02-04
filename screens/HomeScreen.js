import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Picker,
} from 'react-native';
import { WebBrowser } from 'expo';
import ToggleSwitch from 'toggle-switch-react-native';

import { MonoText } from '../components/StyledText';
import BarcodeScannerComponent from '../components/BarcodeScannerComponent';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleCameraMode: 'back',
      toggleFlashlightMode: 'off',
      toggleCamera: false,
      toggleFlashlight: false,
      phoneNetworkProvider: 'MTN',
    }

    this._toggleFlashlightHelper = this._toggleFlashlightHelper.bind(this);
    this._toggleFlashlightHelper = this._toggleFlashlightHelper.bind(this);
  }
  static navigationOptions = {
    header: null,
  };

  render() {
    const {
      toggleFlashlight,
      toggleCamera,
      toggleCameraMode,
      toggleFlashlightMode,
      phoneNetworkProvider
    } = this.state;
    return (
      <View style={styles.container}>
        <BarcodeScannerComponent 
          toggleCameraMode={toggleCameraMode}
          toggleFlashlightMode={toggleFlashlightMode}
          phoneNetworkProvider={phoneNetworkProvider}
        />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.getStartedContainer}>
            {this.renderText()}

              <View style={styles.toggleButtonContainers}>
                <View>
                {!toggleFlashlight && <ToggleSwitch
                  onColor='green'
                  offColor='#9EB1CF'
                  label='Toggle Camera'
                  labelStyle={{color: 'black', fontWeight: '900'}}
                  size='medium'
                  onToggle={ () => this._toggleCameraHelper(toggleCamera) }
              />}
              </View>
              <View>
              {!toggleCamera && <ToggleSwitch
                  onColor='green'
                  offColor='#9EB1CF'
                  label='Toggle Flashlight'
                  labelStyle={{color: 'black', fontWeight: '900'}}
                  size='medium'
                  onToggle={ () => this._toggleFlashlightHelper(toggleFlashlight) }
              />}
              </View>
            </View>

            <View style={styles.pickerContainers}>
              <View style={styles.pickerInnerContainer}>
                <Text style={styles.pickerText}>
                  Please Select your network Provider
                </Text>
                </View>
                <View style={styles.pickerContainers}>
                  <Picker
                    style={{width: 130}}
                    selectedValue={phoneNetworkProvider}
                    onValueChange={(itemValue, itemIndex) => this.setState({phoneNetworkProvider: itemValue})}>
                    <Picker.Item label="Globacom" value="Globacom" />
                    <Picker.Item label="9Mobile" value="9Mobile" />
                    <Picker.Item label="MTN" value="MTN" />
                    <Picker.Item label="Airtel" value="Airtel" />
                  </Picker>
                </View>
              </View>

          </View>
        </ScrollView>

      </View>
    );
  }

  renderText() {
    const learnMoreButton = (
      <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.messageText}>
        Place the camera on a BarCode to scan it. {learnMoreButton}
      </Text>
    );
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://www.techadvisor.co.uk/how-to/google-android/how-scan-codes-with-your-smartphone-3513431/');
  };

  _toggleCameraHelper(currentCameraMode) {
    if (currentCameraMode === false) {
      this.setState({
        toggleCameraMode: 'front',
        toggleCamera: true
      })
    } else {
      this.setState({
        toggleCameraMode: 'back',
        toggleCamera: false
      })
    }
  };

  _toggleFlashlightHelper(currentflashlightMode) {
    if (currentflashlightMode === false) {
      this.setState({
        toggleFlashlightMode: 'on',
        toggleFlashlight: true
      })
    } else {
      this.setState({
        toggleFlashlightMode: 'off',
        toggleFlashlight: false
      })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  toggleButtonContainers: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pickerContainers: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  pickerInnerContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  pickerText: {
    fontSize: 15,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
