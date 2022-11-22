import React, { useContext, useState, useEffect } from 'react'
import { NoteItem } from '../Notes/NoteItem'
import { AnimatePresence } from 'framer-motion'
import classes from './Notes.module.scss'
import empty from '../../img/empty.svg'
import { NotesContext } from '../../context/NoteContext'
import { NotePagination } from '../Pagination/Pagination'
import { FilterPopup } from '../Filter/FilterPopup'
import { Note } from '../../types/NoteType'
import { useSearchParams, Link } from 'react-router-dom'
import { MainButton } from '../UI/MainButton'
import { Heading } from '../UI/Heading'
import { SearchBar } from '../UI/SearchBar'
import { sliderSettings } from '../../constants/sliderSettings'
import { SecondaryButton } from './../UI/SecondaryButton'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export const Notes = () => {
	const { notes, trashNotes, removeAll } = useContext(NotesContext)
	const [currentPage, setCurrentPage] = useState(1)
	const [notesPerPage] = useState(4)

	const paginate = (event: React.ChangeEvent<unknown>, pageNumber: number) => setCurrentPage(pageNumber)
	const indexOfLastNote = currentPage * notesPerPage
	const indexOfFirstNote = indexOfLastNote - notesPerPage

	const [search] = useSearchParams()
	const sort = search.get('sort')
	const searchValue = search.get('search')
	const [view, setView] = useSearchParams()
	const viewValue = view.get('view')
	const viewCondition = viewValue === 'grid'

	const onViewToggle = () => {
		if (!viewCondition) {
			view.set('view', 'grid')
			setView(view, {
				replace: true,
			})
		} else {
			view.set('view', 'carousel')
			setView(view, {
				replace: true,
			})
		}
	}

	const sortedNotes = (notes: Note[]) => {
		return notes.sort((a, b) => {
			const { favourite, descLength, id } = a
			const { favourite: favouriteB, descLength: descLengthB, id: id2 } = b

			switch (sort) {
				case 'favourite':
					return favourite > favouriteB ? -1 : 1
				case 'longest':
					return descLength > descLengthB ? -1 : 1
				default:
					return id > id2 ? -1 : 1
			}
		})
	}

	const sortingNotes = sortedNotes(notes)
	const filteredNotes = searchValue
		? sortingNotes.filter((note) => note.title.trim().toLowerCase().includes(searchValue.toLowerCase()))
		: sortingNotes
	const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote)

	useEffect(() => {
		if (notes.length < 3) {
			view.set('view', 'grid')
			setView(view, {
				replace: true,
			})
		}
	}, [notes.length, setView, view])

	const emptyContent = (
		<div className={classes.emptyWrapper}>
			<img src={empty} alt='empty' />
			<h3 className={classes.empty}>Note list is empty</h3>

			<div className={classes.buttons}>
				{trashNotes.length ? (
					<Link to='/trash'>
						<SecondaryButton title='Check trash' />
					</Link>
				) : null}
				<Link to='/create'>
					<MainButton title='Create new' />
				</Link>
			</div>
		</div>
	)

	return (
		<div className={classes.notesModules}>
			<div className={classes.header}>
				<Heading title='Notes'>
					<span className={classes.notesLength}>{notes.length}</span>
				</Heading>
				{notes.length ? (
					<div className={classes.buttons}>
						<SearchBar disabled={!viewCondition} title='notes' />
						<FilterPopup disabled={!viewCondition} />
						{notes.length > 2 && (
							<SecondaryButton
								disabled={notes.length < 2}
								onClick={onViewToggle}
								title={viewCondition ? 'Carousel view' : 'Grid view'}
							/>
						)}
						<MainButton title='Trash all' onClick={removeAll} />
					</div>
				) : null}
			</div>

			<AnimatePresence>
				{viewCondition && (
					<ul className={classes.list}>
						{currentNotes.map((note) => {
							return (
								<NoteItem
									key={note.id}
									id={note.id}
									note={note}
									title={note.title}
									category={note.category}
									description={note.description}
									favourite={note.favourite}
								/>
							)
						})}
					</ul>
				)}

				{!viewCondition && (
					<Slider {...sliderSettings}>
						{currentNotes.map((note) => {
							return (
								<NoteItem
									key={note.id}
									id={note.id}
									note={note}
									title={note.title}
									category={note.category}
									description={note.description}
									favourite={note.favourite}
								/>
							)
						})}
					</Slider>
				)}
			</AnimatePresence>

			{!currentNotes.length && emptyContent}
			{!!currentNotes.length && viewCondition && (
				<NotePagination notesPerPage={notesPerPage} totalNotes={notes.length} paginate={paginate} />
			)}
		</div>
	)
}
