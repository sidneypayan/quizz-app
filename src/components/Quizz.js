import React from 'react'
import { decode } from 'html-entities'

const Quizz = props => {
	// const styles = {
	// 	backgroundColor: props.isSelected && '#D6DBF5',
	// }

	function handleClick(questionId, answerId) {
		props.checkAnswer(questionId, answerId)
		// props.toggleSelected(questionId, answerId)
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
								style={{ backgroundColor: answer.isSelected && '#D6DBF5' }}
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
			<button onClick={props.displayScore} className='intro__btn quizz__btn'>
				Check answers
			</button>
		</div>
	)
}

export default Quizz
