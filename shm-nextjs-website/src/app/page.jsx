import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex h-full flex-col text-center justify-center items-center bg-primary">
      <h1 className="text-5xl	mt-10 text-white">
        SHM - SISTEMA DE MONITOREO DE SALUD ESTRUCTURAL
      </h1>
      <Image
        className="flex overflow-auto mt-10"
        src={require('../assets/fiuba.jpg')}
        alt={'Fiuba :D'}
      />
    </div>
  );
}
