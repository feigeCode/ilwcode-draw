import ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.jsx";
import zh_CN from 'antd/locale/zh_CN';
import "./index.css";
import "./i18n/i18n.js";
import { ConfigProvider,theme } from "antd";


export function getAlgorithm() {
  const themeStr = localStorage.getItem("theme")
  console.log(themeStr);
  if (themeStr === 'dark'){
    return theme.darkAlgorithm;
  }else {
    return theme.defaultAlgorithm;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider locale={zh_CN} theme={{algorithm:  getAlgorithm(), cssVar: true}}>
    <App />
    <Analytics />
  </ConfigProvider>,
);
