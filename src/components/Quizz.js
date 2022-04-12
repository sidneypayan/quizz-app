import React from 'react'
import { decode } from 'html-entities'

const Quizz = props => {
	// const styles = {
	// 	backgroundColor: props.isSelected && '#D6DBF5',
	// }

	function handleClick(e, id) {
		props.checkAnswer(e.target.textContent, id)
		if (e.target.style.backgroundColor === '') {
			e.target.style.backgroundColor = '#D6DBF5'
		} else {
			e.target.style.backgroundColor = ''
		}
	}

	console.log(props.questions)

	const questions = props.questions.map(item => {
		return (
			<>
				<h3 className='quizz__question'>{decode(item.questionText)}</h3>
				<div
					onClick={e => handleClick(e, item.id)}
					className='quizz__answers-container'>
					{item.answers[0].map(item => {
						return (
							<div className='quizz__answers'>{decode(item.answerText)}</div>
						)
					})}
				</div>
				<div className='quizz__line'></div>
			</>
		)
	})

	return (
		// <div className='quizz__container'>
		// 	{allQuestions}
		// 	<button onClick={props.displayScore} className='intro__btn quizz__btn'>
		// 		Check answers
		// 	</button>
		// </div>

		<div className='quizz__container'>
			{questions}
			<button onClick={props.displayScore} className='intro__btn quizz__btn'>
				Check answers
			</button>
		</div>
	)
}

export default Quizz
