import { useQuery } from '@tanstack/react-query'

const fetchExhibitions = async (limit = 10) => {
    // fetch from Sanity
}

const useExhibitions = (limit) => {
  return useQuery({
    queryKey: ['posts', limit],
    queryFn: () => fetchExhibitions(limit),
  })
}

export { fetchExhibitions, useExhibitions }
