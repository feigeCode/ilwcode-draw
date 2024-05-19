import {
  ddbDiagramIsValid,
  jsonDiagramIsValid,
} from "../../../utils/validateSchema";
import { STATUS } from "../../../data/constants";
import { useAreas, useNotes, useTables } from "../../../hooks";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { notification,Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";


export default function ImportDiagram({ setImportData, error, setError }) {
  const { areas } = useAreas();
  const { notes } = useNotes();
  const { tables, relationships } = useTables();
  const { t } = useTranslation();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message) => {
    api.info({
      type: type,
      message: message,
      placement: 'top'
    });
  };

  const diagramIsEmpty = () => {
    return (
      tables.length === 0 &&
      relationships.length === 0 &&
      notes.length === 0 &&
      areas.length === 0
    );
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
      {contextHolder}
      <Upload.Dragger
        action="#"
        beforeUpload={({ file, fileList }) => {
          const f = fileList[0].fileInstance;
          if (!f) {
            return;
          }
          const reader = new FileReader();
          reader.onload = async (e) => {
            let jsonObject = null;
            try {
              jsonObject = JSON.parse(e.target.result);
            } catch (error) {
              setError({
                type: STATUS.ERROR,
                message: "The file contains an error.",
              });
              return;
            }
            if (f.type === "application/json") {
              if (!jsonDiagramIsValid(jsonObject)) {
                setError({
                  type: STATUS.ERROR,
                  message:
                    "The file is missing necessary properties for a diagram.",
                });
                return;
              }
            } else if (f.name.split(".").pop() === "ddb") {
              if (!ddbDiagramIsValid(jsonObject)) {
                setError({
                  type: STATUS.ERROR,
                  message:
                    "The file is missing necessary properties for a diagram.",
                });
                return;
              }
            }
            setImportData(jsonObject);
            if (diagramIsEmpty()) {
              setError({
                type: STATUS.OK,
                message: "Everything looks good. You can now import.",
              });
            } else {
              setError({
                type: STATUS.WARNING,
                message:
                  "The current diagram is not empty. Importing a new diagram will overwrite the current changes.",
              });
            }
          };
          reader.readAsText(f);

          return {
            autoRemove: false,
            fileInstance: file.fileInstance,
            status: "success",
            shouldUpload: false,
          };
        }}
        accept="application/json,.ddb"
        onRemove={() =>
          setError({
            type: STATUS.NONE,
            message: "",
          })
        }
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
        <p className="ant-upload-hint">{t("support_json_and_ddb")}</p>
      </Upload.Dragger>
    </div>
  );
}
