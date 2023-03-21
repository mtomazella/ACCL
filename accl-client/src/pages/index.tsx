import React from 'react'

import dynamic from 'next/dynamic'

const Dashboard = dynamic(async () => (await import('./dashboard')).Dashboard, {
  ssr: false,
})

const Page = () => {
  return <Dashboard />
}

export default Page
