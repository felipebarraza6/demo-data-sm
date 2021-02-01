import axios from 'axios'

const BASE_URL = "https://api.tago.io"

export const INSTANCE = axios.create({
  'baseURL': BASE_URL,
   headers: {
      Authorization: `91fa870b-3bef-4a2d-9310-d9775dd5797e`
   }
})

export const GET = (endpoint) => {
  
  const request = INSTANCE.get(endpoint)
  return request

}
