import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GamesList from './GamesList'
import { fetchGames, deleteGame } from '../actions'

export class GamesPage extends Component {

    componentDidMount() {
        this.props.fetchGames()
    }
  

  render() {
    let { games, deleteGame } = this.props
    return (
        
      <div>
        <GamesList games={ games } deleteGame={ deleteGame }/>
      </div>
    )
  }
}

GamesPage.propTypes = {
    games:PropTypes.array.isRequired,
    deleteGame:PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        games:state.games
    }
}

export default connect(mapStateToProps,{ fetchGames, deleteGame })(GamesPage)
