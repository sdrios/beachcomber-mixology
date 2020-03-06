import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Switch, Route, Link} from 'react-router-dom';
import Header from './components/header';
import Search from './components/search';
import Recipe from './components/recipe';
import Footer from './components/footer';
//import {Jumbotron} from 'react-bootstrap';



function App() {
  return (
    <div>
      <Header></Header>
      <Search></Search>
      <Footer></Footer>
    </div>
  );
}

export default App;
