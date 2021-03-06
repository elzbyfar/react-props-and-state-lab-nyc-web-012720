import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: event.target.value
      }
    })
  }

  onFindPetsClick = () => {
    if (this.state.filters.type === "all") {
      fetch('/api/pets') 
      .then(response => response.json())
      .then(allPets => this.setState({
        pets: allPets
      }))
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`) 
      .then(response => response.json())
      .then(allPets => this.setState({
        pets: allPets.filter(pet => pet.type === this.state.filters.type)
      }))
    }
  }

  onAdoptPet = (petId) => {
    let adoptee = this.state.pets.find(pet => pet.id === petId)
    adoptee.isAdopted = true
    return adoptee
  }
  
  componentDidMount() {
    this.onFindPetsClick()
  }

  render() {
    console.log(this.state)
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
