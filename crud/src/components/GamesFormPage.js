import React, { Component } from 'react'
import {connect} from 'react-redux'
import { saveGame, fetchGame, updateGame } from '../actions'
import { Redirect } from 'react-router-dom'
import GameForm from './GamesForm'

export class GamesFormPage extends Component {
  state = {
      redirect:false
  }
 componentDidMount() {
        const { match } = this.props
        if(match.params._id){
            this.props.fetchGame(match.params._id)
        }
    }

    saveGame = ({_id, title, cover }) => {
        this.setState({loading:true})
        if(_id){
            return this.props.updateGame({ _id, title, cover })
                .then(() => {
                    this.setState({ redirect: true })
                })
        }else{
            return this.props.saveGame({ title, cover })
                .then(() => {
                    this.setState({ redirect: true })
                })
        }
    }

    render() {
        console.log(this.state.redirect)
        return (
            <div>
                { this.state.redirect ?
                <Redirect to="/games" /> :
                <GameForm saveGame={ this.saveGame } game={ this.props.game }/>    
                }
            </div>
        )
  }
}
const mapStateToProps = (state, props) => {
    const { match } = props
    if (match.params._id) {
        return {
            game: state.games.find(item => item._id === match.params._id)
        }
    } else {
        return {
            game: null
        }
    }
}
export default connect(mapStateToProps, {
    saveGame,
    fetchGame,
    updateGame
})(GamesFormPage)
