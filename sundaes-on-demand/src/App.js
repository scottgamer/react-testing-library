import SummaryForm from "./pages/summary/SummaryForm";
import Options from "./pages/entry/Options.jsx";

import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";

import { OrderDetailsProvider } from "./context/OrderDetails";

function App() {
  return (
    <>
      <Container>
        <OrderDetailsProvider>
          <OrderEntry />
          <SummaryForm />
          <Options />
          <p>Learn React</p>
        </OrderDetailsProvider>
      </Container>
    </>
  );
}

export default App;
