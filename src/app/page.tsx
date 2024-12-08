import HomeForm from '@/components/HomeForm'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex justify-center ">
      <div className="w-80 min-h-svh place-content-center">
        <div className="display flex">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <h1 className="text-2xl">Mag Bak</h1>
        </div>
        <HomeForm />
      </div>
    </main>
  )
}
