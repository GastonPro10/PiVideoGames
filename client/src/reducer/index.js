const initialState = {
    games: [],
    allGames: [],
    genres: [],
    detail: []

}

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case "GET_GAMES":
            return {
                ...state,
                games: action.payload,
                allGames: action.payload
            }
        case 'GET_NAME_GAMES':
            return {
                ...state,
                games: action.payload,
            }
        case "GET_GENRES":
            let genre = action.payload
            genre.unshift("All")
            return {
                ...state,
                genres: action.payload
            }
        case "GET_DETAIL":
            return{
                ...state,
                detail: action.payload
            }
        case "POST_GAME":
            return {
                ...state,
            }
        case 'FILTER_BY_GENRES':
            const allGames = state.allGames
            const statusFiltered = action.payload === "All" ? allGames : allGames.filter(el => el.genres.includes(action.payload))
            return {
                ...state,
                games: statusFiltered
            }
        case "FILTER_CREATED":
            const allGames2 = state.allGames
            const createdFilter = action.payload === 'Created' ? allGames2.filter(el => el.createdInDb) : allGames2.filter(el => !el.createdInDb)
            return {
                ...state,
                games: action.payload === 'All'? state.allGames : createdFilter
            }
        case "ORDER_BY_NAME":
            let sortArr = action.payload === 'asc'?
                state.games.sort(function(a, b) {
                    if(a.name > b.name) {
                        return 1;
                    }
                    if(b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.games.sort(function(a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    games: sortArr
                }
            default:
                return state;
    }
}

export default rootReducer;