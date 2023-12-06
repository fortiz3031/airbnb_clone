'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter()

  return (   
    <p className="text-2xl text-black" >Spotacrib</p>
  )
}

export default Logo
