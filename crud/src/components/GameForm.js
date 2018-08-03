import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Redirect } from 'react-router-dom'
import { saveGames, fetchGame, updateGames } from '../actions'
export class GameForm extends Component {
    
    state = {
        _id: this.props.game ? this.props.game._id : '',
        title: this.props.game ? this.props.game.title : '',
        cover: this.props.game ? this.props.game.cover : '',
        errors:{},
        loading:false,
        done:false
    }

    componentDidMount(){
        const { match } = this.props
        if(match.params._id){
            this.props.fetchGame(match.params._id)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            _id: nextProps.game._id,
            title: nextProps.game.title,
            cover: nextProps.game.cover
        })
    }

    handleChange = e => {
        if(this.state[e.target.name]){
            let errors = Object.assign({}, this.state.errors)
            delete errors[e.target.name]
            this.setState({ [e.target.name]: e.target.value, errors })
        }else{
            this.setState({[e.target.name] : e.target.value })
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        let errors = {}
        if(this.state.title === '') errors.title = 'Can not be empty'
        if(this.state.cover === '') errors.cover = 'Can not be empty'
        this.setState({ errors })

        let isValid = Object.keys(errors).length === 0
        if(isValid){
            const { _id, title, cover } = this.state
            this.setState({ loading:true })
            if(_id){
                 this.props.updateGames({ _id,title, cover })
                    .then(() => { this.setState({ loading: false, done: true})})
            }else{
                 this.props.saveGames({ title, cover })
                    .then(() => { this.setState({ loading: false, done: true})})
            }
           
        }
    }

  render() {
    const form = (
        <form className={ classnames('ui', 'form', { loading: this.state.loading })} onSubmit={ this.handleSubmit }>
        <h1>Add New Game</h1>
        <div className={ classnames('field', { error: !!this.state.errors.title })}>
            <label htmlFor="title">Title</label>
            <input type="text"
            name="title"
            value={ this.state.title }
            onChange={ this.handleChange }/>
            <span>{ this.state.errors.title }</span>
        </div>
        <div className={ classnames('field', { error: !!this.state.errors.cover })}>
            <label htmlFor="cover">Cover</label>
            <input type="text"
            name="cover"
            value={ this.state.cover }
            onChange={ this.handleChange }/>
            <span>{ this.state.errors.cover }</span>
        </div>
        <div className="field">
            <button className="ui primary button">Save</button>
        </div>
      </form>
    )

    return (
        <div>
            { this.state.done ? <Redirect to="/games" /> : form }
        </div>
      
    )
  }
}

const mapStateToProps = (state, props) => {
    const { match } = props
    return {
        game: state.games.find(item => item._id === match.params._id )
    }
}

export default connect(mapStateToProps,{ saveGames, fetchGame, updateGames })(GameForm)
