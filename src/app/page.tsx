import HomeForm from '@/components/HomeForm'

export default function Home() {
  return (
    <main className="flex justify-center ">
      <div className="w-80 min-h-svh place-content-center">
        <h1 className="text-xl">Bem vindo ao Mag Bak</h1>
        <HomeForm />
      </div>
    </main>
  )
}
