import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import SearchBar from '../../components/SearchBar';
import {Images, FontSizes, Fonts, Colors, WIDTH} from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';

const MyTravel = [
  {
    tab: 0,
    name: 'Sắp đi',
    route: 'a',
  },
  {
    tab: 1,
    name: 'Đang đi',
    route: 'b',
  },
  {
    tab: 2,
    name: 'Đã đi',
    route: 'c',
  },
];
export default class MyTravelScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      selected: 0,
    };
  }

  render() {
    const {searchText, selected} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <SearchBar
            onChangeText={text => {
              this.setState({searchText: text});
            }}
            value={searchText}
            placeHolder={'Tìm kiếm lịch trình của tôi'}
            title={'Lịch trình của tôi'}
            tab={'MyTravel'}
          />
        </View>
        <View style={styles.content}>
          {MyTravel.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => this.setState({selected: index})}
                style={[
                  styles.optionButton,
                  selected === index
                    ? {backgroundColor: 'rgba(52, 220, 120, 0.98)'}
                    : null,
                ]}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    width: WIDTH,
    height: '50rem',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '10rem',
    backgroundColor: 'red',
    paddingHorizontal: '15rem',
  },
  content: {
    height: '50rem',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    elevation: 2,
    marginTop: '5rem',
    borderRadius: '5rem',
    marginHorizontal: '15rem',
  },
  optionButton: {
    width: '33%',
    height: '46rem',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1rem',
  },
});
