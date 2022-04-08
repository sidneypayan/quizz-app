import React from 'react'
import { decode } from 'html-entities'

const Quizz = props => {
	function handleClick(answer) {
		props.checkAnswer(answer)
	}

	const allQuestions = props.questions.map(item => {
		return (
			<>
				<h3 className='quizz__question'>{decode(item.question)}</h3>
				<div className='quizz__answers-container'>
					<div
						className='quizz__answers'
						onClick={() => handleClick(item.correct_answer)}>
						{item.correct_answer}
					</div>
					{item.incorrect_answers.map(item => {
						return (
							<div className='quizz__answers' onClick={() => handleClick(item)}>
								{decode(item)}
							</div>
						)
					})}
				</div>
				<div className='quizz__line'></div>
			</>
		)
	})

	return <div className='quizz__container'>{allQuestions}</div>
}

export default Quizz
