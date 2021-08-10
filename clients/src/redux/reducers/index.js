import Axios from 'axios'
const initialState = {
  loading: true,
  allGames: [],
  shownGames: [],
  genres: [],
  sortedGames: [],
  sorted: false,
  pageIndex: 1,
  sortedPageIndex: 1
}


const rootReducer = (state = initialState, action) => {
  if (action.type === 'GET_ALL_GAMES') {
    return Object.assign({}, state, {
      loading: false,
      allGames: action.payload,
      shownGames: action.payload.slice(0, 9)
    }
    )

  }
  if (action.type === 'GET_ALL_GENRES') {
    return Object.assign({}, state, {
      genres: action.payload
    }
    )

  }
  if (action.type === 'TOGGLE_PAGE') {
    if (action.payload === "+" && !state.sorted && state.pageIndex < 12) {
      state.pageIndex = state.pageIndex + 1
      return {
        ...state,
        shownGames: state.allGames.slice(state.pageIndex * 9 - 9, state.pageIndex * 9)
      }
    }
    if (action.payload === "+" && state.sorted && state.sortedPageIndex < Math.ceil(state.sortedGames.length / 9)) {
      state.sortedPageIndex = state.sortedPageIndex + 1
      return {
        ...state,
        shownGames: state.sortedGames.slice(state.sortedPageIndex * 9 - 9, state.sortedPageIndex * 9)
      }
    }
    if (action.payload === "-" && !state.sorted && state.pageIndex > 1) {
      return Object.assign({}, state, {
        pageIndex: state.pageIndex - 1,
        shownGames: state.allGames.slice(state.pageIndex * 9 - 18, state.pageIndex * 9 - 9)
      }
      )
    }
    if (action.payload === "-" && state.sorted && state.sortedPageIndex > 1) {
      state.sortedPageIndex = state.sortedPageIndex - 1
      return {
        ...state,
        shownGames: state.sortedGames.slice(state.sortedPageIndex * 9 - 9, state.sortedPageIndex * 9)
      }
    }
    return state
  }

  if (action.type === 'FILTER_GAMES_NAME') {
    if (action.payload) {
      state.sortedGames = state.allGames.filter(game => game.name.includes(action.payload))
      return {
        ...state,
        sorted: true,
        shownGames: state.sortedGames.slice(0, 9)
      }
    } else {
      state.shownGames = state.allGames.slice(state.pageIndex * 9 - 9, state.pageIndex * 9)
      return {
        ...state,
        sorted: false,
        sortedGames: [],

      }
    }
  }
  if (action.type === 'FILTER_ALPH') {

    if (action.payload === "A-Z") {
      state.sortedGames = state.allGames.slice().sort((a, b) => {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      })
      return Object.assign({}, state, {
        shownGames: state.sortedGames.slice(state.sortedPageIndex * 9 - 9, state.sortedPageIndex * 9),
        sortedPageIndex: 1,
        sorted: true
      })
    } else if (action.payload === 'Z-A') {
      state.sortedGames = state.allGames.slice().sort((a, b) => {
        if (a.name > b.name)
          return -1;
        if (a.name < b.name)
          return 1;
        return 0;
      })
      return {
        ...state,
        sortedPageIndex: 1,
        shownGames: state.sortedGames.slice(state.sortedPageIndex * 9 - 9, state.sortedPageIndex * 9),
        sorted: true
      }
    }
    else {
      return {
        ...state,
        sorted: false,
        sortedGames: [],
        sortedPageIndex: 1,
        shownGames: state.allGames.slice(state.pageIndex * 9 - 9, state.pageIndex * 9),
      }
    }
  }
  if (action.type === 'FILTER_RATING') {
    if (action.payload === 'Mejor') {
      state.sortedGames = state.allGames.slice().sort((a, b) => {
        if (a.rating > b.rating)
          return -1;
        if (a.rating < b.rating)
          return 1;
        return 0;
      })
      return Object.assign({}, state, {
        shownGames: state.sortedGames.slice(state.sortedPageIndex * 9 - 9, state.sortedPageIndex * 9),
        sortedPageIndex: 1,
        sorted: true
      })
    } else if (action.payload === 'Peor') {
      state.sortedGames = state.allGames.slice().sort((a, b) => {
        if (a.rating < b.rating)
          return -1;
        if (a.rating > b.rating)
          return 1;
        return 0;
      })
      return {
        ...state,
        sortedPageIndex: 1,
        shownGames: state.sortedGames.slice(state.sortedPageIndex * 9 - 9, state.sortedPageIndex * 9),
        sorted: true
      }
    } else {
      return {
        ...state,
        sorted: false,
        sortedGames: [],
        sortedPageIndex: 1,
        shownGames: state.allGames.slice(state.pageIndex * 9 - 9, state.pageIndex * 9),
      }
    }
  }
  if (action.type === 'SUBMIT_GAME') {
    console.log(action.payload.platforms)
    Axios.post(`http://localhost:3001/videogames`, {
      name: action.payload.name,
      description: action.payload.description,
      img: action.payload.img,
      rating: parseInt(action.payload.rating),
      generos: action.payload.generos,
      platforms: action.payload.platforms
    })
  }

  return state
}
export default rootReducer