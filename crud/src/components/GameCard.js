import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const GameCard = ({ game, deleteGame }) => {
  return (
    <div className="ui card">
        <div className="image">
            <div>{ game.cover }</div>
        </div>
        <div className="content">
            <div className="header">{ game.title }</div>
        </div>
        <div className="extra content">
            <div className="ui two buttons">
                <NavLink to={`/game/${ game._id }`} className="ui basic green button">Edit</NavLink>
                <button className="ui basic red button" onClick={() => deleteGame( game._id )}>Delete</button>
            </div>
        </div> 
      
    </div>
  )
}

GameCard.propTypes = {
    game:PropTypes.object.isRequired,
    deleteGame:PropTypes.func.isRequired,
}

export default GameCard
