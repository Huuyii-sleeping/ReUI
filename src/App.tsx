import dayjs from "dayjs";
import Calendar from "./components/Calendar";
import { IconAdd } from "./components/Icon/icons/IconAdd";
import { IconEmail } from "./components/Icon/icons/IconEmail";
import Space from "./components/Space";

function App() {
  return (
    <div className="App">
      {/* <Calendar value={dayjs()} locale="en-US"></Calendar> */}
      <IconAdd size="40px"></IconAdd>
      <IconEmail spin></IconEmail>
      <IconEmail style={{ color: "red" }}></IconEmail>
      <div>
        <Space direction="vertical" align="end">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </Space>
      </div>
    </div>
  );
}
export default App;
