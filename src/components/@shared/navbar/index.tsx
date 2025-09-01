import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from "next/router"

import { setTheme } from 'reduxs/theme-redux'
import { RootState } from "store"
import { themeSite } from 'utils/constants-value'
import { firstUpperCase } from "utils/helpers"
import { NavbarStyled, DrawerStyled } from './navbar.styled'

const routerList = [
	{ routeName: 'Token Convert', pathname: '/' },
	{ routeName: 'Deeplink Generator', pathname: '/deeplink-generator' },
	{ routeName: 'Encrypt RSA', pathname: '/rsa/encrypt' },
	{ routeName: 'Decrypt RSA', pathname: '/rsa/decrypt' },
	// { routeName: 'Bridge Test', pathname: '/bridge-test' },
	// { routeName: 'Convert Text Format', pathname: '/convert-text-format' },
]

const Navbar = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const theme = useSelector((state: RootState) => state.theme.value)
	const [checked, setChecked] = useState(false)
	const [activePath, setActivePath] = useState('/')

	const onClickChangeTheme = () => {
		let newTheme
		if (theme === themeSite.dark) {
			newTheme = themeSite.light
		} else {
			newTheme = themeSite.dark
		}
		dispatch(setTheme(newTheme))
		localStorage.setItem('theme', newTheme)
	}

	useEffect(() => {
		setChecked(theme !== themeSite.dark)
	}, [theme])

	useEffect(() => {
		if (activePath !== router.pathname) {
			setActivePath(router.pathname)
		}
	}, [activePath, router.pathname])

	useEffect(() => {
		let localTheme = String(localStorage.getItem('theme'))
		if (localTheme !== themeSite.dark && localTheme !== themeSite.light) {
			localTheme = 'dracula'
		}
		dispatch(setTheme(localTheme))
	}, [])

	const navigateTo = (pathname: string) => {
		router.push(pathname)
	}

	return (
		<NavbarStyled>
			<DrawerStyled>
				<input id="my-drawer" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content">
					<label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
					</label>
				</div>
				<div className="drawer-side">
					<label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
					<ul className="menu p-0 w-80 min-h-full bg-base-200 border-natural border-r text-base-content">
						{routerList.map((item, idx) => {
							return (
								<button
									key={`route-${String(idx)}`}
									className={`btn btn-outline btn-natural border-0 text-l w-full justify-start rounded-none ${activePath === item.pathname && 'btn-active'}`}
									onClick={() => navigateTo(item.pathname)}
								>
									{item.routeName}
								</button>
							)
						})}
					</ul>
				</div>
			</DrawerStyled>
			<div>
				<p className="text-2xl">Helpers tools</p>
			</div>
			<div className="ml-auto">
				<span className="label-text mr-5 font-bold">{firstUpperCase(theme)}</span>
				<input type="checkbox" className="toggle" checked={checked} onClick={onClickChangeTheme} readOnly />
			</div>
		</NavbarStyled>
	)
}

export default Navbar