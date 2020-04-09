import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
const idGroup = 'group3';
import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
import database from '../../utils/fireBaseConfig';
export default class TrackingMapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      isLoading: true,
    };
  }
  UNSAFE_componentWillMount = async () => {
    const GroupRef = database.ref('groups/' + idGroup);
    const snapshot = await GroupRef.once('value');
    this.setState({
      array: snapshot.val(),
      isLoading: false,
    });

    // GroupRef.on('child_changed', function(data) {
    //   console.log('hello', data.val());
    // });
  };

  render() {
    const {array, isLoading} = this.state;
    console.log(array);
    return isLoading ? (
      <ActivityIndicator size={EStyleSheet.value('60rem')} color="#34D374" />
    ) : (
      <View style={styles.container}>
        <TouchableOpacity
          style={{position: 'absolute', top: 20}}
          onPress={() => this.pushItem()}
        />
        <View style={{justifyContent: 'center', alignItems: 'center'}} />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: 'white',
  },
});
