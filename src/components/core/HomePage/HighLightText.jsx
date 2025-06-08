import React from 'react'

const HighLightText = ({text}) => {
  return (
    <span className='font-bold bg-[linear-gradient(118.19deg,_#1FA2FF_-3.62%,_#12D8FA_50.44%,_#A6FFCB_104.51%)] bg-clip-text text-transparent
'>
        {text}
    </span>
  )
}

export default HighLightText
