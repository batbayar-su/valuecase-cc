import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/valuecase_logo.png";
import { BlockList } from "./components/BlockList";
import { Form } from "./components/Form";
import { Ping } from "./components/Ping";
import { Spacer } from "./components/Spacer";
import { BlockBody } from "./types/block";

function App() {
  const [loading, setLoading] = useState(false);
  const [blocks, setBlocks] = useState<BlockBody[]>([]);

  const loadBlocks = async (e?: any) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get<{ blocks: BlockBody[] }>("/api/blocks");
      setBlocks(response.data.blocks);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlocks();
  }, []);

  return (
    <div className="App">
      <Spacer>
        <header>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Have fun 🐿</h1>
        </header>
      </Spacer>

      {loading ? <div>Loading</div> : <BlockList blocks={blocks} />}

      <Form loadBlocks={loadBlocks} />
    </div>
  );
}

export default App;
