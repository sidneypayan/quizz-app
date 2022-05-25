const API_URL = 'https://opentdb.com/api.php?amount=5'

function useAPI() {
	const getQuizzData = async options => {
		try {
			const res = await fetch(`${API_URL}${options}`)
			const data = await res.json()
			return data.results
		} catch (err) {
			console.log(err)
		}
	}

	return { getQuizzData }
}

export default useAPI
