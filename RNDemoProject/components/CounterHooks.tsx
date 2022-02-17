import React, { Fragment, useState } from 'react';

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

export default function CounterHooks() {
    let [count, setCount] = useState(1)
    return (<Fragment>
        <Text style={count < 3 ? styles.less : styles.greater}>Counter-Hooks : You clicked {count} times</Text>
        <TouchableOpacity style={styles.button} onPress={()=>setCount(count+1)}>
            <Text style={styles.buttonText}>Click</Text>
        </TouchableOpacity>
    </Fragment>)
}