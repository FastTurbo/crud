import {
    SET_GAMES,
    ADD_GAME,
    GAME_FETCHED,
    GAME_UPDATED,
    GAME_DELETED
} from '../constants'
const setGames = games => {
    return {
        type:SET_GAMES,
        games
    }
}

export const fetchGames = () => {
    return dispatch => {
        fetch('/api/games')
        .then(res => res.json())
        .then(data => dispatch(setGames(data.games)))
    }
}

export const gameFetched = game => {
    return {
        type:GAME_FETCHED,
        game
    }
}

export const fetchGame = id => {
    return dispatch => {
        fetch(`/api/games/${id}`)
            .then(res => res.json())
            .then(data => dispatch(gameFetched(data.game)))
    }
}
const handleResponse = (response) => {
    if(response.ok){
        return response.json()
    }else{
        let error = new Error(response.statusText)
        error.response = response
        throw error
    }
}
const addGame = game => {
    return {
        type:ADD_GAME,
        game
    }
}
export const saveGame = data => {
    return dispatch => {
        return fetch('/api/games',{
            method: 'post',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(handleResponse)
        .then(res => dispatch(addGame(res.game)))
    }
}
const gameUpdate = game => {
    return {
        type:GAME_UPDATED,
        game
    }
}
export const updateGame = data => {
    return dispatch => {
        return fetch(`/api/games/${data._id}`, {
                method: 'put',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(handleResponse)
            .then(res => dispatch(gameUpdate(res.game)))
    }
}

const gameDelete = id => {
    console.log(id)
    return {
        type:GAME_DELETED,
        id
    }
}
export const deleteGame = id => {
    
    return dispatch => {
        console.log(id)
        return fetch(`/api/games/${id}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(handleResponse)
            .then(data => dispatch(gameDelete(id)))
    }
}