import React from 'react'
import { RiGithubLine } from 'react-icons/ri'

const Github: React.FC = () => {
  return (
    <div className="fixed left-0">
      <div className="absolute w-0 h-0 border-sky-500 border-solid border-t-[64px] border-r-[64px] border-r-transparent sm:border-t-[128px] sm:border-r-[128px]">
        <a href="https://github.com/kok-s0s/vote">
          <RiGithubLine className="absolute -top-14 left-2 text-3xl text-light-200 -rotate-45 sm:-top-28 sm:left-4 sm:text-6xl" />
        </a>
      </div>
    </div>
  )
}

export default Github

