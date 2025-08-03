import Layout from "./components/Layout";
import Player from "./components/Player";
import Dealer from "./components/Dealer";

function App() {
  return (
    <Layout>
      <main>
        <Player/>
        <Dealer/>
      </main>
    </Layout>
  );
}

export default App
