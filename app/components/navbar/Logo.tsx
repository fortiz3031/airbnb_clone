'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter()

  return (
    <div
      className="text-2xl text-black font-bold "
      onClick={() => router.push("/")}
    >
      Spotacrib
    </div>   
  )
}

export default Logo
