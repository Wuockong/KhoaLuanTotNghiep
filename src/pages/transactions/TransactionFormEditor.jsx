import React, { useState } from "react";
import { withTheme } from "@rjsf/core";
// import { Theme as Bootstrap4Theme } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { Theme as MuiTheme } from "@rjsf/mui";
const Form = withTheme(MuiTheme);
// const Form = withTheme(Bootstrap4Theme);

const defaultJsonSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "TransactionData",
  type: "object",
  properties: {
    _id: {
      bsonType: "objectId",
      description: "ID duy nhất của tài liệu do MongoDB tự động sinh.",
    },
    transaction_id: {
      type: "string",
      description: "ID giao dịch duy nhất (UUIDv4).",
    },
    elderly_id: {
      type: "string",
      description:
        "ID elderly thực hiện thanh toán (tham chiếu đến collection elderlies).",
    },
    nurse_id: {
      type: "string",
      description:
        "ID nurse nhận thanh toán (tham chiếu đến collection nurses và cards).",
    },
    amount: {
      type: "number",
      minimum: 0,
      description: "Số tiền thanh toán (ví dụ: VND hoặc Token unit).",
    },
    currency: {
      type: "string",
      enum: ["VND", "ETH", "USDT", "PlatformToken"],
      description: "Loại tiền tệ sử dụng trong giao dịch.",
    },
    service_type: {
      type: "string",
      enum: ["basic", "standard", "premium"],
      description: "Loại dịch vụ liên quan đến giao dịch.",
    },
    platform_fee: {
      type: "number",
      minimum: 0,
      description: "Phí nền tảng (số tiền trừ ra từ tổng số tiền).",
    },
    nurse_receive_amount: {
      type: "number",
      minimum: 0,
      description: "Số tiền thực tế nurse nhận sau khi trừ phí nền tảng.",
    },
    status: {
      type: "string",
      enum: ["pending", "completed", "failed", "cancelled"],
      description: "Trạng thái giao dịch.",
    },
    payment_method: {
      type: "string",
      enum: ["bank_transfer"],
      description: "Phương thức thanh toán (không sử dụng wallet_balance).",
    },
    created_at: {
      type: "string",
      format: "date-time",
      description: "Thời gian tạo giao dịch.",
    },
    feedback_received_at: {
      type: "string",
      format: "date-time",
      nullable: true,
    },
    updated_at: {
      type: "string",
      format: "date-time",
      description: "Thời gian cập nhật giao dịch.",
    },
    note: {
      type: "string",
      nullable: true,
      description: "Ghi chú giao dịch (ví dụ: lý do refund, lý do cancel).",
    },
    is_feedback_provided: { type: "boolean" },
    partial_release_amount: { type: "number", minimum: 0 },
    withdraw_request_id: {
      type: "string",
      nullable: true,
      description:
        "ID rút tiền liên quan (nếu có, tham chiếu đến collection withdraw_requests).",
    },
  },
  required: [
    "_id",
    "transaction_id",
    "elderly_id",
    "nurse_id",
    "amount",
    "currency",
    "service_type",
    "platform_fee",
    "nurse_receive_amount",
    "payment_method",
    "status",
    "created_at",
  ],
  additionalProperties: false,
};
const defaultUiSchema = {
  updated_at: {
    "ui:widget": "alt-datetime",
  },
  created_at: {
    "ui:widget": "alt-datetime",
  },
  feedback_received_at: {
    "ui:widget": "alt-datetime",
  },
  note: {
    "ui:widget": "textarea",
  },
  is_feedback_provided: {
    "ui:widget": "radio",
    "ui:options": {
      inline: true,
    },
  },
};
const TransactionFormEditor = () => {
  const [formData, setFormData] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const [jsonSchemaStr, setJsonSchemaStr] = useState(
    JSON.stringify(defaultJsonSchema, null, 2)
  );
  const [uiSchemaStr, setUiSchemaStr] = useState(
    JSON.stringify(defaultUiSchema, null, 2)
  );

  const [jsonSchema, setJsonSchema] = useState(defaultJsonSchema);
  const [uiSchema, setUiSchema] = useState(defaultUiSchema);
  const [error, setError] = useState(null);

  const handleApplySchema = () => {
    try {
      const parsedSchema = JSON.parse(jsonSchemaStr);
      const parsedUiSchema = JSON.parse(uiSchemaStr);
      setJsonSchema(parsedSchema);
      setUiSchema(parsedUiSchema);
      setError(null);
    } catch (err) {
      setError("❌ Lỗi JSON: " + err.message);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>🧾 Transaction Form Editor</h2>

      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <h4>📘 JSON Schema</h4>
          <textarea
            rows={20}
            style={{ width: "100%", fontFamily: "monospace" }}
            value={jsonSchemaStr}
            onChange={(e) => setJsonSchemaStr(e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h4>🎨 UI Schema</h4>
          <textarea
            rows={20}
            style={{ width: "100%", fontFamily: "monospace" }}
            value={uiSchemaStr}
            onChange={(e) => setUiSchemaStr(e.target.value)}
          />
        </div>
      </div>

      <button onClick={handleApplySchema}>🔄 Áp dụng schemas</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <hr style={{ margin: "24px 0" }} />

      <Form
        schema={jsonSchema}
        uiSchema={uiSchema}
        formData={formData}
        validator={validator}
        onChange={({ formData }) => setFormData(formData)}
        onSubmit={({ formData }) => {
          setSubmittedData(formData);
          console.log("✅ Submitted:", formData);
        }}
        onError={(errors) => console.warn("❌ Form Errors:", errors)}
      />

      {submittedData && (
        <div style={{ marginTop: 32 }}>
          <h3>📤 Dữ liệu đã submit:</h3>
          <pre style={{ background: "#f5f5f5", padding: 12 }}>
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TransactionFormEditor;
