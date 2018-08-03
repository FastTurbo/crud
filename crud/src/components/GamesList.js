import React from 'react'
import PropTypes from 'prop-types'
import GameCard from './GameCard'

const GamesList = ({ games, deleteGame }) => {
    const emptyMessage = (
        <p>There are no games yet.</p>
    )

    const gamesList = (
        <div className="ui four cards">
            { games.map(game => <GameCard key={ game._id } game={ game } deleteGame={ deleteGame } />)}
        </div>
    )
  return (
    <div>
      { games.length === 0 ? emptyMessage : gamesList }
    </div>
  )
}

GamesList.propTypes = {
    games:PropTypes.array.isRequired,
    deleteGame:PropTypes.func.isRequired,
}

export default GamesList
