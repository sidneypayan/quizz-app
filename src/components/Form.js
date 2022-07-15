import { useEffect, useState, useContext } from 'react'
import QuizzGameContext from '../context/QuizzGameContext'

const Form = () => {
	const { getUrlParams, toggleQuizz } = useContext(QuizzGameContext)

	const [formData, setFormData] = useState({
		category: '',
		difficulty: '',
	})

	const [urlOptions, setUrlOptions] = useState('')

	function handleChange(target) {
		const { name, value } = target
		setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
	}

	function handleSubmit(e) {
		e.preventDefault()
		getUrlParams(urlOptions)
		toggleQuizz()
	}

	useEffect(() => {
		if (formData.category && formData.difficulty) {
			setUrlOptions(
				`&category=${formData.category}&difficulty=${formData.difficulty}`
			)
		}

		if (formData.category && !formData.difficulty) {
			setUrlOptions(`&category=${formData.category}`)
		}
		if (!formData.category && formData.difficulty) {
			setUrlOptions(`&difficulty=${formData.difficulty}`)
		}
	}, [formData])

	return (
		<>
			<h1 className='home__title'>Quizzical</h1>
			<p className='home__subtitle'>Apprendre en s'amusant !</p>
			<form className='form' onSubmit={handleSubmit}>
				<label htmlFor='category'>Select Category</label>
				<select
					value={formData.category}
					name='category'
					onChange={e => handleChange(e.target)}
					id='category'>
					<option value='any'>Any Category</option>
					<option value='9'>General Knowledge</option>
					<option value='10'>Entertainment: Books</option>
					<option value='11'>Entertainment: Film</option>
					<option value='12'>Entertainment: Music</option>
					<option value='13'>Entertainment: Musicals &amp; Theatres</option>
					<option value='14'>Entertainment: Television</option>
					<option value='15'>Entertainment: Video Games</option>
					<option value='16'>Entertainment: Board Games</option>
					<option value='17'>Science &amp; Nature</option>
					<option value='18'>Science: Computers</option>
					<option value='19'>Science: Mathematics</option>
					<option value='20'>Mythology</option>
					<option value='21'>Sports</option>
					<option value='22'>Geography</option>
					<option value='23'>History</option>
					<option value='24'>Politics</option>
					<option value='25'>Art</option>
					<option value='26'>Celebrities</option>
					<option value='27'>Animals</option>
					<option value='28'>Vehicles</option>
					<option value='29'>Entertainment: Comics</option>
					<option value='30'>Science: Gadgets</option>
					<option value='31'>Entertainment: Japanese Anime &amp; Manga</option>
					<option value='32'>Entertainment: Cartoon &amp; Animations</option>
				</select>
				<label htmlFor='difficulty'>Select Difficulty</label>
				<select
					value={formData.difficulty}
					onChange={e => handleChange(e.target)}
					name='difficulty'
					id='difficulty'>
					<option value='any'>Any Difficulty</option>
					<option value='easy'>Easy</option>
					<option value='medium'>Medium</option>
					<option value='hard'>Hard</option>
				</select>
				<button className='home__btn'>Commencer le quizz</button>
			</form>
		</>
	)
}

export default Form
