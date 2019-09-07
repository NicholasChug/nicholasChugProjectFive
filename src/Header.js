import React, {Component} from 'react';
import './App.css';

class Header extends Component {
    render() {
        return (
            <header className='headerSection'>
                <div className='wrapper'>
                    <h1 className='title bounce-in-top'>today.</h1>
                    <p className='introduction'>Welcome to your next minimalist todo list! Enter your task below to log it into our online database initialized with firebase. Feel free to complete any item when you're done. and remove it once each task is completed.</p>
                </div>
            </header>
        )
    }
    
}

export default Header;