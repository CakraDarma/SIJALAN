interface postHero {
  imageUrl: string;
}

const Hero = ({ imageUrl }: postHero) => {
  const divStyle = {
    backgroundImage: `url(${imageUrl})`,
  };
  return (
    <>
      <section
        id="home"
        className={`flex flex-col justify-center items-center h-[80vh] object-cover bg-center bg-cover`}
        style={divStyle}
      >
        <h1 className="text-5xl text-center text-white max-w-[70%]">
          Dapatkan Informasi Terkini Tentang Kondisi Jalan untuk Perjalanan yang
          Lebih Aman
        </h1>
      </section>
    </>
  );
};

export default Hero;
