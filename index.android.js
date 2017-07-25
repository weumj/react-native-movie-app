import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Image,
    Text,
    ListView,
    View
} from 'react-native';

const REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    thumbnail: {
        width: 53,
        height: 81,
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    year: {
        textAlign: 'center',
    },
});

export default class MovieApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        (async () => {
            const response = await fetch(REQUEST_URL);
            const {movies} = await response.json();

            this.setState(prevState => ({...prevState, movies}));
        })();
    }

    render() {
        const {loaded, dataSource} = this.state;

        if (!loaded) {
            return this.renderLoadingView();
        }

        return (
            <ListView
                dataSource={dataSource}
                renderRow={this.renderMovie}
                style={styles.listView}
            />
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
              <Text>
                Loading movies...
              </Text>
            </View>
        );
    }
    renderMovie({posters: {thumbnail}, title, year}) {
        return (
            <View style={styles.container}>
              <Image
                  source={{uri: thumbnail}}
                  style={styles.thumbnail}
              />
              <View style={styles.rightContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.year}>{year}</Text>
              </View>
            </View>
        );
    }
}

AppRegistry.registerComponent('MovieApp', () => MovieApp);
