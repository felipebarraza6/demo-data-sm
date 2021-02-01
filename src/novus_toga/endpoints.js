import { GET } from './conifg'


export const getting_list = (variable, start_date, end_date, quantity) => {
  
  if (start_date === undefined){
      start_date = ''
  }
  if (end_date === undefined){
      end_date = ''
  }
  const request = GET(`data?variable=${variable}&start_date=${start_date}&end_date=${end_date}&qty=${quantity}`)
  return request

}
