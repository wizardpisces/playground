import React, { Fragment, useEffect, useState } from 'react';

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
type Movie = {id:number,title:string,releaseYear:string}
const getMoviesFromApi = (): Promise<Movie[]> => {
    return fetch('https://reactnative.dev/movies.json')
        .then((response) => response.json())
        .then((json) => {
            return json.movies;
        })
        .catch((error) => {
            console.error(error);
        });

};
export default function CounterHooks() {
    let [count, setCount] = useState(1)
    let [movies, setMovies] = useState<Movie[]>([])
    const getMovies = ()=>{
        getMoviesFromApi().then(moviesResult=>{
            debugger

            console.log('moviesResult',moviesResult)
            setMovies(moviesResult)
        })
    }
    useEffect(() => {
    })
    return (<Fragment>
        <Text style={count < 3 ? styles.less : styles.greater}>Counter-Hooks : You clicked {count} times</Text>
        <TouchableOpacity style={styles.button} onPress={() => setCount(count + 1)}>
            <Text style={styles.buttonText}>Click</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => getMovies()}>
            <Text style={styles.buttonText}>getMovies</Text>
        </TouchableOpacity>
        {movies.map(movie=><Text key={movie.id}>{movie.title}</Text>)}


    </Fragment>)
}