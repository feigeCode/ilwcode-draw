import { STATUS } from "../../../data/constants";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { notification, Upload, Checkbox } from "antd";
import { InboxOutlined } from "@ant-design/icons";

export default function ImportSource({
  importData,
  setImportData,
  error,
  setError,
}) {
  const { t } = useTranslation();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message) => {
    api.info({
      type: type,
      message: message,
      placement: 'top'
    });
  };

  useEffect(() => {
    let type = "";
    if (error.type === STATUS.ERROR){
      type = "error";
    }
    if (error.type === STATUS.WARNING){
      type = "warning";
    }
    if (error.type === STATUS.OK){
      type = "success";
    }
    if (type !== ""){
      openNotification(type, error.message);
    }
  }, [error]);
  return (
    <div>
      <Upload.Dragger
        action="#"
        beforeUpload={({ file, fileList }) => {
          const f = fileList[0].fileInstance;
          if (!f) {
            return;
          }
          const reader = new FileReader();
          reader.onload = async (e) => {
            setImportData((prev) => ({ ...prev, src: e.target.result }));
          };
          reader.readAsText(f);

          return {
            autoRemove: false,
            fileInstance: file.fileInstance,
            status: "success",
            shouldUpload: false,
          };
        }}
        accept=".sql"
        onRemove={() => {
          setError({
            type: STATUS.NONE,
            message: "",
          });
          setImportData((prev) => ({ ...prev, src: "" }));
        }}
        onChange={() =>
          setError({
            type: STATUS.NONE,
            message: "",
          })
        }
        multiple={false}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">{t("drag_and_drop_files")}</p>
        <p className="ant-upload-hint">{t("upload_sql_to_generate_diagrams")}</p>
      </Upload.Dragger>
      <div>
        <div className="text-xs mb-3 mt-1 opacity-80">
          {t("only_mysql_supported")}
        </div>
        <Checkbox
          aria-label="overwrite checkbox"
          checked={importData.overwrite}
          defaultChecked
          onChange={(e) =>
            setImportData((prev) => ({
              ...prev,
              overwrite: e.target.checked,
            }))
          }
        >
          {t("overwrite_existing_diagram")}
        </Checkbox>
      </div>
    </div>
  );
}
