import { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../firebase'
import { UserData } from '../../types/UserDataType'
import { ProgressBar } from '../UI/Progressbar'
import { UserItem } from './UserItem'
import classes from './UserItem.module.scss'
import { Heading } from '../UI/Heading'
import { SearchBar } from '../UI/SearchBar'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import emptyUserList from '../../img/users.svg'

export const UsersList = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [users, setUsers] = useState<UserData[]>([])
	const [search] = useSearchParams()
	const searchValue = search.get('search')

	const filteredUsers = searchValue
		? users.filter((user) => user.name.trim().toLowerCase().includes(searchValue.toLowerCase()))
		: users

	useEffect(() => {
		;(async () => {
			try {
				setIsLoading(true)
				const snapshots = await getDocs(collection(db, 'users'))
				const users: UserData[] = []

				snapshots.forEach((s) => {
					users.push(s.data() as UserData)
				})

				setUsers(users)
			} catch (err) {
				console.log(err)
				setIsLoading(false)
			}
			setIsLoading(false)
		})()
	}, [])

	const emptyUsersList = (
		<div className={classes.emptyWrapper}>
			<img src={emptyUserList} alt='empty' />
			<h2>Users list is empty</h2>
		</div>
	)

	return (
		<div className={classes.peoplesWrapper}>
			<div className={classes.header}>
				<Heading title='People' />
				<div className={classes.buttons}>
					<SearchBar title='users' />
				</div>
			</div>
			{isLoading && <ProgressBar />}
			<AnimatePresence>
				<ul className={classes.list}>
					{filteredUsers.map((user) => {
						return (
							<UserItem
								key={user.id}
								id={user.id}
								name={user.name}
								surname={user.surname}
								image={user.image}
								email={user.email}
								nick={user.nick}
							/>
						)
					})}
				</ul>

				{!filteredUsers.length && emptyUsersList}
			</AnimatePresence>
		</div>
	)
}
