import Image from 'next/image'

export default function HomePage () {
  return (
    <div className="w-full">
      <h1>SHM -  SISTEMA DE MONITOREO DE SALUD ESTRUCTURAL</h1>
      <Image className="profile-photo" src={require('../assets/fiuba.jpg')} alt={'Carlie Anglemire'}/>
    </div>
  )
}
