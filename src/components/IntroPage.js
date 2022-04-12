import React from 'react'

const IntroPage = props => {
	return (
		<main className='intro__container'>
			<h1 className='intro__title'>Quizzical</h1>
			<p className='intro__subtitle'>Un jeu super fun !</p>
			<button onClick={props.displayQuizz} className='intro__btn'>
				Start quizz
			</button>
		</main>
	)
}

export default IntroPage
