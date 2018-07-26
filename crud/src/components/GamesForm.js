import React, { Component } from 'react'

class GamesForm extends Component {
    state = {
        title:'',
        cover:''
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
  render() {
    return (
      <div>
        <form className="ui form">
            <h1>Add New Game</h1>

            <div className="field">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={this.state.title} onChange={(e) => this.handleChange(e)}/>
            </div>
            <div className="field">
                <label htmlFor="cover">Cover Url</label>
                <input type="text" name="cover" value={ this.state.cover } onChange={(e) => this.handleChange(e)}/>
            </div>

            <div className="field">
                { this.state.cover !== '' && <img src={ this.state.cover} alt="cover" clssName="ui small bordered image"/>}
            </div>

            <div className="filed">
                <button className="ui primary button">Save</button>
            </div>
        </form>
      </div>
    )
  }
}

export default GamesForm