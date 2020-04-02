import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render() {
    let petCards = this.props.pets.map(p => <Pet key={p.id} pet={p}/>)
    return <div className="ui cards">{petCards}</div>
  }
}

export default PetBrowser
