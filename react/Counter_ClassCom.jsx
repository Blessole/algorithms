import React, { Component } from 'react';
import cx from 'classnames';

export default class Counter_ClassCom extends Component{
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    clickPlusButton  = () => {
        this.setState(prevState => ({ count : prevState.count + 1 }));
    }

    clickMinusButton = () => {
        if (this.state.count === 0 ) return;
        this.setState(prevState => ({ count: prevState.count - 1 }));
    }

    clickResetButton = () => {
        this.setState({count: 0});
    }

    render() {
        const {count} = this.state;
        return (
            <div>
                <button onClick={this.clickPlusButton}>
                    <span>+</span>
                </button>
                <span className={cx({ 'high' : count > 10 })}>{count}</span>
                <span className={ count > 10 ? 'high': '' }>{count}</span>
                <button onClick={this.clickMinusButton}>
                    <span>-</span>
                </button>
                <button onClick={this.clickResetButton}>
                    <span>reset</span>
                </button>
            </div>
        )
    }
}