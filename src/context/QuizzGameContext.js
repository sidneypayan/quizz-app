import { nanoid } from 'nanoid'
import { createContext } from 'react'
import { useState, useEffect } from 'react'
import useAPI from '../hooks/useAPI'

const QuizzGameContext = createContext()

export const QuizzGameProvider = ({ children }) => {
	const { getQuizzData } = useAPI()
	const [quizzDisplayed, setQuizzDisplayed] = useState(false)
	const [quizzData, setQuizzData] = useState([])
	const [score, setScore] = useState(0)
	const [displayScore, setDisplayScore] = useState(false)
	const [urlParams, setUrlParams] = useState('')
	const [loading, setLoading] = useState(true)

	const getUrlParams = params => {
		setUrlParams(params)
	}

	const organizeQuizzData = async () => {
		let data = await getQuizzData(urlParams)
		data = data.map(item => {
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

		setQuizzData(data)
		setLoading(false)
	}

	function toggleQuizz() {
		setQuizzData([])
		setLoading(true)
		setQuizzDisplayed(prevState => !prevState)
	}

	// // CHECK IF ANSWER IS CORRECT & TOGGLE "IS SELECTED" VALUE
	function checkAnswer(questionId, answerId) {
		const questionToCheck = quizzData.find(item => item.id === questionId)
		const answerToCheck = questionToCheck.answers[0].find(
			item => item.id === answerId
		)
		answerToCheck.isCorrect === true && setScore(prevScore => prevScore + 1)

		setQuizzData(prevQuizzData =>
			prevQuizzData.map(question =>
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

	// // RELOAD QUIZZ & SET SCORE TO 0
	function toggleReloadGame() {
		setScore(0)
		setDisplayScore(prevDisplayScore => !prevDisplayScore)
	}

	// // DISPLAY SCORE SHOW ANSWERS BTN CLICK
	function toggleDisplayScore() {
		setDisplayScore(prevDisplayScore => !prevDisplayScore)
	}

	useEffect(() => {
		if (quizzDisplayed) {
			organizeQuizzData()
		}
	}, [quizzDisplayed])

	return (
		<QuizzGameContext.Provider
			value={{
				quizzData,
				score,
				displayScore,
				getUrlParams,
				toggleQuizz,
				checkAnswer,
				toggleReloadGame,
				toggleDisplayScore,
				quizzDisplayed,
				loading,
			}}>
			{children}
		</QuizzGameContext.Provider>
	)
}

export default QuizzGameContext
