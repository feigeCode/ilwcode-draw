import { useState } from "react";
import {
  Collapse,
  Input,
  Button,
  Card,
  Popover, Col, Row,
} from "antd";
import { useTables, useUndoRedo } from "../../../hooks";
import { Action, ObjectType, defaultBlue } from "../../../data/constants";
import ColorPalette from "../../ColorPicker";
import TableField from "./TableField";
import IndexDetails from "./IndexDetails";
import { useTranslation } from "react-i18next";
import FieldDetails from "./FieldDetails";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";

export default function TableInfo({ data }) {
  const { t } = useTranslation();
  const [indexActiveKey, setIndexActiveKey] = useState("");
  const { deleteTable, updateTable, updateField, setRelationships } =
    useTables();
  const { setUndoStack, setRedoStack } = useUndoRedo();
  const [editField, setEditField] = useState({});

  return (
    <div>
      <div className="flex items-center mb-2.5">
        <Row gutter={4}>
          <Col span={3} className="pt-[6px]">
            <div className="text-md font-semibold break-keep">{t("name")}:</div>
          </Col>
          <Col span={15}>
            <Input
              value={data.name}
              validateStatus={data.name === "" ? "error" : "default"}
              placeholder={t("name")}
              onChange={(value) => updateTable(data.id, { name: value })}
              onFocus={(e) => setEditField({ name: e.target.value })}
              onBlur={(e) => {
                if (e.target.value === editField.name) return;
                setUndoStack((prev) => [
                  ...prev,
                  {
                    action: Action.EDIT,
                    element: ObjectType.TABLE,
                    component: "self",
                    tid: data.id,
                    undo: editField,
                    redo: { name: e.target.value },
                    message: t("edit_table", {
                      tableName: e.target.value,
                      extra: "[name]",
                    }),
                  },
                ]);
                setRedoStack([]);
              }}
            />
          </Col>
          <Col span={6}>
            <Button title={t('换一个')} icon={<ReloadOutlined />}></Button>
          </Col>
        </Row>
      </div>
      <Collapse
        accordion
        items={data.fields.map((f,j) => {
          return {
            id: f.id,
            label: <TableField
              data={f}
              tid={data.id}
              index={j}
              hasUp={j > 0}
              hasDown={j < data.fields.length - 1}
              updateFieldIndex={(index) => {
                const a = data.fields[index];
                const b = data.fields[j];

                updateField(data.id, index, { ...b, id: index });
                updateField(data.id, j, { ...a, id: j });

                setRelationships((prev) =>
                  prev.map((e) => {
                    if (e.startTableId === data.id) {
                      if (e.startFieldId === index) {
                        return { ...e, startFieldId: j };
                      }
                      if (e.startFieldId === j) {
                        return { ...e, startFieldId: index };
                      }
                    }
                    if (e.endTableId === data.id) {
                      if (e.endFieldId === index) {
                        return { ...e, endFieldId: j };
                      }
                      if (e.endFieldId === j) {
                        return { ...e, endFieldId: index };
                      }
                    }
                    return e;
                  }),
                );
              }}
            />,
            children: <div key={"field_" + j} className="cursor-pointer">
                <div className="px-1 w-[240px] popover-theme">
                  <FieldDetails data={f} index={j} tid={data.id} />
                </div>
            </div>,
          }
        })}
      >

      </Collapse>
      {data.indices.length > 0 && (
        <Card
          styles={{ body: { padding: "4px" } }}
          style={{ marginTop: "12px", marginBottom: "12px" }}
          headerLine={false}
        >
          <Collapse
            activeKey={indexActiveKey}
            onChange={(itemKey) => setIndexActiveKey(itemKey)}
            accordion
            items={data.indices.map((idx, k) => {
              return {
                id: "1",
                label: t("indices"),
                children: <IndexDetails
                            key={"index_" + k}
                            data={idx}
                            iid={k}
                            tid={data.id}
                            fields={data.fields.map((e) => ({
                              value: e.name,
                              label: e.name,
                            }))}
                />,
              };
            })}
          >
          </Collapse>
        </Card>
      )}
      <Card
        styles={{ body: { padding: "4px" } }}
        style={{ marginTop: "12px", marginBottom: "12px" }}
        headerLine={false}
      >
        <Collapse items={[{
          id: "1",
          label: t("comment"),
          children: <Input.TextArea
            field="comment"
            value={data.comment}
            autosize
            placeholder={t("comment")}
            rows={1}
            onChange={(value) =>
              updateTable(data.id, { comment: value }, false)
            }
            onFocus={(e) => setEditField({ comment: e.target.value })}
            onBlur={(e) => {
              if (e.target.value === editField.comment) return;
              setUndoStack((prev) => [
                ...prev,
                {
                  action: Action.EDIT,
                  element: ObjectType.TABLE,
                  component: "self",
                  tid: data.id,
                  undo: editField,
                  redo: { comment: e.target.value },
                  message: t("edit_table", {
                    tableName: e.target.value,
                    extra: "[comment]",
                  }),
                },
              ]);
              setRedoStack([]);
            }}
          />
        }]}
        >
        </Collapse>
      </Card>
      <div className="flex justify-between items-center gap-1 mb-2">
        <div>
          <Popover
            content={
              <div className="popover-theme">
                <ColorPalette
                  currentColor={data.color}
                  onClearColor={() => {
                    setUndoStack((prev) => [
                      ...prev,
                      {
                        action: Action.EDIT,
                        element: ObjectType.TABLE,
                        component: "self",
                        tid: data.id,
                        undo: { color: data.color },
                        redo: { color: defaultBlue },
                        message: t("edit_table", {
                          tableName: data.name,
                          extra: "[color]",
                        }),
                      },
                    ]);
                    setRedoStack([]);
                    updateTable(data.id, { color: defaultBlue });
                  }}
                  onPickColor={(c) => {
                    setUndoStack((prev) => [
                      ...prev,
                      {
                        action: Action.EDIT,
                        element: ObjectType.TABLE,
                        component: "self",
                        tid: data.id,
                        undo: { color: data.color },
                        redo: { color: c },
                        message: t("edit_table", {
                          tableName: data.name,
                          extra: "[color]",
                        }),
                      },
                    ]);
                    setRedoStack([]);
                    updateTable(data.id, { color: c });
                  }}
                />
              </div>
            }
            trigger="click"
            position="bottomLeft"
            showArrow
          >
            <div
              className="h-[32px] w-[32px] rounded"
              style={{ backgroundColor: data.color }}
            />
          </Popover>
        </div>
        <div className="flex gap-1">
          <Button
            block
            onClick={() => {
              setIndexActiveKey("1");
              setUndoStack((prev) => [
                ...prev,
                {
                  action: Action.EDIT,
                  element: ObjectType.TABLE,
                  component: "index_add",
                  tid: data.id,
                  message: t("edit_table", {
                    tableName: data.name,
                    extra: "[add index]",
                  }),
                },
              ]);
              setRedoStack([]);
              updateTable(data.id, {
                indices: [
                  ...data.indices,
                  {
                    id: data.indices.length,
                    name: `index_${data.indices.length}`,
                    unique: false,
                    fields: [],
                  },
                ],
              });
            }}
          >
            {t("add_index")}
          </Button>
          <Button
            onClick={() => {
              setUndoStack((prev) => [
                ...prev,
                {
                  action: Action.EDIT,
                  element: ObjectType.TABLE,
                  component: "field_add",
                  tid: data.id,
                  message: t("edit_table", {
                    tableName: data.name,
                    extra: "[add field]",
                  }),
                },
              ]);
              setRedoStack([]);
              updateTable(data.id, {
                fields: [
                  ...data.fields,
                  {
                    name: "",
                    type: "",
                    default: "",
                    check: "",
                    primary: false,
                    unique: false,
                    notNull: false,
                    increment: false,
                    comment: "",
                    id: data.fields.length,
                  },
                ],
              });
            }}
            block
          >
            {t("add_field")}
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type="default"
            danger
            onClick={() => deleteTable(data.id)}
          />
        </div>
      </div>
    </div>
  );
}
