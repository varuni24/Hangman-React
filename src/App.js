import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { updateCategory, updateGameEnd, updateGuessedAlphabets, updateImageIdx, updateWrongMovesPlayed, resetGame, updateSecretWord } from './actions/hangmanAction';
import { sports, animals, countries } from './hangmanWordList';
import hang0 from './hangmanImgs/0.png';
import hang1 from './hangmanImgs/1.png';
import hang2 from './hangmanImgs/2.png';
import hang3 from './hangmanImgs/3.png';
import hang4 from './hangmanImgs/4.png';
import hang5 from './hangmanImgs/5.png';
import hang6 from './hangmanImgs/6.png';
import './App.css';



const App = () => {

  const dispatch = useDispatch()

  const currentImageIdx = useSelector(state => state.hangman.currentImageIdx)
  const [currentImage, setCurrentImage] = useState(hang0)

  const alphabets = useSelector(state => state.hangman.alphabets)
  const guessedAlphabets = useSelector(state => state.hangman.guessedAlphabets)

  const movesPlayed = useSelector(state => state.hangman.movesPlayed)
  const numOfMoves = useSelector(state => state.hangman.numOfMoves)

  const guessed = useSelector(state => state.hangman.guessed)
  const end = useSelector(state => state.hangman.end)

  const category = useSelector(state => state.hangman.category)
  const secretWord = useSelector(state => state.hangman.secretWord)
  const [displayWord, setDisplayWord] = useState('')

  const [buttons, setButtons] = useState(<div></div>)


  useEffect(() => {
    setButtons(getAlphabetsDisplay())
    setDisplayWord(getDisplayWord(secretWord))
    let isWordGuessed = secretWord === getDisplayWord(secretWord)
    let isOutOfMoves = movesPlayed === numOfMoves
    if (isOutOfMoves || (isWordGuessed && secretWord !== ''))
      dispatch(updateGameEnd(true, isWordGuessed))
  }, [guessedAlphabets]);

  useEffect(() => {
    let isWordGuessed = secretWord === displayWord
    let isOutOfMoves = movesPlayed === numOfMoves
    if (isOutOfMoves || (isWordGuessed && secretWord !== ''))
      dispatch(updateGameEnd(true, isWordGuessed))
  }, [movesPlayed]);

  useEffect(() => {
    setButtons(getAlphabetsDisplay())
    getRandomWordFromCategory(category)
  }, [category])

  useEffect(() => {
    setButtons(getAlphabetsDisplay())
    setDisplayWord(getDisplayWord(secretWord))
  }, [secretWord])


  const getAlphabetsDisplay = () => {
    return <div>
      {alphabets.map(ch => {
        if (guessedAlphabets.includes(ch)) {
          return (
            <Button
              variant="contained"
              className='alph'
              disabled
            >
              {ch}
            </Button>
          )
        } else {

          return (
            <Button
              variant="contained"
              color="primary"
              className='alph'
              onClick={() => checkAlphabetInWord(ch)}

            >
              {ch}
            </Button>
          )
        }
      })}
    </div >
  }

  const getRandomWordFromCategory = () => {
    let maximum = 0
    if (category === 'sports') maximum = sports.length - 1
    else if (category === 'animals') maximum = animals.length - 1
    else if (category === 'countries') maximum = countries.length - 1
    let randomnumber = Math.floor(Math.random() * (maximum - 0 + 1)) + 0;

    let secretWord = ''
    if (category === 'sports') secretWord = sports[randomnumber]
    else if (category === 'animals') secretWord = animals[randomnumber]
    else if (category === 'countries') secretWord = countries[randomnumber]

    dispatch(updateSecretWord(secretWord))
  }

  const getDisplayWord = (secretWord) => {
    let displayWord = ''
    secretWord.split('').forEach(ch => {
      if (guessedAlphabets.includes(ch)) {
        displayWord = displayWord.concat(ch)
      }
      else if (ch === ' ') {
        displayWord = displayWord.concat(' ')
      }
      else {
        displayWord = displayWord.concat('__ ')
      }
    })
    return displayWord
  }

  const checkAlphabetInWord = (ch) => {
    if (!(secretWord.split('').includes(ch))) {
      getNextImage()
      dispatch(updateWrongMovesPlayed(movesPlayed + 1))
    }
    dispatch(updateGuessedAlphabets(ch))

  }

  const getNextImage = () => {
    let nextIdx = currentImageIdx + 1 > 6 ? 0 : currentImageIdx + 1
    switch (nextIdx) {
      case 0: setCurrentImage(hang0); break;
      case 1: setCurrentImage(hang1); break;
      case 2: setCurrentImage(hang2); break;
      case 3: setCurrentImage(hang3); break;
      case 4: setCurrentImage(hang4); break;
      case 5: setCurrentImage(hang5); break;
      case 6: setCurrentImage(hang6); break;
    }
    dispatch(updateImageIdx(nextIdx))
  }


  return (
    <>
      <div className='header'> </div>
      <div className='main'>

        <div className='sideBar'> </div>

        <div className='hangImage'>
          <img src={currentImage} className='hangImg' alt='hangman' />
        </div>

        <div className='hangGame'>
          {
            (category === null && secretWord === '') ?
              <>
                Choose a category:
                <Button onClick={() => dispatch(updateCategory('sports'))}>Sports</Button>
                <Button onClick={() => dispatch(updateCategory('animals'))}>Animals</Button>
                <Button onClick={() => dispatch(updateCategory('countries'))}>Countries</Button>
              </>
              :

              <>

                {guessed && end &&
                  <div className='word'>
                    Congratulations! You guessed it right
                    <br />
                    {secretWord}
                    <br />
                    <Button onClick={() => { dispatch(resetGame()); setCurrentImage(hang0); setDisplayWord(''); }}>Main Menu</Button>
                  </div>
                }
                {!guessed && end &&
                  <div className='word'>
                    Oops! You are out of moves
                    <br />
                    {secretWord}
                    <br />
                    <Button onClick={() => { dispatch(resetGame()); setCurrentImage(hang0); setDisplayWord(''); }}>Main Menu</Button>
                  </div>
                }
                {!end &&
                  <>
                    <div>Category: {category}</div>
                    <div className='word'>{displayWord}</div>
                    <br />
                    {buttons}
                    <br />
                    Number of Wrong Moves left: {numOfMoves - movesPlayed}
                    <br />
                    <br />
                  </>
                }
              </>
          }
        </div >

        <div className='sideBar'></div>

      </div >
      <div className='footer'> </div>
    </>
  );
}


export default App;
