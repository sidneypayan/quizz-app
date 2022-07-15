import { useContext } from 'react'
import { decode } from 'html-entities'
import QuizzGameContext from '../context/QuizzGameContext'
import Spinner from './Spinner'

const Quizz = () => {
	const {
		quizzData,
		score,
		displayScore,
		toggleIsSelected,
		toggleReloadGame,
		checkAnswer,
		toggleQuizz,
		loading,
	} = useContext(QuizzGameContext)

	const getBackgroundColor = (isCorrect, isSelected) => {
		if (displayScore && isCorrect) {
			return '#94D7A2'
		}

		if (displayScore && isSelected) {
			return '#F8BCBC'
		}

		if (isSelected) {
			return '#D6DBF5'
		}
	}

	const deleteBorder = (isCorrect, isSelected) => {
		if (displayScore && isCorrect) {
			return 'none'
		}

		if (isSelected) {
			return 'none'
		}
	}

	const changeOpacity = (isCorrect, isSelected) => {
		if (displayScore && isSelected && !isCorrect) {
			return '0.5'
		}
	}

	function handleClick(questionId, answerId) {
		toggleIsSelected(questionId, answerId)
	}

	const data = quizzData.map(item => {
		return (
			<>
				<h3 key={item.id} className='quizz__question'>
					{decode(item.questionText)}
				</h3>
				<div className='quizz__answers-container'>
					{item.answers[0].map(answer => {
						return (
							<div
								style={{
									backgroundColor: getBackgroundColor(
										answer.isCorrect,
										answer.isSelected
									),
									border: deleteBorder(answer.isCorrect, answer.isSelected),
									opacity: changeOpacity(answer.isCorrect, answer.isSelected),
								}}
								onClick={() => handleClick(item.id, answer.id)}
								key={answer.id}
								className='quizz__answer'>
								{decode(answer.answerText)}
							</div>
						)
					})}
				</div>
				<div className='quizz__line'></div>
			</>
		)
	})

	return loading ? (
		<Spinner />
	) : (
		<div className='quizz__container'>
			{data}
			<div className='quizz__score-container'>
				{displayScore && (
					<p className='quizz__score'>You scored {score} / 5 correct answers</p>
				)}

				{displayScore ? (
					<button onClick={toggleReloadGame} className='home__btn quizz__btn'>
						Nouvelle série de questions
					</button>
				) : (
					<button onClick={checkAnswer} className='home__btn quizz__btn'>
						Vérifier les réponses
					</button>
				)}
				<button onClick={toggleQuizz} className='home__btn quizz__btn'>
					Choix catégorie / difficulté
				</button>
			</div>
		</div>
	)
}

export default Quizz
