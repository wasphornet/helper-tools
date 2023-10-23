import React, { useEffect, useState } from "react"
import { firstUpperCase } from "@/utils/helpers"
import { setTheme } from '@/reducers/theme-reducer'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "@/store"

const Navbar = () => {
    // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const dispatch = useDispatch()
    const theme = useSelector((state: RootState) => state.theme.value)
    const [checked, setChecked] = useState(false)

    const onClickChangeTheme = () => {
        let newTheme = 'dracula'
        if ( theme === 'dracula' ) {
            newTheme = 'garden'
        }
        dispatch(setTheme(newTheme))
    }

    useEffect(() => {
        setChecked(theme !== 'dracula')
    }, [theme])

    useEffect(() => {
        const localTheme = String(localStorage.getItem('theme')) || 'dracula'
        dispatch(setTheme(localTheme))
    }, [])

    return (
        <div className="navbar bg-base-100 flex justify-between p-5 border-b-2 shadow-xl">
            <div className="mx-5">
                <p className="text-2xl">Helpers tools</p>
            </div>
            <div className="mx-5">
                <span className="label-text mr-5 font-bold">{firstUpperCase(theme ?? '')}</span>
                <input type="checkbox" className="toggle" checked={checked} onClick={onClickChangeTheme} />
            </div>
            {/* <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </div>
            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                </button>
            </div>
            <div className="drawer">
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
            </div> */}
        </div>
    )
}

export default Navbar