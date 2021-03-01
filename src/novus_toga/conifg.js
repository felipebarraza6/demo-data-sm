import axios from 'axios'

const BASE_URL = "https://api.tago.io"


export const INSTANCE_POLYKARPO = axios.create({
  'baseURL': BASE_URL,
  headers: {
      Authorization: 'ecebdaa0-ac3b-4e74-92e8-67b6c83bf3f8'
  }

})

export const INSTANCE_DITECO = axios.create({
  'baseURL': BASE_URL,
  headers: {
    Authorization: '3d9d4d1a-07b9-42dc-b434-66f4f0a763f1'
  }
})

export const GET_POLYKARPO = (endpoint) => {
  
  const request = INSTANCE_POLYKARPO.get(endpoint)
  return request

}

export const GET_DITECO = (endpoint) => {

  const request = INSTANCE_DITECO.get(endpoint)
  return request

}
