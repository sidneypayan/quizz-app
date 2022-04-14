import React from 'react'
import { decode } from 'html-entities'

const Quizz = props => {
	const getBackgroundColor = (isCorrect, isSelected) => {
		if (props.displayScore && isCorrect) {
			return '#94D7A2'
		}

		if (props.displayScore && isSelected) {
			return '#F8BCBC'
		}

		if (isSelected) {
			return '#D6DBF5'
		}
	}

	const deleteBorder = (isCorrect, isSelected) => {
		if (props.displayScore && isCorrect) {
			return 'none'
		}

		if (isSelected) {
			return 'none'
		}
	}

	const changeOpacity = (isCorrect, isSelected) => {
		if (props.displayScore && isSelected && !isCorrect) {
			return '0.5'
		}
	}

	function handleClick(questionId, answerId) {
		props.checkAnswer(questionId, answerId)
	}

	const questions = props.questions.map(item => {
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

	return (
		<div className='quizz__container'>
			{questions}
			<div className='quizz__score-container'>
				{props.displayScore && (
					<p className='quizz__score'>
						You scored {props.score} / 5 correct answers
					</p>
				)}

				{props.displayScore ? (
					<button
						onClick={props.toggleReloadGame}
						className='home__btn quizz__btn'>
						Play again
					</button>
				) : (
					<button
						onClick={props.toggleDisplayScore}
						className='home__btn quizz__btn'>
						Check answers
					</button>
				)}
			</div>
		</div>
	)
}

export default Quizz
