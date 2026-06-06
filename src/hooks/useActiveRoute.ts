import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const useActiveRoute = () => {
  const router = useRouter()
  const [activePath, setActivePath] = useState(router.pathname)

  useEffect(() => {
    if (activePath !== router.pathname) {
      setActivePath(router.pathname)
    }
  }, [activePath, router.pathname])

  const navigateTo = (pathname: string) => {
    router.push(pathname)
  }

  const isActive = (pathname: string) => {
    return activePath === pathname
  }

  return {
    activePath,
    navigateTo,
    isActive,
    router
  }
}
