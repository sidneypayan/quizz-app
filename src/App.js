import { useEffect, useState } from 'react'
import IntroPage from './components/IntroPage'
import Quizz from './components/Quizz'

function App() {
	const [questions, setQuestions] = useState([])
	const [introPage, setIntroPage] = useState(true)

	useEffect(() => {
		const fetchQuestions = async () => {
			const res = await fetch('https://opentdb.com/api.php?amount=10')
			const data = await res.json()
			setQuestions(data.results)
		}
		fetchQuestions()
	}, [])

	function displayQuizz() {
		setIntroPage(prevState => !prevState)
	}

	return (
		<>
			{introPage ? (
				<IntroPage displayQuizz={displayQuizz} />
			) : (
				<Quizz questions={questions} />
			)}
		</>
	)
}

export default App
