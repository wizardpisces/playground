import React, { Fragment } from 'react';

import {
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';
const styles = StyleSheet.create({
    bg: {
        flex: 1,
        paddingTop: 150,
        alignItems: 'center',
        backgroundColor: '#cbf35c'
    },
    less: {
        fontSize: 25,
        color: '#4d3398',
        fontWeight: 'bold'
    },
    greater: {
        fontSize: 25,
        color: '#f3845c',
        fontWeight: 'bold'
    },
    button: {
        width: 150,
        height: 50,
        alignItems: 'center',
        paddingTop: 10,
        borderRadius: 10,
        backgroundColor: '#3498db'
    },
    buttonText: {
        fontSize: 25,
        color: '#000'
    }
})

export default class Counter extends React.Component {
    state = {
        count: 0
    };

    setCount = () => this.setState(
        prevState => ({
            ...prevState,
            count: this.state.count + 1
        })
    )

    render() {
        const {
            count
        } = this.state;
        return (
            <Fragment>
                <Text style={count < 3 ? styles.less : styles.greater}>Counter: You clicked {count} times</Text>
                <TouchableOpacity style={styles.button} onPress={this.setCount} accessibilityLabel="counter-button">
                    <Text style={styles.buttonText}>Click</Text>
                </TouchableOpacity>
            </Fragment>
        )
    }
}