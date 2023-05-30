import { useState } from "react";
import "./styles/index.scss";

export default function App() {
  const [data, setData] = useState({});

  const exampleObj = {
    first: "Whatever",
    second: "That so",
  };

  return (
    <>
      <section className="hero"></section>
      <main>
        <section>
          <h1>Oh Hi, React</h1>
        </section>
      </main>
      <button onClick={() => setData(exampleObj)}>Press</button>
      <ul>
        {Object.keys(data)?.map((item) => (
          <li>{data[item]}</li>
        ))}
      </ul>
    </>
  );
}
