import GraphStats from '@/ownComponents/GraphStats'
import Header from '@/ownComponents/Header'
import React from 'react'

function Dashboard() {
  return (
    <div className='w-full max-w-[80rem] mx-auto flex flex-col gap-4'>
    <GraphStats />
    {/* <Header/> */}
    {/* <GraphStats/> */}
    </div>

  )
}

export default Dashboard