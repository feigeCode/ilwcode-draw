import { useState } from "react";
import {
  Input,
  Button,
  InputNumber,
  Checkbox, Row, Col, Tooltip, Badge,
} from "antd";
import { Action, ObjectType } from "../../../data/constants";
import { hasCheck, hasPrecision, isSized } from "../../../utils/toSQL";
import { useTables, useUndoRedo } from "../../../hooks";
import { useTranslation } from "react-i18next";
import { DeleteOutlined, InfoCircleOutlined, ReloadOutlined } from "@ant-design/icons";

export default function FieldDetails({ data, tid, index }) {
  const { t } = useTranslation();
  const { tables } = useTables();
  const { setUndoStack, setRedoStack } = useUndoRedo();
  const { updateField, deleteField } = useTables();
  const [editField, setEditField] = useState({});

  return (
    <div>
      <div className="flex gap-3 items-center">
        <div className="flex justify-between items-center gap-1 my-3">
          <div className="font-medium">{t("primary")}</div>
          <Checkbox
            value="primary"
            checked={data.primary}
            onChange={(checkedValues) => {
              setUndoStack((prev) => [
                ...prev,
                {
                  action: Action.EDIT,
                  element: ObjectType.TABLE,
                  component: "field",
                  tid: tid,
                  fid: index,
                  undo: {
                    [checkedValues.target.value]: !checkedValues.target.checked,
                  },
                  redo: {
                    [checkedValues.target.value]: checkedValues.target.checked,
                  },
                  message: t("edit_table", {
                    tableName: tables[tid].name,
                    extra: "[field]",
                  }),
                },
              ]);
              setRedoStack([]);
              updateField(tid, index, { primary: !data.primary });
              setRedoStack([]);
              updateField(tid, index, {
                increment: !data.increment,
                check: data.increment ? data.check : "",
              });
            }}
          />
        </div>
        <div className="flex justify-between items-center gap-1 my-3">
          <div className="font-medium">{t("not_null")}</div>
          <Checkbox
            value="notNull"
            checked={data.notNull}
            onChange={(checkedValues) => {
              setUndoStack((prev) => [
                ...prev,
                {
                  action: Action.EDIT,
                  element: ObjectType.TABLE,
                  component: "field",
                  tid: tid,
                  fid: index,
                  undo: {
                    [checkedValues.target.value]: !checkedValues.target.checked,
                  },
                  redo: {
                    [checkedValues.target.value]: checkedValues.target.checked,
                  },
                  message: t("edit_table", {
                    tableName: tables[tid].name,
                    extra: "[field]",
                  }),
                },
              ]);
              setRedoStack([]);
              updateField(tid, index, { notNull: !data.notNull });
            }}
          />
        </div>
        <div className="flex justify-between items-center gap-1 my-3">
          <div className="font-medium">{t("autoincrement")}</div>
          <Checkbox
            value="increment"
            checked={data.increment}
            disabled={
              !(
                data.type === "INT" ||
                data.type === "BIGINT" ||
                data.type === "SMALLINT"
              )
            }
            onChange={(checkedValues) => {
              setUndoStack((prev) => [
                ...prev,
                {
                  action: Action.EDIT,
                  element: ObjectType.TABLE,
                  component: "field",
                  tid: tid,
                  fid: index,
                  undo: {
                    [checkedValues.target.value]: !checkedValues.target.checked,
                  },
                  redo: {
                    [checkedValues.target.value]: checkedValues.target.checked,
                  },
                  message: t("edit_table", {
                    tableName: tables[tid].name,
                    extra: "[field]",
                  }),
                },
              ]);
              setRedoStack([]);
              updateField(tid, index, {
                increment: !data.increment,
                check: data.increment ? data.check : "",
              });
            }}
          />
        </div>
        <div className="flex justify-between items-center gap-1 my-3">
          <div className="font-medium">{t("unique")}</div>
          <Checkbox
            value="unique"
            checked={data.unique}
            onChange={(checkedValues) => {
              setUndoStack((prev) => [
                ...prev,
                {
                  action: Action.EDIT,
                  element: ObjectType.TABLE,
                  component: "field",
                  tid: tid,
                  fid: index,
                  undo: {
                    [checkedValues.target.value]: !checkedValues.target.checked,
                  },
                  redo: {
                    [checkedValues.target.value]: checkedValues.target.checked,
                  },
                },
              ]);
              setRedoStack([]);
              updateField(tid, index, {
                [checkedValues.target.value]: checkedValues.target.checked,
              });
            }}
          />
        </div>
      </div>
      <Row gutter={4}>
        <Col span={5}>
          <div className="font-semibold pt-[6px]">{t("字段名")}</div>
        </Col>
        <Col span={15}>
          <Input
            value={data.name}
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
        <Col span={4}>
          <Button title={t('换一个')} icon={<ReloadOutlined />}></Button>
        </Col>
      </Row>
      <Row gutter={4}>
        <Col span={5} className="pt-[14px]">
          <div className="font-semibold">{t("default_value")}</div>
        </Col>
        <Col span={19}>
          <Input
            className="my-2"
            placeholder={t("default_value")}
            value={data.default}
            disabled={
              data.type === "BLOB" ||
              data.type === "JSON" ||
              data.type === "TEXT" ||
              data.type === "UUID" ||
              data.increment
            }
            onChange={(value) => updateField(tid, index, { default: value })}
            onFocus={(e) => setEditField({ default: e.target.value })}
            onBlur={(e) => {
              if (e.target.value === editField.default) return;
              setUndoStack((prev) => [
                ...prev,
                {
                  action: Action.EDIT,
                  element: ObjectType.TABLE,
                  component: "field",
                  tid: tid,
                  fid: index,
                  undo: editField,
                  redo: { default: e.target.value },
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
      </Row>

      {(data.type === "ENUM" || data.type === "SET") && (
        <>
          <Row gutter={4}>
            <Col span={5} className="pt-[14px]">
              <div className="font-semibold mb-1">
                {t("values")}
              </div>
            </Col>
            <Col span={19}>
              {/*<TagInput*/}
              {/*  separator={[",", ", ", " ,"]}*/}
              {/*  value={data.values}*/}
              {/*  validateStatus={*/}
              {/*    !data.values || data.values.length === 0 ? "error" : "default"*/}
              {/*  }*/}
              {/*  addOnBlur*/}
              {/*  className="my-2"*/}
              {/*  placeholder={t("use_for_batch_input")}*/}
              {/*  onChange={(v) => updateField(tid, index, { values: v })}*/}
              {/*  onFocus={() => setEditField({ values: data.values })}*/}
              {/*  onBlur={() => {*/}
              {/*    if (*/}
              {/*      JSON.stringify(editField.values) === JSON.stringify(data.values)*/}
              {/*    )*/}
              {/*      return;*/}
              {/*    setUndoStack((prev) => [*/}
              {/*      ...prev,*/}
              {/*      {*/}
              {/*        action: Action.EDIT,*/}
              {/*        element: ObjectType.TABLE,*/}
              {/*        component: "field",*/}
              {/*        tid: tid,*/}
              {/*        fid: index,*/}
              {/*        undo: editField,*/}
              {/*        redo: { values: data.values },*/}
              {/*        message: t("edit_table", {*/}
              {/*          tableName: tables[tid].name,*/}
              {/*          extra: "[field]",*/}
              {/*        }),*/}
              {/*      },*/}
              {/*    ]);*/}
              {/*    setRedoStack([]);*/}
              {/*  }}*/}
              {/*/>*/}
            {/*  TODO TagInput*/}
            </Col>
          </Row>
        </>
      )}
      {isSized(data.type) && (
        <>
          <Row gutter={4}>
            <Col span={5} className="pt-[14px]">
              <div className="font-semibold">{t("size")}</div>
            </Col>
            <Col span={19}>
              <InputNumber
                className="my-2 w-full"
                placeholder="Set length"
                value={data.size}
                onChange={(value) => updateField(tid, index, { size: value })}
                onFocus={(e) => setEditField({ size: e.target.value })}
                onBlur={(e) => {
                  if (e.target.value === editField.size) return;
                  setUndoStack((prev) => [
                    ...prev,
                    {
                      action: Action.EDIT,
                      element: ObjectType.TABLE,
                      component: "field",
                      tid: tid,
                      fid: index,
                      undo: editField,
                      redo: { size: e.target.value },
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
          </Row>
        </>
      )}
      {hasPrecision(data.type) && (
        <>
          <Row gutter={4}>
            <Col span={5} className="pt-[14px]">
              <div className="font-semibold">{t("precision")}</div>
            </Col>
            <Col span={19}>
              <Input
                className="my-2 w-full"
                placeholder={t("set_precision")}
                value={data.size}
                onChange={(value) => updateField(tid, index, { size: value })}
                onFocus={(e) => setEditField({ size: e.target.value })}
                onBlur={(e) => {
                  if (e.target.value === editField.size) return;
                  setUndoStack((prev) => [
                    ...prev,
                    {
                      action: Action.EDIT,
                      element: ObjectType.TABLE,
                      component: "field",
                      tid: tid,
                      fid: index,
                      undo: editField,
                      redo: { size: e.target.value },
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
          </Row>
        </>
      )}
      {hasCheck(data.type) && (
        <>
          <Row gutter={4}>
            <Col span={5} className="pt-[14px]">
              <Tooltip title={<div className="text-xs mt-1">{t("this_will_appear_as_is")}</div>}>
                <Badge count={<InfoCircleOutlined />} >
                  <div className="font-semibold">{t("check")}</div>
                </Badge>
              </Tooltip>

            </Col>
            <Col span={19}>
              <Input
                className="mt-2"
                placeholder={t("check")}
                value={data.check}
                disabled={data.increment}
                onChange={(value) => updateField(tid, index, { check: value })}
                onFocus={(e) => setEditField({ check: e.target.value })}
                onBlur={(e) => {
                  if (e.target.value === editField.check) return;
                  setUndoStack((prev) => [
                    ...prev,
                    {
                      action: Action.EDIT,
                      element: ObjectType.TABLE,
                      component: "field",
                      tid: tid,
                      fid: index,
                      undo: editField,
                      redo: { check: e.target.value },
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
          </Row>
        </>
      )}
      <Row gutter={4}>
        <Col span={5} className="pt-[24px]">
          <div className="font-semibold">{t("comment")}</div>
        </Col>
        <Col span={19}>
          <Input.TextArea
            className="my-2"
            placeholder={t("comment")}
            value={data.comment}
            rows={2}
            onChange={(value) => updateField(tid, index, { comment: value })}
            onFocus={(e) => setEditField({ comment: e.target.value })}
            onBlur={(e) => {
              if (e.target.value === editField.comment) return;
              setUndoStack((prev) => [
                ...prev,
                {
                  action: Action.EDIT,
                  element: ObjectType.TABLE,
                  component: "field",
                  tid: tid,
                  fid: index,
                  undo: editField,
                  redo: { comment: e.target.value },
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
      </Row>

      <Button
        icon={<DeleteOutlined />}
        type="default"
        danger
        block
        onClick={() => deleteField(data, tid)}
      >
        {t("delete")}
      </Button>
    </div>
  );
}
