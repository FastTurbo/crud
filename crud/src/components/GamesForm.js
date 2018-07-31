import React, { Component } from 'react'
import classnames from 'classnames'

class GamesForm extends Component {
    state = {
        title: this.props.game ? this.props.game.title : '',
        cover: this.props.game ? this.props.game.cover : '',
        _id:this.props.game ? this.props.game._id : '',
        errors:{},
        loading:false
    }

    // componentWillReceiveProps = (nextProps) => {
    //     console.log(nextProps)
    //   this.setState({
    //       _id : nextProps.game._id,
    //       title : nextProps.game.title,
    //       cover : nextProps.game.cover
    //   })
    // }
    

    handleChange = (e) => {
        if(!! this.state.errors[e.target.name]){
            let errors = Object.assign({}, this.state.errors)
            delete errors[e.target.name]
            this.setState({
                [e.target.name]: e.target.value,
                errors
            })
        }else{
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let errors = {}
        if(this.state.title === '') errors.title = 'Can not be empty'
        if(this.state.cover === '') errors.cover = 'Can not be empty'
        this.setState({errors})
        
        const isValid = Object.keys(errors).length === 0
        if(isValid){
            const { _id,title, cover} = this.state
            this.props.saveGame({_id, title, cover})
            .catch(err => err.response.json().then(({ errors }) => this.setState({ errors, loading: false})))
        }

    }
  render() {
      const form = (
          <form className={ classnames('ui','form',{ loading: this.state.loading })} onSubmit={this.handleSubmit}>
            <h1>Add New Game</h1>
            { !!this.state.errors.global && <div className="ui negative message">{ this.state.errors.global }</div>}
            <div className={ classnames('field',{ error:!!this.state.errors.title })}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={this.state.title} onChange={(e) => this.handleChange(e)}/>
                <span>{ this.state.errors.title }</span>
            </div>
            <div className={ classnames('field',{ error:!!this.state.errors.cover })}>
                <label htmlFor="cover">Cover Url</label>
                <input type="text" name="cover" value={ this.state.cover } onChange={(e) => this.handleChange(e)}/>
                <span>{ this.state.errors.cover }</span>
            </div>

            <div className="filed">
                <button className="ui primary button">Save</button>
            </div>
        </form>
      )
    return (
      <div>
        { form }
      </div>
    )
  }
}

export default GamesForm