import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import Home from './components/Home'
import Quizz from './components/Quizz'

function App() {
	const [questions, setQuestions] = useState([])
	const [introPage, setIntroPage] = useState(true)
	const [score, setScore] = useState(0)
	const [displayScore, setDisplayScore] = useState(false)
	const [reloadGame, setReloadGame] = useState(false)
	const [formData, setFormData] = useState({
		category: '',
		difficulty: '',
	})
	const [apiUrl, setApiUrl] = useState('https://opentdb.com/api.php?amount=5')

	console.log(apiUrl)
	console.log(questions)

	useEffect(() => {
		const fetchQuestions = async () => {
			const res = await fetch(apiUrl)
			let data = await res.json()

			const allData = data.results.map(item => {
				return {
					id: nanoid(),
					questionText: item.question,
					answers: [
						item.incorrect_answers
							.map(answer => {
								return {
									id: nanoid(),
									answerText: answer,
									isCorrect: false,
									isSelected: false,
								}
							})
							.concat({
								id: nanoid(),
								answerText: item.correct_answer,
								isCorrect: true,
								isSelected: false,
							})
							.sort((a, b) => 0.5 - Math.random()),
					],
				}
			})

			setQuestions(allData)
		}
		fetchQuestions()
	}, [reloadGame, apiUrl])

	useEffect(() => {
		if (formData.category && formData.difficulty) {
			setApiUrl(
				`https://opentdb.com/api.php?amount=5&category=${formData.category}&difficulty=${formData.difficulty}`
			)
		}

		if (formData.category && !formData.difficulty) {
			setApiUrl(
				`https://opentdb.com/api.php?amount=5&category=${formData.category}`
			)
		}
		if (!formData.category && formData.difficulty) {
			setApiUrl(
				`https://opentdb.com/api.php?amount=5&difficulty=${formData.difficulty}`
			)
		}
	}, [formData])

	function quizzOptions(name, value) {
		setFormData(prevFormData => {
			return {
				...prevFormData,
				[name]: value,
			}
		})
	}

	function displayQuizz() {
		setIntroPage(prevState => !prevState)
	}

	function toggleReloadGame() {
		setScore(0)
		setDisplayScore(prevDisplayScore => !prevDisplayScore)
		setReloadGame(prevReloadGame => !prevReloadGame)
	}

	function toggleDisplayScore() {
		setDisplayScore(prevDisplayScore => !prevDisplayScore)
	}

	function checkAnswer(questionId, answerId) {
		const questionToCheck = questions.find(item => item.id === questionId)
		const answerToCheck = questionToCheck.answers[0].find(
			item => item.id === answerId
		)
		answerToCheck.isCorrect === true && setScore(prevScore => prevScore + 1)

		setQuestions(prevQuestions =>
			prevQuestions.map(question =>
				question.id === questionId
					? {
							...question,
							answers: [
								question.answers[0].map(answer =>
									answer.id === answerId
										? {
												...answer,
												isSelected: !answer.isSelected,
										  }
										: {
												...answer,
												isSelected: false,
										  }
								),
							],
					  }
					: question
			)
		)
	}

	return (
		<>
			{introPage ? (
				<Home displayQuizz={displayQuizz} quizzOptions={quizzOptions} />
			) : (
				<Quizz
					questions={questions}
					checkAnswer={checkAnswer}
					score={score}
					toggleDisplayScore={toggleDisplayScore}
					displayScore={displayScore}
					toggleReloadGame={toggleReloadGame}
				/>
			)}
		</>
	)
}

export default App
