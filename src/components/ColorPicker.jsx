import { Button } from "antd";
import { tableThemes } from "../data/constants";
import { useTranslation } from "react-i18next";
import { CheckOutlined } from "@ant-design/icons";

export default function ColorPalette({
  currentColor,
  onClearColor,
  onPickColor,
}) {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex justify-between items-center p-2">
        <div className="font-medium">{t("theme")}</div>
        <Button type="default" size="small" onClick={onClearColor}>
          {t("clear")}
        </Button>
      </div>
      <hr />
      <div className="py-3 space-y-3">
        <div className="flex flex-wrap w-72 gap-y-2">
          {tableThemes.map((c) => (
            <button
              key={c}
              style={{ backgroundColor: c }}
              className="w-10 h-10 rounded-full mx-1"
              onClick={() => onPickColor(c)}
            >
              <CheckOutlined
                className="pt-1"
                style={{
                  color: currentColor === c ? "white" : c,
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
