import dayjs from "dayjs";
import Calendar from "./components/Calendar";
import { IconAdd } from "./components/Icon/icons/IconAdd";
import { IconEmail } from "./components/Icon/icons/IconEmail";
import Space from "./components/Space";
import "./App.css";
import Portal from "./components/Portal";

function App() {
  const content = (
    <div className="btn">
      <button>Open Portal</button>
    </div>
  );
  return (
    <div className="App">
      {/* <Calendar value={dayjs()} locale="en-US"></Calendar> */}
      <IconAdd size="40px"></IconAdd>
      <IconEmail spin></IconEmail>
      <IconEmail style={{ color: "red" }}></IconEmail>
      <div>
        <Space
          className="container"
          direction="horizontal"
          align="end"
          wrap={true}
          size={["large", "small"]}
        >
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </Space>
      </div>

      <div>
        <Portal attach="body">{content}</Portal>
      </div>
    </div>
  );
}
export default App;
