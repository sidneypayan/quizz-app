import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import IntroPage from './components/IntroPage'
import Quizz from './components/Quizz'

function App() {
	const [questions, setQuestions] = useState([])
	const [introPage, setIntroPage] = useState(true)
	const [count, setCount] = useState(0)
	const [isSelected, setIsSelected] = useState(false)
	console.log(questions)
	useEffect(() => {
		const fetchQuestions = async () => {
			const res = await fetch('https://opentdb.com/api.php?amount=10')
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
	}, [])

	function displayQuizz() {
		setIntroPage(prevState => !prevState)
	}

	function checkAnswer(questionId, answerId) {
		const questionToCheck = questions.find(item => item.id === questionId)
		const answerToCheck = questionToCheck.answers[0].find(
			item => item.id === answerId
		)
		answerToCheck.isCorrect === true
			? console.log('Bonne réponse')
			: console.log('Mauvaise réponse')
		console.log(questionId, answerId)

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
										: answer
								),
							],
					  }
					: question
			)
		)
	}

	// function displayScore() {
	// 	console.log(count)
	// }

	return (
		<>
			{introPage ? (
				<IntroPage displayQuizz={displayQuizz} />
			) : (
				<Quizz
					questions={questions}
					checkAnswer={checkAnswer}
					// displayScore={displayScore}
				/>
			)}
		</>
	)
}

export default App
