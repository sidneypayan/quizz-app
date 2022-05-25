import { useContext } from 'react'
import QuizzGameContext from '../context/QuizzGameContext'
import Form from './Form'
import Quizz from './Quizz'

const Home = () => {
	const { quizzDisplayed } = useContext(QuizzGameContext)
	return (
		<main className='home__container'>
			{quizzDisplayed ? <Quizz /> : <Form />}
		</main>
	)
}

export default Home
