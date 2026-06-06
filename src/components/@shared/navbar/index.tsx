import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setTheme } from 'reduxs/theme-redux'
import { RootState } from 'store'
import { themeSite, routerList } from 'utils/constants-value'
import { firstUpperCase } from 'utils/helpers'
import { useActiveRoute } from 'hooks/useActiveRoute'
import { NavbarStyled, DrawerStyled } from './navbar.styled'

const Navbar = () => {
  const dispatch = useDispatch()
  const { activePath, navigateTo } = useActiveRoute()
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
    <NavbarStyled>
      <DrawerStyled>
        <input id='my-drawer' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content'>
          <label htmlFor='my-drawer' className='btn btn-square btn-ghost drawer-button'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block w-5 h-5 stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              ></path>
            </svg>
          </label>
        </div>
        <div className='drawer-side'>
          <label htmlFor='my-drawer' aria-label='close sidebar' className='drawer-overlay'></label>
          <ul className='menu p-0 w-80 min-h-full bg-base-200 border-natural border-r text-base-content'>
            {routerList.map((item, idx) => {
              return (
                <button
                  key={`route-${String(idx)}`}
                  className={`btn btn-outline btn-natural border-0 text-l w-full justify-start rounded-none ${
                    activePath === item.pathname && 'btn-active'
                  }`}
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
        <p className='text-2xl'>Helpers tools</p>
      </div>
      <div className='ml-auto flex items-center'>
        <label htmlFor='theme-toggle' className='label-text mr-5 font-bold cursor-pointer'>
          {firstUpperCase(theme)}
        </label>
        <input
          id='theme-toggle'
          type='checkbox'
          className='toggle'
          checked={checked}
          onChange={onClickChangeTheme}
          aria-label={`Switch to ${theme === themeSite.dark ? 'light' : 'dark'} theme`}
        />
      </div>
    </NavbarStyled>
  )
}

export default Navbar
