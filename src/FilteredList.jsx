import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import List from './List';

class FilteredList extends Component {
  constructor(props) {
    super(props);

    //The state is just a list of key/value pairs (like a hashmap)
    this.state = {
      search: "",
      type: "All"
    };
  }

  //Sets the state whenever the user types on the search bar
  onSearch = (event) => {
    this.setState({search: event.target.value.trim().toLowerCase()});
  }

  onFilter = (event) => {
    this.setState({ type: event});
    console.log(event);
  }

  filterItem = (item) => {
      const searchMatch = item.name.toLowerCase().search(this.state.search) !== -1;
      const typeMatch = this.state.type === "All" || item.type === this.state.type;

      return searchMatch && typeMatch;
  }

  render(){
    return (
        <div className = "filter-list">
         
          <h1>Produce Search</h1>

          {/* <DropdownButton id="typeDropdown" title={"Type"}>
            <MenuItem eventKey="All" onSelect={this.onFilter}>All</MenuItem>
            <MenuItem eventKey="Fruit" onSelect={this.onFilter}>Fruit</MenuItem>
            <MenuItem eventKey="Vegetable" onSelect={this.onFilter}>Vegetables</MenuItem>
          </DropdownButton> */}

          <Dropdown>
              <Dropdown.Toggle onSelect={this.onFilter} variant="success" id="dropdown-basic">
                  {this.state.type}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="All" onClick={() => this.onFilter("All")}>All</Dropdown.Item>
                <Dropdown.Item eventKey="Fruit" onClick={(event) => this.onFilter("Fruit")}>Fruit</Dropdown.Item>
                <Dropdown.Item eventKey="Vegetable" onClick={() => this.onFilter("Vegetable")}>Vegetables</Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>

          <input type = "text" placeholder = "Search" onChange = {this.onSearch} />
          <List items = {this.props.items.filter(this.filterItem)} />
        </div>
    );
  }
}

export default FilteredList;
