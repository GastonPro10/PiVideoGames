import axios from "axios";

export function getGames() {
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/videogames");
        return dispatch({
            type: 'GET_GAMES',
            payload: json.data
        })
    }
}

export function getNameGame(payload) {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/videogames?name=" + payload);
        return dispatch({
            type: 'GET_NAME_GAMES',
            payload: json.data
        })
    }
}

export function postGame(payload) {
    return async function(dispatch) {
        var json = await axios.post("http://localhost:3001/videogame",payload)
        return json
    }
}

export function getGenres(){
    return async function (dispatch){
        var gen = await axios.get("http://localhost:3001/genres")
        return dispatch({
            type: "GET_GENRES",
            payload: gen.data
        })
    }
}

export function filterGamesByGenre(payload){
    return {
        type: "FILTER_BY_GENRES",
        payload
    }
}

export function filterCreated(payload){
    return {
        type: "FILTER_CREATED",
        payload
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try{
            var json = await axios.get("http://localhost:3001/videogame/" + id);
            return dispatch({
                type: "GET_DETAIL",
                payload: json.data
            })
        } catch(e){
            console.log(e);
        }
    }
}