import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchGames, deleteGame } from '../actions'
import GamesList from './GamesList'
export class GamesPage extends Component {

    componentDidMount(){
        this.props.fetchGames()
    }
  

  render() {
    return (
      <div>
        <GamesList games={ this.props.games } deleteGame={ this.props.deleteGame }/>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        games: state.games
    }
}

export default connect(mapStateToProps, { fetchGames, deleteGame })(GamesPage)
