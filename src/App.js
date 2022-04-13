import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import IntroPage from './components/IntroPage'
import Quizz from './components/Quizz'

function App() {
	const [questions, setQuestions] = useState([])
	const [introPage, setIntroPage] = useState(true)
	const [score, setScore] = useState(0)
	const [displayScore, setDisplayScore] = useState(false)
	const [reloadGame, setReloadGame] = useState(false)

	useEffect(() => {
		const fetchQuestions = async () => {
			const res = await fetch('https://opentdb.com/api.php?amount=5')
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
							}),
					],
				}
			})

			setQuestions(allData)
		}
		fetchQuestions()
	}, [reloadGame])

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
				<IntroPage displayQuizz={displayQuizz} />
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
