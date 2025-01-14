'use client'

import { UserContext } from '@/context/UserContext'
import { formartCurrencyToReal } from '@/helpers'
import { useContext, useState } from 'react'
import { ButtonText } from '../UI/Buttons'
import { signOut } from 'next-auth/react'
import BasicModal from '../UI/Modal'
import { TransactionForm } from '../Finance/TransactionForm'
import { TransactionSummary } from '../Finance/TransactionSummary'
import LoadingSpinner from '../UI/LoadingSpinner'
import { Button } from '@mui/material'

export default function Welcome() {
  const [modalOpen, setModalOpen] = useState(false)
  const { user } = useContext(UserContext)

  const handleOpen = () => setModalOpen(true)
  const handleClose = () => setModalOpen(false)

  return (
    <section>
      {user.displayName ? (
        <>
          <div className="md:flex justify-between">
            <div>
              <h1 className="text-xl">
                Bem-vindo ao Mag Bak,{' '}
                <span className="capitalize block md:inline">
                  {user.displayName}!
                </span>
              </h1>
              <ButtonText type="button" handleClick={signOut}>
                Sair da conta
              </ButtonText>
            </div>
            <div>
              <h1 className="text-xl">
                Saldo: {formartCurrencyToReal(user?.balance / 100)}
              </h1>
              <div className="md:flex justify-end w-full">
                <Button
                  onClick={handleOpen}
                  variant="outlined"
                  sx={{
                    color: '#A8CD89',
                    borderColor: '#A8CD89',
                    '&:hover': {
                      opacity: 0.75,
                    },
                  }}
                >
                  Novo pagamento
                </Button>
                <BasicModal
                  open={modalOpen}
                  handleOpen={handleOpen}
                  handleClose={handleClose}
                  title="Realizar pagamento"
                >
                  <TransactionForm handleClose={handleClose} />
                </BasicModal>
              </div>
            </div>
          </div>
          <TransactionSummary />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </section>
  )
}
