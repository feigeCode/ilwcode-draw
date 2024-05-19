import { Action, ObjectType, sqlDataTypes } from "../../../data/constants";
import { Row, Col, Input, Select } from "antd";
import { getSize, hasCheck, hasPrecision, isSized } from "../../../utils/toSQL";
import { useTables, useTypes, useUndoRedo } from "../../../hooks";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

export default function TableField({ data, tid, index, hasDown, hasUp, updateFieldIndex }) {
  const { updateField } = useTables();
  const { types } = useTypes();
  const { tables } = useTables();
  const { t } = useTranslation();
  const { setUndoStack, setRedoStack } = useUndoRedo();
  const [editField, setEditField] = useState({});

  return (
    <div className="flex-1" onClick={e => e.stopPropagation()}>
      <Row gutter={4} className="my-2" >
        { hasUp &&
          <Col span={hasDown && hasUp ? 2 : 4} className="hover-1  pt-[11px] hover:text-blue-600">
            <a
              title={t("move_up")}
              onClick={() => {
                  updateFieldIndex(index - 1)
              }}>
              <ArrowUpOutlined />
            </a>
          </Col>
        }
        { hasDown &&
          <Col span={hasDown && hasUp ? 2 : 4} className="hover-1 pt-[11px] hover:text-blue-600">
            <a
              title={t("move_down")}
              onClick={() => {
                updateFieldIndex(index + 1)
            }}>
              <ArrowDownOutlined />
            </a>
          </Col>
        }
        <Col span={10}>
          <Input
            value={data.displayName}
            validateStatus={data.displayName === "" ? "error" : "default"}
            placeholder="Display Name"
            onChange={(value) => updateField(tid, index, { displayName: value })}
            onFocus={(e) => setEditField({ displayName: e.target.value })}
            onBlur={(e) => {
              if (e.target.value === editField.displayName) return;
              setUndoStack((prev) => [
                ...prev,
                {
                  action: Action.EDIT,
                  element: ObjectType.TABLE,
                  component: "field",
                  tid: tid,
                  fid: index,
                  undo: editField,
                  redo: { displayName: e.target.value },
                  message: t("edit_table", {
                    tableName: tables[tid].displayName,
                    extra: "[field]",
                  }),
                },
              ]);
              setRedoStack([]);
            }}
          />
        </Col>
        <Col span={10}>
          <Select
            className="w-full"
            options={[
              ...sqlDataTypes.map((value) => ({
                label: value,
                value: value,
              })),
              ...types.map((type) => ({
                label: type.name.toUpperCase(),
                value: type.name.toUpperCase(),
              })),
            ]}
            filter
            value={data.type}
            validateStatus={data.type === "" ? "error" : "default"}
            placeholder="Type"
            onChange={(value) => {
              if (value === data.type) return;
              setUndoStack((prev) => [
                ...prev,
                {
                  action: Action.EDIT,
                  element: ObjectType.TABLE,
                  component: "field",
                  tid: tid,
                  fid: index,
                  undo: { type: data.type },
                  redo: { type: value },
                  message: t("edit_table", {
                    tableName: tables[tid].name,
                    extra: "[field]",
                  }),
                },
              ]);
              setRedoStack([]);
              const incr =
                data.increment &&
                (value === "INT" || value === "BIGINT" || value === "SMALLINT");
              if (value === "ENUM" || value === "SET") {
                updateField(tid, index, {
                  type: value,
                  default: "",
                  values: data.values ? [...data.values] : [],
                  increment: incr,
                });
              } else if (isSized(value) || hasPrecision(value)) {
                updateField(tid, index, {
                  type: value,
                  size: getSize(value),
                  increment: incr,
                });
              } else if (
                value === "BLOB" ||
                value === "JSON" ||
                value === "UUID" ||
                value === "TEXT" ||
                incr
              ) {
                updateField(tid, index, {
                  type: value,
                  increment: incr,
                  default: "",
                  size: "",
                  values: [],
                });
              } else if (hasCheck(value)) {
                updateField(tid, index, {
                  type: value,
                  check: "",
                  increment: incr,
                });
              } else {
                updateField(tid, index, {
                  type: value,
                  increment: incr,
                  size: "",
                  values: [],
                });
              }
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
