import { IconAdd } from "./components/Icon/icons/IconAdd";
import { IconEmail } from "./components/Icon/icons/IconEmail";
import Space from "./components/Space";
import "./App.css";
import Portal from "./components/Portal";
import CopyToClipboard from "./components/CopyToClipboard";
import Watermark from "./components/Watermark";
import LazyLoad from "./components/LazyLoad";
import useHover from "./hooks/useHover";

function App() {
  const element = (hovered: boolean) => {
    return <div>Hover me! {hovered ? "Yes" : "No"}</div>;
  };
  const [hoverable, hovered] = useHover(element);
  return (
    <div className="App">
      <div>
        <LazyLoad>
          <div className="box">11111</div>
        </LazyLoad>
      </div>

      <div>
        {hoverable}
        <div>{hovered ? "Yes" : "No"}</div>
      </div>
    </div>
  );
}
export default App;
