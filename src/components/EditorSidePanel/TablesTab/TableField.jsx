import { Action, ObjectType, sqlDataTypes } from "../../../data/constants";
import { Row, Col, Input, Button, Popover, Select } from "@douyinfe/semi-ui";
import { IconMore, IconKeyStroked, IconArrowDown, IconArrowUp } from "@douyinfe/semi-icons";
import { getSize, hasCheck, hasPrecision, isSized } from "../../../utils/toSQL";
import { useTables, useTypes, useUndoRedo } from "../../../hooks";
import { useState } from "react";
import FieldDetails from "./FieldDetails";
import { useTranslation } from "react-i18next";

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
              <IconArrowUp />
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
              <IconArrowDown />
            </a>
          </Col>
        }
        <Col span={10}>
          <Input
            value={data.name}
            validateStatus={data.name === "" ? "error" : "default"}
            placeholder="Name"
            onChange={(value) => updateField(tid, index, { name: value })}
            onFocus={(e) => setEditField({ name: e.target.value })}
            onBlur={(e) => {
              if (e.target.value === editField.name) return;
              setUndoStack((prev) => [
                ...prev,
                {
                  action: Action.EDIT,
                  element: ObjectType.TABLE,
                  component: "field",
                  tid: tid,
                  fid: index,
                  undo: editField,
                  redo: { name: e.target.value },
                  message: t("edit_table", {
                    tableName: tables[tid].name,
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
            optionList={[
              ...sqlDataTypes.map((value) => ({
                label: value,
                value: value,
              })),
              ...types.map((type) => ({
                label: type.name.toUpperCase(),
                value: type.name.toUpperCase(),
              })),
            ]}
            showArrow={false}
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
