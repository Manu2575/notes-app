import React, { useContext, useEffect } from 'react'
import classes from './Nav.module.scss'
import { NavLink } from 'react-router-dom'
import { NotesContext } from '../../context/NoteContext'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AddIcon from '@mui/icons-material/Add'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Backdrop } from '../UI/Backdrop'
import { NavigationLink } from '../Navigation/NavLink'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import sygnetLogo from '../../img/sygnet.svg'
import { useToggle } from '../../hooks/useToggle'

const getTheme = () => {
	const theme = localStorage.getItem('theme')
	return {
		localTheme: theme ? JSON.parse(theme) : null,
	}
}

export const Nav = () => {
	const [hiddenNav, setHiddenNav] = useToggle()
	const { notes, trashNotes, favouriteNotes } = useContext(NotesContext)
	const { localTheme: themeState } = getTheme()
	const [theme, setTheme] = useToggle(themeState)

	useEffect(() => {
		localStorage.setItem('theme', JSON.stringify(theme))

		theme ? document.body.classList.add('light-mode') : document.body.classList.remove('light-mode')
	}, [theme])

	return (
		<>
			<nav onDoubleClick={setHiddenNav} className={`${classes.nav} ${!hiddenNav ? classes.hiddenNav : ''}`}>
				<button onClick={setHiddenNav} className={`${classes.hideButton} ${!hiddenNav ? classes.toggledArrow : ''}`}>
					<ArrowForwardIcon className={`${!hiddenNav ? classes.toggledArrow : ''}`} />
				</button>
				<div className={classes.navWrapper}>
					<NavLink to='/' className={classes.logo}>
						{!hiddenNav ? (
							<img src={sygnetLogo} alt='sygnetMichalik' />
						) : (
							<div className={classes.fullLogo}>
								<img src={sygnetLogo} alt='sygnetMichalik' />
								<h2>Notes App</h2>
							</div>
						)}
					</NavLink>

					<div className={classes.links}>
						<NavigationLink
							hiddenNav={!hiddenNav}
							title='Create new'
							href='/create'
							icon={<AddIcon className={classes.icon} />}
							tooltipTitle={<Typography fontSize={11}>Create</Typography>}
						/>

						<NavigationLink
							hiddenNav={!hiddenNav}
							title='Notes'
							href='/notes'
							elementsLength={notes.length}
							icon={<FormatListBulletedIcon className={classes.icon} />}
							tooltipTitle={<Typography fontSize={11}>Notes</Typography>}
						/>

						<NavigationLink
							hiddenNav={!hiddenNav}
							title='Trash'
							href='/trash'
							elementsLength={trashNotes.length}
							icon={<DeleteOutlineIcon className={classes.icon} />}
							tooltipTitle={<Typography fontSize={11}>Trash</Typography>}
						/>

						<NavigationLink
							hiddenNav={!hiddenNav}
							title='Favourite'
							href='/favourite'
							elementsLength={favouriteNotes.length}
							icon={<FavoriteBorderIcon className={classes.icon} />}
							tooltipTitle={<Typography fontSize={11}>Favourite</Typography>}
						/>

						<FormControlLabel
							control={<Switch onClick={setTheme} checked={!theme} />}
							label={
								<Typography
									className={!hiddenNav ? classes.hiddenLinkTitle : ''}
									sx={{ color: 'var(--grey-color)', paddingLeft: '0.1rem' }}
									fontSize={17.68}>
									{theme ? 'Light mode' : 'Dark mode'}
								</Typography>
							}
						/>
					</div>
				</div>
			</nav>
			{hiddenNav && <Backdrop onHideNav={setHiddenNav} />}
		</>
	)
}
