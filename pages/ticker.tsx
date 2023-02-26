import React from 'react';
const axios = require('axios').default;



function FormattedDate(props) {
    return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
  }
  
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()}; // set state to current date time
    }

    //called when component rendered in dom
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000); // call the this.tick method every 1000ms
    }

    //tear down
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        axios.get('/api/hello')
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

        this.setState({date: new Date()});
    }

    render() {
        return (
        <div>
            <FormattedDate date={this.state.date} />
        </div>
        );
    }
}


class Ticker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {price: 0}; //initialize price of 0
    }

    //called when component rendered in dom
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000); // call the this.tick method every 1000ms
    }

    //tear down
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        var price = this.state.price + 1;
        this.setState({price: price});
    }

    render() {
        return (
        <div>
            <h2>SPX PRICE: {this.state.price}.</h2>
        </div>
        );
    }
}

export default function App() {
return (
    <div>
        <Clock />
        {/* <Ticker /> */}
    </div>
);
}


  