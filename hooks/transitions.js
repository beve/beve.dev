import { useCallback } from 'react'
import { useRouter } from 'next/router'

export function useSheetTransition(href, as) {
  const router = useRouter()
  return useCallback((e) => {
    e.preventDefault()
    router.push(href, as)
  }, [])
}