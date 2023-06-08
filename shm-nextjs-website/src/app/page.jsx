import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col text-center justify-center items-center bg-primary">
      <h1 className="text-5xl	mt-10 text-white">
        SHM - SISTEMA DE MONITOREO DE SALUD ESTRUCTURAL
      </h1>
      <Image
        className="flex flex-1 mt-10"
        src={require('../assets/fiuba.jpg')}
        alt={'Fiuba :D'}
      />
    </div>
  );
}
