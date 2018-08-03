import { SET_GAMES, ADD_GAME, GAME_FETCHED, GAME_UPDATED, GAME_DELETED } from "../constants";

const setGames = games => {
    return {
        type: SET_GAMES,
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

const gameFetched = game => {
    return {
        type: GAME_FETCHED,
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

const handleResponse = res => {
    if(res.ok){
        return res.json()
    }else{
        return new Error(res)
    }
}

const addGame = game => {
    return {
        type: ADD_GAME,
        game
    }
}

export const saveGames = game => {
    return dispatch => {
        return fetch('/api/games', {
            method:'post',
            body:JSON.stringify(game),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(handleResponse)
        .then(data => dispatch(addGame(data.game)))
    }
}

const gameUpdated = game => {
    return {
        type: GAME_UPDATED,
        game
    }
}

export const updateGames = game => {
    return dispatch => {
        return fetch(`/api/games/${ game._id }`, {
            method:'put',
            body:JSON.stringify(game),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(handleResponse)
        .then(data => dispatch(gameUpdated(data.game)))
    }
}

const gameDeleted = id => {
    return {
        type: GAME_DELETED,
        id
    }
}

export const deleteGame = id => {
    return dispatch => {
        return fetch(`/api/games/${ id }`, {
            method:'delete',
            headers:{
                'Content-Type':'application/json'
            }
        }).then(handleResponse)
        .then(data => dispatch(gameDeleted(id)))
    }
}