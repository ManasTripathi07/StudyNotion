import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighLightText from '../components/core/HomePage/HighLightText';
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection.jsx';
import Footer from '../components/common/Footer.jsx';
import ExploreMore from '../components/core/HomePage/ExploreMore.jsx';
import ReviewSlider from "../components/common/ReviewSlider.jsx"

const Home = () => {
  return (
    <div>
      {/* Section-1 */}
      <div className='relative flex flex-col w-11/12 mx-auto text-white items-center justify-between max-w-maxContent'>

        <Link to={"/signup"}>

            <div className='group mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 
            hover:scale-90 mt-16 p-1 '>
                <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                    <p>Become an Instructor</p>
                    <FaArrowRight/>
                </div>
            </div>

        </Link>

        <div className='text-center text-4xl font-semibold mt-8'>
            Empower Your Future with
            <HighLightText text={" Coding Skills"}/>
        </div>

        <div className='w-[90%] text-center text-lg font-bold text-richblack-200 mt-4'>
            Empower Your Future with Coding Skills
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
        </div>

        <div className='flex flex-row gap-7 mt-8'>
            <CTAButton active={true} linkto={"/signup"}>
                Learn More
            </CTAButton>

            <CTAButton active={false} linkto={"/login"}>
                Book a Demo
            </CTAButton>
        </div>


        <div className='mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
            <video className='shadow-[20px_20px_rgba(255,255,255)]' muted loop autoPlay>
                <source src={Banner} type='video/mp4'/>
            </video>
        </div>

        {/* Code-Section-1 */}
        <div>
            <CodeBlocks 
                position={"lg:flex-row"}
                heading={
                    <div className='text-4xl font-semibold '>
                        Unlock your 
                        <HighLightText text={" Coding Potential "}/>
                        with our Online Courses
                    </div>
                }
                subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                ctabtn1={
                    {
                        btnText:"Try it Yourself",
                        linkto:"/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText:"Learn More",
                        linkto:"/login",
                        active: false,
                    }
                }
                codeblock={
                    `<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a>\n<ahref="three/">Three</a>\n</nav>`
                }
                codeColor={"text-yellow-200"}
                backgroundGradient={<div className="codeblock1 absolute"></div>}
            />
        </div>

        {/* Code-Section-2 */}
        <div>
            <CodeBlocks 
                position={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl font-semibold '>
                        Start
                        <HighLightText text={" Coding in seconds"}/>
                    </div>
                }
                subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                ctabtn1={
                    {
                        btnText:"Continue Lesson",
                        linkto:"/signup",
                        active: true,
                    }
                }
                
                ctabtn2={
                    {
                        btnText:"Learn More",
                        linkto:"/login",
                        active: false,
                    }
                }
                codeblock={
                    `<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a>\n<ahref="three/">Three</a>\n</nav>`
                }
                codeColor={"text-blue-200"}
                backgroundGradient={<div className="codeblock2 absolute"></div>}
            />
        </div>


        <ExploreMore/>
       
      </div>

      {/* Section-2 */}
      <div className='bg-pure-greys-5 text-richblack-700'>
        <div className='homepage_bg h-[310px]'>

            <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto'>
                <div className='h-[150px]'></div>
                <div className='flex flex-row gap-7 text-white'>
                   
                    <CTAButton  active={true} linkto={"/signup"} >
                        <div className='flex flex-row items-center gap-3'>
                            Explore Full Catalog
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                        
                    
                    <CTAButton active={false} linkto={"/login"}>
                        Learn More
                    </CTAButton>
                </div>
            </div>

        </div>

        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col  items-center gap-10'>

            <div className='flex flex-row justify-between mb-10 mt-[95px]'>

                <div className='text-4xl font-semibold w-[45%]'>
                    Get the Skills you need for a 
                    <HighLightText text={" Job that is in Demand"}/>
                </div>


                <div className='flex flex-col gap-10 w-[40%] items-start'>
                    <div className='text-[16px]'>
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                    </div>

                    <CTAButton active={true} linkto={"/signup"}>
                        <div>
                            Learn More
                        </div>
                    </CTAButton>
                </div>
            </div>

            <TimelineSection/>
            <LearningLanguageSection/>

        </div>

        

      </div>

      {/* Section-3 */}
      <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>
            <InstructorSection/>

            <h2 className='text-center text-4xl font-semibold mt-10 '>Reviews from other Learners</h2>
            {/* Review Slider code here */}
            <ReviewSlider/>

      </div>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default Home
