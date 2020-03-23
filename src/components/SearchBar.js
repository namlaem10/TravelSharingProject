/* eslint-disable prettier/prettier */
import React, { Component, useRef } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import * as contants from '../utils/Contants';
import Fonts from '../utils/Fonts';



export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClickSearch: false,
        };
    }


    onPressSearchIcon = () => {
        this.setState({
            isClickSearch: true,
        })
    }
    onEndEditing = () => {
        if (this.props.value == '') {
            this.setState({
                isClickSearch: false,
            })
        }
    }

    render() {
        const { value, onChangeText, title, placeHolder } = this.props;
        const { isClickSearch } = this.state;
        return (
            isClickSearch ?
                <View style={styles.container1}>
                    <View style={styles.iconSearch}>
                        <TouchableOpacity onPress={this.onPressSearchIcon}>
                            <Image
                                style={{ width: 35, height: 35 }}
                                source={require('../assets/images/ic-search.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputText}>
                        <TextInput
                            placeholder={placeHolder}
                            style={styles.searchBar}
                            onChangeText={text => onChangeText(text)}
                            value={value}
                            clearButtonMode={"while-editing"}
                            onEndEditing={this.onEndEditing}
                        />
                    </View>
                </View>
                : <View style={styles.container2}>
                    <View style={styles.title}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontFamily: contants.Fonts.regular,
                                letterSpacing: 2.56,
                            }}>
                            {title}
                        </Text>
                    </View>
                    <View style={styles.iconSearch}>
                        <TouchableOpacity onPress={this.onPressSearchIcon}>
                            <Image
                                style={{ width: 35, height: 35 }}
                                source={require('../assets/images/ic-search.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
        );
    }
}

const styles = new StyleSheet.create({
    container1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchBar: {
        width: 250,
        height: 40,
        fontSize: 18,
        fontFamily: contants.Fonts.light,
        letterSpacing: 2.56,
        alignSelf: 'center',
        textAlignVertical: 'center'
    },
    title: {
        marginLeft: contants.WIDTH / 4.2,
        height: 35,
        justifyContent: 'center',
    },
    iconSearch: {
    },
});
