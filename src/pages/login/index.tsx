import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import LoginButton from '@/components/login-button'

const inter = Inter({ subsets: ['latin'] })

export default function Login() {
  return (
    <>
     <LoginButton />
    </>
  )
}
