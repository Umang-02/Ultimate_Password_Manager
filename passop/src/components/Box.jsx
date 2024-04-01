import React from 'react'
import Manager from './Manager'
const Box = () => {
  return (
    <div className="bg-white p-5 mt-5 ml-[210px] w-[70vw] flex flex-col items-center">
      <div className="allitems">
        <h2 className="font-bold">All Items</h2>
      </div>
      <div className="addpassword">
        <Manager/>
      </div>
    </div>
  )
}

export default Box
