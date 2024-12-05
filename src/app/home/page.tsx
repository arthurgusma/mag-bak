// import { TransactionSummary } from '@/components/Finance/TransactionSummary'
import Welcome from '@/components/Welcome'
import { UserProvider } from '@/context/UserContext'

export default async function Home() {
  return (
    <main className="min-h-svh mx-20 my-10">
      <UserProvider>
        <Welcome />
        {/* <TransactionSummary /> */}
        {/* <TransactionForm /> */}
      </UserProvider>
    </main>
  )
}
