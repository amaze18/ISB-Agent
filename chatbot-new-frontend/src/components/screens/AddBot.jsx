import React from 'react'
import { SelectBot } from '../SelectBot'

function AddBot({onClose}) {
  return (
   <div className='w-max'>
   <SelectBot onClose={onClose}/>
   </div>
  )
}

export default AddBot