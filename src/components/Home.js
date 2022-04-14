import React from 'react'
import Form from './Form'

const Home = props => {
	return (
		<main className='home__container'>
			<Form quizzOptions={props.quizzOptions} />
			<h1 className='home__title'>Quizzical</h1>
			<p className='home__subtitle'>Un jeu super fun !</p>
			<button onClick={props.displayQuizz} className='home__btn'>
				Start quizz
			</button>
		</main>
	)
}

export default Home
