import { IconAdd } from "./components/Icon/icons/IconAdd";
import { IconEmail } from "./components/Icon/icons/IconEmail";
import Space from "./components/Space";
import "./App.css";
import Portal from "./components/Portal";
import CopyToClipboard from "./components/CopyToClipboard";
import Watermark from "./components/Watermark";

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

      <div>
        <CopyToClipboard text="hello world">
          <button>Copy</button>
        </CopyToClipboard>
      </div>
      <Watermark content={["测试水印", "神说要有光"]}>
        <div style={{ height: 800 }}>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
            deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
            recusandae minus, eaque, harum exercitationem esse sapiente?
            Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
            deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
            recusandae minus, eaque, harum exercitationem esse sapiente?
            Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
            deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
            recusandae minus, eaque, harum exercitationem esse sapiente?
            Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
            deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
            recusandae minus, eaque, harum exercitationem esse sapiente?
            Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
            deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
            recusandae minus, eaque, harum exercitationem esse sapiente?
            Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
            deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
            recusandae minus, eaque, harum exercitationem esse sapiente?
            Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
            deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
            recusandae minus, eaque, harum exercitationem esse sapiente?
            Eveniet, id provident!
          </p>
        </div>
      </Watermark>

      <div></div>
    </div>
  );
}
export default App;
