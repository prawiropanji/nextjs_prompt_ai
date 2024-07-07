'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getProviders, signIn, signOut, useSession, ClientSafeProvider,  } from 'next-auth/react'

type Props = {}

export default function Nav({}: Props) {
    const isLoggedIn = false

    const {data:session} = useSession()

    console.log('gambar profile:', session?.user?.image)

     const [providers,setProviders] = useState<Record<string, ClientSafeProvider> | null >(null)

     const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        async function fetchProvider(){
             const response = await getProviders() 
             console.log(response)
             setProviders(response)
             
        }

        fetchProvider()
    },[])

    console.log('providers:',providers)

  return (  
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href="/" className='flex gap-2 flex-center'>
            <Image className='object-contain' width={30} height={30} alt='Promptopia logo' src="/assets/images/logo.svg"/>
            <p className='logo_text'>Propmptopia</p>
        </Link>

        {/* Desktop Navigation */}
        {session?.user ? (
                     <div className='max-sm:hidden flex gap-3'>
                     <Link href="/create-prompt" className='black_btn'>
                         Create Post
                     </Link>
                     <button onClick={() => signOut} className='outline_btn'>Sign out</button>
                     <Link href="/profile">
                         <Image width={37} height={37} className='rounded-full' src={session.user.image!!} alt="user profile"></Image>
                     </Link>
                 </div>
        ) :(
            <>
                {providers && Object.values(providers).map(provider => { 
                    return <button onClick={() => signIn(provider.id)} 
                    key={provider.id} 
                    className='black_btn'>Sign in with {provider.name}</button>
                    
                })}
            </>
            
        )}


        {/* Mobile Navigation */}
        {session?.user ? (<div className='sm:hidden flex relative'>
            <div className="flex">
            <Image onClick={() => setToggleDropdown((prevState) => !prevState)} 
            width={37} 
            height={37} 
            className='rounded-full' 
            src={session.user.image!!} alt="user profile"></Image>
            </div>
            {toggleDropdown && <div className='dropdown'>
                <Link className='dropdown_link' href="/profile">My Profile</Link>
                <Link className='dropdown_link' href="/create">Create Prompt</Link>
                <button className='black_btn w-full mt-5'>Sign Out</button>
            </div>
}
     
        </div>) : (<></>)}
   

    </nav>
  )
}