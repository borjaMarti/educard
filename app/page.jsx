const HomePage = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/courses");
    const data = await res.json();
    console.log(data);
  } catch(err) {
    console.log(err);
  }

  return (
    <>
      <h1>TEST</h1>
    </>
  );
};

export default HomePage;