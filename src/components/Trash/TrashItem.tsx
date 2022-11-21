import { useContext } from 'react'
import { Note } from '../../types/NoteType'
import classes from '../Notes/NoteItem.module.scss'
import { motion } from 'framer-motion'
import { NotesContext } from '../../context/NoteContext'
import { MainButton } from '../UI/MainButton'
import { SecondaryButton } from '../UI/SecondaryButton'

type TrashItemProps = {
	note: Note
	readonly id: string
	readonly title: string
	readonly category: string
	readonly description: string
}

export const TrashItem = ({ id, note, title, category, description }: TrashItemProps) => {
	const { permRemove, undoNote } = useContext(NotesContext)

	const permRemoveNoteHandler = () => {
		permRemove(id)
	}

	const undoNoteHandler = () => {
		undoNote(id, {
			...note,
		})
	}

	return (
		<motion.li
			layout
			initial={{ x: 30, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: 30, opacity: 0 }}
			className={classes.note}>
			<div className={classes.header}>
				<h2>{title}</h2>
			</div>
			<div className={classes.content}>
				<h3>{category}</h3>
				<p>{description}</p>
			</div>
			<div className={classes.buttons}>
				<MainButton onClick={permRemoveNoteHandler} type='button' title='Delete' />

				<SecondaryButton onClick={undoNoteHandler} type='button' title='Undo' />
			</div>
		</motion.li>
	)
}
