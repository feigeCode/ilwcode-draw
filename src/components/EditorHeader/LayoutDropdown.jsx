
import { Dropdown } from "antd";
import { useLayout } from "../../hooks";
import { enterFullscreen, exitFullscreen } from "../../utils/fullscreen";
import { useTranslation } from "react-i18next";
import { CaretDownOutlined, CheckOutlined, PicCenterOutlined } from "@ant-design/icons";

export default function LayoutDropdown() {
  const { layout, setLayout } = useLayout();
  const { t } = useTranslation();

  const invertLayout = (component) =>
    setLayout((prev) => ({ ...prev, [component]: !prev[component] }));

  return (
    <Dropdown
      placement="bottomLeft"
      style={{ width: "180px" }}
      menu={{items: [
        {
          key: '1',
          icon: layout.header ? <CheckOutlined /> : <div className="px-2" />,
          label: <a
            onClick={() => invertLayout("header")}
          >
            {t("header")}
          </a>
        },
          {
            key: '2',
            icon: layout.sidebar ? <CheckOutlined /> : <div className="px-2" />,
            label: <a
              onClick={() => invertLayout("sidebar")}
            >
              {t("sidebar")}
            </a>
          },
          {
            key: '3',
            icon: <div className="px-2" />,
            label: <a
              onClick={() => {
                if (layout.fullscreen) {
                  exitFullscreen();
                } else {
                  enterFullscreen();
                }
                invertLayout("fullscreen");
              }}
            >
              {t("fullscreen")}
            </a>
          }
        ]}}
      trigger="click"
    >
      <div className="py-1 px-2 hover-2 rounded flex items-center justify-center">
        <PicCenterOutlined />
        <div>
          <CaretDownOutlined />
        </div>
      </div>
    </Dropdown>
  );
}
