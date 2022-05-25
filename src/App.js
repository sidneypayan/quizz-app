import { QuizzGameProvider } from './context/QuizzGameContext'
import Home from './components/Home'

function App() {
	return (
		<QuizzGameProvider>
			<Home />
		</QuizzGameProvider>
	)
}

export default App
