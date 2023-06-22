import { auth } from "@clerk/nextjs";

const HomePage = async () => {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});

  try {
    const res = await fetch("http://localhost:3000/api/courses", { headers: { 'Authorization': `Bearer ${bearerToken}`}});
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