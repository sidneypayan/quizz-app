import { useEffect, useState } from 'react'
import useQuizzGame from './useQuizzGame'

function useForm() {
	const { sendUrlOptions } = useQuizzGame()

	const [apiUrl, setApiUrl] = useState('')
	const [formData, setFormData] = useState({})

	function quizzOptions(data) {
		setFormData(data)
	}

	console.log(formData)

	// CHANGE URL ON CATEGORY OR DIFFICULTY CHANGE
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

	return { quizzOptions }
}

export default useForm
