import React from 'react'
import Hero from '../component/Hero'
import Features from '../component/Features'

const Home = () => {
  return (
    <div className='flex flex-col gap-15 align-center'>
        <Hero />
        <Features />
    </div>
  )
}

export default Home