import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as contants from '../../../utils/Contants';

export default class NewsFeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  //tạo rating hình ngôi sao theo điểm (point/5)
  createStars = () => {
    let count = this.props.data.rating;
    let leftstar = 5 - count;
    let starts = [];
    for (let i = 1; i <= count; i++) {
      starts.push(<Image source={require('../../../assets/images/gold-star.png')}
        style={{ width: 16, height: 16, }}
      />
      );
    }
    for (let i = 1; i <= leftstar; i++) {
      starts.push(<Image source={require('../../../assets/images/normal-star.png')}
        style={{ width: 16, height: 16, }}
      />
      );
    }
    return (starts);
  }

  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={data.image}
            style={{
              flex: 1,
              width: '100%',
              borderRadius: 19,
            }}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.headerInfo}>
            <View style={styles.headerCol1}>
              <Image
                source={data.avatar}
                style={{ width: 35, height: 35 }}
              />
              <View style={{ flexDirection: 'column', justifyContent: 'center', marginLeft: 15 }}>
                <Text style={{ ...styles.text, fontSize: 12, fontFamily: contants.Fonts.regular }}>
                  {data.username}
                </Text>
                <Text style={{ ...styles.text, fontSize: 12, fontFamily: contants.Fonts.light }}>
                  {data.places}
                </Text>
              </View>
            </View>
            <View style={styles.headerCol2}>
              <Text style={{ ...styles.text, fontFamily: contants.Fonts.light, color: '#8E8E8E' }}>
                {data.date}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                {this.createStars()}
              </View>
            </View>
          </View>
          <View style={styles.contentInfo}>
            <Text style={{ ...styles.text, fontFamily: contants.Fonts.medium, fontSize: 14, }}>
              {data.title}
            </Text>
            <Text style={{ ...styles.text, fontFamily: contants.Fonts.medium, fontSize: 9, color: '#41A96B', marginBottom: 5, }}>
              {data.hastag}
            </Text>
            <Text style={{ ...styles.text, fontFamily: contants.Fonts.light, fontSize: 9, }}>
              {data.content}
            </Text>
          </View>
          <View style={styles.lastInfo}>
            <View style={styles.iconGroup}>
              <Image
                style={styles.iconVector}
                source={require('../../../assets/images/money.png')}
              />
              <Text style={{ ...styles.text }}>{data.price}đ</Text>
            </View>
            <View style={styles.iconGroup}>
              <View style={styles.heartComment}>
                <Image
                  style={styles.iconVector}
                  source={require('../../../assets/images/heart.png')}
                />
                <Text style={{ ...styles.text }}>{data.love}</Text>
              </View>
              <View style={styles.heartComment}>
                <Image
                  style={styles.iconVector}
                  source={require('../../../assets/images/comment.png')}
                />
                <Text style={{ ...styles.text }}>{data.comment}</Text>
              </View>

            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = new StyleSheet.create({
  container: {
    height: contants.HEIGHT / 2.2,
    marginHorizontal: 15,
    borderRadius: 20,
    marginVertical: 10,
    flexDirection: 'column',
    //shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,

    elevation: 4,
  },
  text: {
    letterSpacing: 0.8,
  },
  header: {
    flex: 1.1,
    borderRadius: 19,
    margin: 6,
  },
  content: {
    flex: 1.3,
    marginHorizontal: 11,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerCol1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerCol2: {
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  contentInfo: {
    flex: 1.9,
    borderBottomWidth: 0.3,
    borderBottomColor: '#CFCFCF',
  },
  lastInfo: {
    flex: 1.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 5,
  },
  iconVector: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginLeft: 5,
  },
  iconGroup: {
    flexDirection: 'row',
  },
  heartComment: {
    flexDirection: 'row',
    marginHorizontal: 8,
  }
});
