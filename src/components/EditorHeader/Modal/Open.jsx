import { db } from "../../../data/db";
import { useLiveQuery } from "dexie-react-hooks";
import { useTranslation } from "react-i18next";
import { notification } from "antd";
import { useEffect } from "react";

export default function Open({ selectedDiagramId, setSelectedDiagramId }) {
  const diagrams = useLiveQuery(() => db.diagrams.toArray());
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
    if (diagrams?.length === 0 ){
      openNotification('info', 'You have no saved diagrams.')
    }
  }, []);
  const getDiagramSize = (d) => {
    const size = JSON.stringify(d).length;
    let sizeStr;
    if (size >= 1024 && size < 1024 * 1024)
      sizeStr = (size / 1024).toFixed(1) + "KB";
    else if (size >= 1024 * 1024)
      sizeStr = (size / (1024 * 1024)).toFixed(1) + "MB";
    else sizeStr = size + "B";

    return sizeStr;
  };
  return (
    <div>
      {diagrams?.length === 0 ? (
        <></>
      ) : (
        <div className="max-h-[360px]">
          <table className="w-full text-left border-separate border-spacing-x-0">
            <thead>
              <tr>
                <th>{t("name")}</th>
                <th>{t("last_modified")}</th>
                <th>{t("size")}</th>
              </tr>
            </thead>
            <tbody>
              {diagrams?.map((d) => {
                return (
                  <tr
                    key={d.id}
                    className={`${
                      selectedDiagramId === d.id
                        ? "bg-blue-300 bg-opacity-30"
                        : "hover-1"
                    }`}
                    onClick={() => {
                      setSelectedDiagramId(d.id);
                    }}
                  >
                    <td className="py-1">
                      <i className="bi bi-file-earmark-text text-[16px] me-1 opacity-60" />
                      {d.name}
                    </td>
                    <td className="py-1">
                      {d.lastModified.toLocaleDateString() +
                        " " +
                        d.lastModified.toLocaleTimeString()}
                    </td>
                    <td className="py-1">{getDiagramSize(d)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
