// import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

const url = 'https://jsonplaceholder.typicode.com/users';

class App extends Component {

  constructor() {
    super();

    this.state = {
      monsters:[],
      searchField:'',
    };

    // if we defined the function outside constructor without using the arrow function like :
    //handleSearchText(){...}
    //we have to bind the this keyword to it so it point on the state of our constructor text
    // this.handleSearchText = this.handleSearchText.bind(this);
  }

  fetchUsers = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();
    this.setState({
      monsters:data
    })
  }

  handleSearchText = (event) => {
    // console.log(this);
    this.setState({
      searchField:event.target.value
    }
    //,()=>console.log(this.state.searchField)
    );
    
    //This is will console log 1 step behind because the setState is asynchronus code and not synchronous and in order to get the state after it's done we have to do it in the callback function of the setState

    //console.log(this.state.searchField)
  }
  
  //It will be called after react is mounted 
  componentDidMount() {
    this.fetchUsers(url);
  }

  render() {
    
    const { monsters,searchField } = this.state;
    const filteredMonsters = monsters.filter(monster => {
      return monster.name.toLowerCase().includes(searchField.toLowerCase())
    });

    return (
      <div className="App">
        <h1> Monsters Rolodex </h1>
        <SearchBox 
          handleSearchText={ this.handleSearchText} 
          placeholder='search monsters' 
        />

        <CardList 
          monsters={ filteredMonsters }
        > 
          {/* This is a children props  */}
          {/* <h1>This is a children of the CardList component that can be called using props.children</h1> */}
        </CardList>

      </div>
    );
  }

}

export default App; 
