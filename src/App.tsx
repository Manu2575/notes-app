import React, { Suspense } from 'react'
import { Route, createHashRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import { ErrorPage } from './pages/ErrorPage'
import { NotesContextProvider } from './context/NoteContext'
import { ProgressBar } from './components/UI/Progressbar'
import HomePage from './pages/HomePage'
import CreateLayout from './pages/CreatePage'
import NotesPage from './pages/NotesPage'
import TrashPage from './pages/TrashPage'
import DetailNoteLayout from './pages/DetailNotePage'
import FavouritePage from './pages/FavouritePage'

const App = () => {
	const router = createHashRouter(
		createRoutesFromElements(
			<Route path='/' element={<RootLayout />} errorElement={<ErrorPage />}>
				<Route index path='/' element={<HomePage />} />
				<Route path='/create' element={<CreateLayout />} />
				<Route path='/notes' element={<NotesPage />} />
				<Route path='/notes/:noteId' element={<DetailNoteLayout />} />
				<Route path='/trash' element={<TrashPage />} />
				<Route path='/favourite' element={<FavouritePage />} />
			</Route>
		)
	)

	return (
		<NotesContextProvider>
			<Suspense fallback={<ProgressBar />}>
				<RouterProvider router={router} />
			</Suspense>
		</NotesContextProvider>
	)
}

export default App
