import ReactDOM from "react-dom/client";
import { LocaleProvider } from "@douyinfe/semi-ui";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.jsx";
import zh_CN from "@douyinfe/semi-ui/lib/es/locale/source/zh_CN";
import "./index.css";
import "./i18n/i18n.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocaleProvider locale={zh_CN}>
    <App />
    <Analytics />
  </LocaleProvider>,
);
