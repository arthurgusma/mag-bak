import Welcome from '@/components/Welcome'
import { TransactionsProvider } from '@/context/TraansactionsContext'
import { UserProvider } from '@/context/UserContext'

export default async function Home() {
  return (
    <main className="mx-20 my-10">
      <TransactionsProvider>
        <UserProvider>
          <Welcome />
        </UserProvider>
      </TransactionsProvider>
    </main>
  )
}
