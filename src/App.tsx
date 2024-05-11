import { Button } from "@mui/material";
import List from "./TodoList";
import { useState } from "react";

interface ObType {
  name: string;
  id: number;
  holat: boolean;
  vaqt: string;
}

function App() {
  const [vl, setVl] = useState<string>("");
  const [aad, setAd] = useState<boolean>(false);
  const [ob, setOb] = useState<ObType[]>(
    localStorage.getItem("mass")
      ? JSON.parse(localStorage.getItem("mass")!)
      : [
          {
            name: "Hello",
            id: Math.random() * 10 ** 100,
            holat: false,
            vaqt: "09:21  5/11/2024",
          },
        ]
  );

  const Qosh = () => {
    setVl("");
    let v = new Date();
    let vq: string =
      v.getHours() +
      ":" +
      v.getMinutes() +
      " " +
      v.getDay() +
      "/" +
      v.getMonth() +
      "/" +
      v.getFullYear();
    setOb([
      ...ob,
      { name: vl, id: Math.random() * 10 ** 100, holat: false, vaqt: vq },
    ]);
    localStorage.setItem(
      "mass",
      JSON.stringify([
        ...ob,
        { name: vl, id: Math.random() * 10 ** 100, holat: false, vaqt: vq },
      ])
    );
    setAd(false);
  };

  return (
    <main className="main">
      <h1>TODO LIST</h1>
      <div className="btns">
        <Button
          sx={{ display: "block" }}
          variant="contained"
          onClick={() => setAd(true)}
        >
          Add Task
        </Button>
        <option value="">All</option>
      </div>
      <List ob={ob} />
      <div
        className="modal"
        style={{ display: `${!aad ? "none" : "flex"}` }}
        onClick={() => setAd(false)}
      >
        <div className="md" onClick={(e) => e.stopPropagation()}>
          <input
            value={vl}
            onChange={(e) => setVl(e.target.value)}
            className="t"
            type="text"
          />
          <Button variant="contained" sx={{ width: "100px" }} onClick={Qosh}>
            Add
          </Button>
        </div>
      </div>
    </main>
  );
}

export default App;
