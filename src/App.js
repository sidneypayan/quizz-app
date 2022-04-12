import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import IntroPage from './components/IntroPage'
import Quizz from './components/Quizz'

function App() {
	const [questions, setQuestions] = useState([])
	const [introPage, setIntroPage] = useState(true)
	const [count, setCount] = useState(0)
	const [isSelected, setIsSelected] = useState(false)

	useEffect(() => {
		const fetchQuestions = async () => {
			const res = await fetch('https://opentdb.com/api.php?amount=10')
			let data = await res.json()

			const allData = data.results.map(item => {
				return {
					questionText: item.question,
					answers: [
						item.incorrect_answers
							.map(answer => {
								return {
									answerText: answer,
									isCorrect: false,
								}
							})
							.concat({ answerText: item.correct_answer, isCorrect: true }),
					],
				}
			})

			setQuestions(allData)
		}
		fetchQuestions()
	}, [])

	function displayQuizz() {
		setIntroPage(prevState => !prevState)
	}

	function checkAnswer(answer, id) {
		const question = questions.filter(item => item.id === id)
		if (answer === question[0].correct_answer) {
			setCount(prevCount => prevCount + 1)
		}
	}

	function toggleSelected() {
		setIsSelected(prevState => !prevState)
	}

	function displayScore() {
		console.log(count)
	}

	return (
		<>
			{introPage ? (
				<IntroPage displayQuizz={displayQuizz} />
			) : (
				<Quizz
					isSelected={isSelected}
					toggleSelected={toggleSelected}
					checkAnswer={checkAnswer}
					questions={questions}
					displayScore={displayScore}
				/>
			)}
		</>
	)
}

export default App
