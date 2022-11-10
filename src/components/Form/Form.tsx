import React, { useState, useContext, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './Form.module.scss'
import { Note } from '../../types/NoteType'
import { EditHistory } from '../../types/EditHistoryType'
import { NotesContext } from '../../context/NoteContext'
import { getFullDate } from '../../constants/FullDate'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useForm, SubmitHandler } from 'react-hook-form'
import { SelectChangeEvent } from '@mui/material'

type Inputs = {
	title: string
	description: string
	category: string
}

export const Form = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const [isFavourite, setIsFavourite] = useState(true)
	const [editHistory] = useState<EditHistory[]>([])
	const { addNote } = useContext(NotesContext)
	const navigate = useNavigate()
	const id = useId()
	const { fullDate } = getFullDate()

	const onSubmitForm: SubmitHandler<Inputs> = (data) => {
		const NoteObj: Note = {
			id: id,
			author: 'Mateusz',
			title: data.title,
			category: data.category,
			description: data.description,
			favourite: isFavourite,
			date: fullDate,
			descLength: data.description.length,
			editHistory: editHistory,
		}

		console.log(NoteObj)

		addNote(NoteObj)

		navigate('/notes')
	}

	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmitForm)}>
			<div className={classes.formControl}>
				<label htmlFor='title'>Title</label>
				<input id='title' type='text' {...register('title', { required: true, min: 3, max: 20 })} />
			</div>
			{errors.title && <span className={classes.errorMessage}>This field is required</span>}

			<div className={classes.formControl}>
				<label htmlFor='description'>Description</label>
				<textarea id='description' {...register('description', { required: true, min: 10, max: 50 })} />
			</div>

			<div className={classes.formControl}>
				<label htmlFor='category'>Category</label>
				<select defaultValue='Choose category' {...register('category')} id='category'>
					<option disabled value='Choose category'>
						Choose category
					</option>
					<option value={'Shopping'}>Shopping</option>
					<option value={'Traveling'}>Traveling</option>
					<option value={'Business'}>Business</option>
					<option value={'Cooking'}>Cooking</option>
				</select>
			</div>
			{errors.category && <span className={classes.errorMessage}>This field is required</span>}

			<div className={classes.formControl}>
				<FormControlLabel
					control={
						<Checkbox
							defaultChecked
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsFavourite(e.target.checked)}
						/>
					}
					label={isFavourite ? 'Is favourite' : 'Not favourite'}
				/>
			</div>

			<button type='submit'>Submit</button>
		</form>
	)
}
