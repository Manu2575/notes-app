import { Link } from 'react-router-dom'
import header from '../img/header.svg'
import { MainButton } from '../components/UI/MainButton'
import classes from './HomeLayout.module.scss'

const HomePage = () => {
	return (
		<div className={classes.header}>
			<div className={classes.headerModules}>
				<div>
					<h1>Best notes app for everyone!</h1>
					<p>Create your first Note</p>
					<div className={classes.buttons}>
						<Link to='/create'>
							<MainButton title='Get started' />
						</Link>
					</div>
				</div>
				<img src={header} alt='header' />
			</div>
		</div>
	)
}

export default HomePage
