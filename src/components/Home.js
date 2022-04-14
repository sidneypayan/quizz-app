import React from 'react'
import Form from './Form'

const Home = props => {
	return (
		<main className='home__container'>
			<h1 className='home__title'>Quizzical</h1>
			<p className='home__subtitle'>Un jeu super fun !</p>
			<Form formData={props.formData} quizzOptions={props.quizzOptions} />
			<button onClick={props.displayQuizz} className='home__btn'>
				Start quizz
			</button>
		</main>
	)
}

export default Home
