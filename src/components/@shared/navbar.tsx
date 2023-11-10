import React, { useEffect, useState } from "react"
import { firstUpperCase } from "utils/helpers"
import { setTheme } from 'reducers/theme-reducer'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "../../store"
import { themeSite } from 'utils/constants-value'
// import tw from 'tailwind-styled-components'

// const DrawerStyled = tw.div`
//  drawer
//  w-auto
// `

const Navbar = () => {
    const dispatch = useDispatch()
    const theme = useSelector((state: RootState) => state.theme.value)
    const [checked, setChecked] = useState(false)

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
        let localTheme = String(localStorage.getItem('theme'))
        if (localTheme !== themeSite.dark && localTheme !== themeSite.light) {
            localTheme = 'dracula'
        }
        dispatch(setTheme(localTheme))
    }, [])

    return (
        <div className="navbar bg-base-100 flex justify-start py-5 px-16 border-b-2 shadow-xl gap-5">
            {/* <DrawerStyled>
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                    </ul>
                </div>
            </DrawerStyled> */}
            <div>
                <p className="text-2xl">Helpers tools</p>
            </div>
            <div className="ml-auto">
                <span className="label-text mr-5 font-bold">{firstUpperCase(theme)}</span>
                <input type="checkbox" className="toggle" checked={checked} onClick={onClickChangeTheme} readOnly />
            </div>
        </div>
    )
}

export default Navbar