import { Award, Search, User } from 'lucide-react'
import React from 'react'
import HeroImg01 from '../../assets/HeroImg01.png'
import CountUp from 'react-countup'

const Hero = () => {
  return (
    <div className='bg-slate-800 pt-14'>
        <div className='lg:h-[700px] max-w-7xl mx-auto flex md:flex-row flex-col gap-10 items-center'>
            {/* text section */}
            <div className='space-y-7 px-4 md:px-0'>
                <h1 className='text-4xl mt-10 md:mt-10 md:text-6xl font-extrabold text-gray-200'>Explore our <span className='text-blue-500'>25+</span> <br/> online courses for all</h1>
                <p className='text-gray-300 text-lg'>wdcjbqwi sadcvkjbfv jdvjw ijwdv  dvj dvjwvj djv dvj jslkj </p>
                <div className='inline-flex relative'>
                    <input type="text"  placeholder='Search Your Courses Here...' className='bg-gray-200 w-[350px] md:w-[450px] text-gray-800 p-4 pr-40 rounded-lg rounded-r-xl placeholder:text-gray-500' />
                    <button className='px-4 py-[14px] flex gap-1 items-center bg-blue-500 font-semibold absolute right-0 text-white rounded-r-lg text-xl'>Search<Search width={20} height={20}/></button>
                </div>
            </div>
            {/* image section */}
            <div className='flex md:h-[700px] items-end relative px-4 md:px-0'>
                <img src={HeroImg01} alt="" className='w-[500px] shadow-blue-500 drop-shadow-lg' />
                <div className='bg-slate-200 hidden md:flex gap-3 items-center rounded-md absolute top-[5%] right-0 px-4 py-2'>
                    <div className='rounded-full bg-blue-400 p-2 text-white'>
                        <User/>
                    </div>
                    <div>
                        <h2 className='font-bold text-2xl'><CountUp end={250}/>+</h2>
                        <p className='italic text-sm text-gray-600 leading-none'>Active Students</p>
                    </div>
                </div>
                <div className='bg-slate-200 hidden md:flex gap-3 items-center rounded-md absolute top-[33%] left- px-4 py-2'>
                    <div className='rounded-full bg-blue-400 p-2 text-white'>
                        <Award/>
                    </div>
                    <div>
                        <h2 className='font-bold text-2xl'><CountUp end={84}/>+</h2>
                        <p className='italic text-sm text-gray-600 leading-none'>Certified Students</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero