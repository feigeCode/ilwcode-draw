import { useState, useEffect } from "react";
import { Collapse, Badge } from "antd";
import { arrayIsEqual } from "../../utils/utils";
import { getIssues } from "../../utils/issues";
import { useSettings, useTables, useTypes } from "../../hooks";
import { useTranslation } from "react-i18next";

export default function Issues() {
  const { types } = useTypes();
  const { t } = useTranslation();
  const { settings } = useSettings();
  const { tables, relationships } = useTables();
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const findIssues = async () => {
      const newIssues = getIssues({
        tables: tables,
        relationships: relationships,
        types: types,
      });

      if (!arrayIsEqual(newIssues, issues)) {
        setIssues(newIssues);
      }
    };

    findIssues();
  }, [tables, relationships, issues, types]);

  return (
    <Collapse style={{ width: "100%" }}
              items={[{
                id: "1",
                label: <Badge
                  type={issues.length > 0 ? "danger" : "primary"}
                  count={settings.strictMode ? null : issues.length}
                  overflowCount={99}
                  className="mt-1"
                >
                  <div className="pe-3 select-none">
                    <i className="fa-solid fa-triangle-exclamation me-2 text-yellow-500" />
                    {t("issues")}
                  </div>
                </Badge>,
                children: <div className="max-h-[160px] overflow-y-auto">
                  {settings.strictMode ? (
                    <div className="mb-1">{t("strict_mode_is_on_no_issues")}</div>
                  ) : issues.length > 0 ? (
                    <>
                      {issues.map((e, i) => (
                        <div key={i} className="py-2">
                          {e}
                        </div>
                      ))}
                    </>
                  ) : (
                    <div>{t("no_issues")}</div>
                  )}
                </div>,
              }]}
    />
  );
}
