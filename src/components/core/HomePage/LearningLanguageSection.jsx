import React from 'react'
import HighLightText from './HighLightText'
import knowyourprogress from "../../../assets/Images/Know_your_progress.png"
import comparewithothers from "../../../assets/Images/Compare_with_others.png"
import planyourlesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./Button"

const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mb-28'>
      <div className='flex flex-col gap-5 items-center'>

        <div className='text-4xl font-semibold text-center'>
            Your Swiss knife for 
            <HighLightText text={" Learning any Language"}/>
        </div>

        <div className='text-center text-richblack-600 mx-auto text-base w-[70%] font-medium'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-row items-center justify-center mt-5'>
            <img src={knowyourprogress} alt='knowyourprogress' className='object-contain -mr-32'/>
            <img src={comparewithothers} alt='comaparewithothers' className='object-contain'/>
            <img src={planyourlesson} alt='planyourlesson' className='object-contain -ml-36'/>
        </div>

        <div className='w-fit'>
            <CTAButton active={true} linkto={"/signup"}>
                <div>
                    Learn More
                </div>
            </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection
