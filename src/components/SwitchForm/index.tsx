'use client'
import { Dispatch, SetStateAction } from 'react'
import { ButtonText } from '../UI/Buttons'

interface SwitchFormProps {
  setisSignUp: Dispatch<SetStateAction<boolean>>
  isSignUp: boolean
  buttonLabel: string
  description: string
}

export default function SwitchForm({
  setisSignUp,
  isSignUp,
  buttonLabel,
  description,
}: SwitchFormProps) {
  return (
    <div className="flex justify-center">
      <p className="mr-1 p-0">{description}</p>
      <ButtonText type="button" onClick={() => setisSignUp(!isSignUp)}>
        {buttonLabel}
      </ButtonText>
    </div>
  )
}
