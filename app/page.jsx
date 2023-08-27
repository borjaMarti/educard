import Image from "next/image";

const HomePage = async () => {
  return (
    <main className="home-main">
      <section className="hero">
        <Image
          src="/hero.svg"
          alt="Chica estudiando."
          height={0}
          width={0}
          style={{ width: "100%", height: "auto", maxWidth: "30rem" }}
        />
        <h1>Welcome to Educard!</h1>
      </section>
    </main>
  );
};

export default HomePage;
