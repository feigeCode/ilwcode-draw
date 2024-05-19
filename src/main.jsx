import ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.jsx";
import zh_CN from 'antd/locale/zh_CN';
import "./index.css";
import "./i18n/i18n.js";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider locale={zh_CN}>
    <App />
    <Analytics />
  </ConfigProvider>,
);
