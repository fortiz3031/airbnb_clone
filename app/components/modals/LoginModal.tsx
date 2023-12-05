'use client'

import axios from "axios"
import { signIn } from "next-auth/react"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState } from "react"
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form'

import Modal from "./Modal"
import Heading from "../utils/Heading"
import Input from "../utils/inputs/Input"
import { toast } from "react-hot-toast"
import Button from "../utils/Button"
import useLoginModal from "../utils/hooks/useLoginModal"
import useRegisterModal from "../utils/hooks/useRegisterModal"
import { useRouter } from "next/navigation"

const LoginModal = () => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    signIn('credentials' , {
      ...data,
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false)

      if(callback?.ok) {
        toast.success('Logged In');
        router.refresh()
        loginModal.onClose()
      }

      if(callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal , registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4" >
        <Heading 
          title="Welcome Back"
          subtitle="Log in to your existing account"
          center
        />
        <Input 
          id="email"
          label="Email"
          disbaled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input 
          id="password"
          label="Password"
          type="password"
          disbaled={isLoading}
          register={register}
          errors={errors}
          required
        />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline
        label="Continue With Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button 
        outline
        label="Continue With Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />

      <div className="text-neutral-500 text-center mt-4 font-light ">
        <div className="justify-center flex flex-row items-center gap-2">
          <p>
            First time using Airbnb?
          </p>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>

    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal