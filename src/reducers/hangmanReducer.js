import * as types from '../actions/actionTypes'

const initialState = {
    category: null,
    secretWord:'',
    numOfMoves: 6,
    movesPlayed: 0,
    alphabets: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    guessedAlphabets: ['A', 'E', 'I', 'O', 'U', '-', '&', '.'],
    guessed: false,
    end: false,
    currentImageIdx: 0
}
export default function hangmanReducer(state = initialState, action) {
    switch (action.type) {
        case types.UPDATE_GUESSED_ALPHABETS:
            let updatedAlphabets = [...state.guessedAlphabets]
            updatedAlphabets.push(action.payload)
            return {
                ...state,
                guessedAlphabets: updatedAlphabets
            }
        case types.UPDATE_MOVES_PLAYED:
            return {
                ...state,
                movesPlayed: action.payload
            }
        case types.UPDATE_IMAGE_IDX:
            return {
                ...state,
                currentImageIdx: action.payload
            }
        case types.UPDATE_GAME_END:
            return {
                ...state,
                end: action.payload.end,
                guessed: action.payload.guessed
            }
        case types.UPDATE_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        case types.UPDATE_SECRET_WORD:
            return{
                ...state,
                secretWord:action.payload
            }
        case types.RESET_GAME:
            return {
                ...initialState
            }
        default:
            return state
    }
}