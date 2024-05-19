import { Collapse, Button, Input } from "antd";
import { useSelect, useTables, useUndoRedo } from "../../../hooks";
import { Action, ObjectType } from "../../../data/constants";
import SearchBar from "./SearchBar";
import Empty from "../Empty";
import TableInfo from "./TableInfo";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

export default function TablesTab() {
  const { tables, addTable, updateTable } = useTables();
  const { setUndoStack, setRedoStack } = useUndoRedo();
  const [editField, setEditField] = useState({});
  const { selectedElement, setSelectedElement } = useSelect();
  const { t } = useTranslation();

  return (
    <>
      <div className="flex gap-2">
        <SearchBar tables={tables} />
        <div>
          <Button icon={<PlusOutlined />} block onClick={() => addTable()}>
            {t("add_table")}
          </Button>
        </div>
      </div>
      {tables.length === 0 ? (
        <Empty title={t("no_tables")} text={t("no_tables_text")} />
      ) : (
          <Collapse
            className="collapse-reset"
            activeKey={
              selectedElement.open && selectedElement.element === ObjectType.TABLE
                ? `${selectedElement.id}`
                : ""
            }
            onChange={(k) =>
              setSelectedElement((prev) => ({
                ...prev,
                open: true,
                id: parseInt(k),
                element: ObjectType.TABLE,
              }))
            }
            accordion
            items={tables.map((table) => {
              return {
                id:table.id,
                label: selectedElement.open && selectedElement.id === table.id ?
                  <div  id={`scroll_table_${table.id}`} key={table.id} onClick={(e) => e.stopPropagation()}>
                    <Input
                      value={table.displayName}
                      placeholder={t("name")}
                      onChange={(value) => updateTable(table.id, { displayName: value })}
                      onFocus={(e) => setEditField({ displayName: e.target.value })}
                      onBlur={(e) => {
                        if (e.target.value === editField.displayName) return;
                        setUndoStack((prev) => [
                          ...prev,
                          {
                            action: Action.EDIT,
                            element: ObjectType.TABLE,
                            component: "self",
                            tid: table.id,
                            undo: editField,
                            redo: { displayName: e.target.value },
                            message: t("edit_table", {
                              tableName: e.target.value,
                              extra: "[displayName]",
                            }),
                          },
                        ]);
                        setRedoStack([]);
                      }}
                    />
                  </div>
            :
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {table.displayName}
                  </div>,
                children: <TableInfo data={table} />
              }
            })}
          >
          </Collapse>

      )}
    </>
  );
}
