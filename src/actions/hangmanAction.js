export const updateGuessedAlphabets = (ch) => {
    return {
        type: 'UPDATE_GUESSED_ALPHABETS',
        payload: ch
    }
}


export const updateWrongMovesPlayed = (count) => {
    return {
        type: 'UPDATE_MOVES_PLAYED',
        payload: count
    }
}



export const updateImageIdx = (idx) => {
    return {
        type: 'UPDATE_IMAGE_IDX',
        payload: idx
    }
}


export const updateGameEnd = (b, isGuessed) => {
    return {
        type: 'UPDATE_GAME_END',
        payload: {
            end: b,
            guessed: isGuessed
        }
    }
}


export const updateCategory = (category) => {
    return {
        type: 'UPDATE_CATEGORY',
        payload: category
    }
}


export const resetGame =()=>{
    return {
        type:'RESET_GAME'
    }
}


export const updateSecretWord =(word)=>{
    return {
        type:'UPDATE_SECRET_WORD',
        payload:word
    }
}