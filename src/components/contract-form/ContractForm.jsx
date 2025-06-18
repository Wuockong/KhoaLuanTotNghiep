import React, { useState } from "react";
import { withTheme } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { Theme as MuiTheme } from "@rjsf/mui";

const Form = withTheme(MuiTheme);

// JSON Schema mặc định
const defaultJsonSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "ContractData",
  type: "object",
  properties: {
    _id: {
      type: "string",
      description: "ID duy nhất của tài liệu do MongoDB tạo.",
    },
    matching_id: { type: "string", description: "ID của matching." },
    elderly_id: { type: "string", description: "ID của elderly." },
    nurse_id: { type: "string", description: "ID của nurse." },
    contract_hash: { type: "string", description: "Hash toàn bộ terms." },
    signed_at: {
      type: "string",
      format: "date-time",
      description: "Thời gian ký hợp đồng.",
    },
    status: {
      type: "string",
      enum: ["pending", "active", "violated", "terminated"],
      description: "Trạng thái hợp đồng.",
    },
    signed_by_elderly: { type: "string", format: "date-time", nullable: true },
    signed_by_nurse: { type: "string", format: "date-time", nullable: true },
    elderly_signature: { type: "string", nullable: true },
    nurse_signature: { type: "string", nullable: true },
    effective_date: { type: "string", format: "date-time" },
    expiry_date: { type: "string", format: "date-time", nullable: true },
    created_by: { type: "string", default: "system" },
    last_modified_at: { type: "string", format: "date-time" },
    history_logs: {
      type: "array",
      items: {
        type: "object",
        properties: {
          action: { type: "string" },
          modified_by: { type: "string" },
          timestamp: { type: "string", format: "date-time" },
        },
        required: ["action", "modified_by", "timestamp"],
        additionalProperties: false,
      },
    },
    payment_details: {
      type: "object",
      properties: {
        service_level: {
          type: "string",
          enum: ["basic", "standard", "premium"],
        },
        price_per_hour: { type: "number" },
        total_hours_booked: { type: "integer" },
        deposit_amount: { type: "number" },
        remaining_payment: { type: "number" },
        nurse_share_percentage: { type: "number" },
        platform_share_percentage: { type: "number" },
        nurse_total_earnings: { type: "number" },
        platform_total_earnings: { type: "number" },
      },
      required: [
        "service_level",
        "price_per_hour",
        "total_hours_booked",
        "deposit_amount",
        "remaining_payment",
        "nurse_share_percentage",
        "platform_share_percentage",
        "nurse_total_earnings",
        "platform_total_earnings",
      ],
    },
    terms: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: [
    "_id",
    "matching_id",
    "elderly_id",
    "nurse_id",
    "contract_hash",
    "signed_at",
    "status",
    "effective_date",
    "created_by",
    "last_modified_at",
    "payment_details",
    "terms",
  ],
  additionalProperties: false,
};

// UI Schema
const defaultUiSchema = {
  status: {
    "ui:widget": "radio",
  },
  signed_at: {
    "ui:widget": "alt-datetime",
  },
  signed_by_elderly: {
    "ui:widget": "alt-datetime",
  },
  signed_by_nurse: {
    "ui:widget": "alt-datetime",
  },
  effective_date: {
    "ui:widget": "alt-datetime",
  },
  expiry_date: {
    "ui:widget": "alt-datetime",
  },
  last_modified_at: {
    "ui:widget": "alt-datetime",
  },
  payment_details: {
    service_level: {
      "ui:widget": "radio",
    },
  },
  terms: {
    "ui:options": {
      orderable: true,
    },
    items: {
      "ui:placeholder": "Nhập điều khoản...",
    },
  },
  history_logs: {
    items: {
      timestamp: {
        "ui:widget": "alt-datetime",
      },
    },
  },
};

const ContractForm = () => {
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

  const handleApplySchemas = () => {
    try {
      const parsedSchema = JSON.parse(jsonSchemaStr);
      const parsedUiSchema = JSON.parse(uiSchemaStr);
      setJsonSchema(parsedSchema);
      setUiSchema(parsedUiSchema);
      setError(null);
    } catch (err) {
      setError("❌ JSON không hợp lệ: " + err.message);
    }
  };
  // const [formData, setFormData] = useState({});
  // const [submittedData, setSubmittedData] = useState(null);

  return (
    <div style={{ padding: 24 }}>
      <h2>📄 Contract Form Editor</h2>

      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
          <h3>🛠️ JSON Schema</h3>
          <textarea
            rows={20}
            style={{ width: "100%", fontFamily: "monospace" }}
            value={jsonSchemaStr}
            onChange={(e) => setJsonSchemaStr(e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h3>🎨 UI Schema</h3>
          <textarea
            rows={20}
            style={{ width: "100%", fontFamily: "monospace" }}
            value={uiSchemaStr}
            onChange={(e) => setUiSchemaStr(e.target.value)}
          />
        </div>
      </div>

      <button onClick={handleApplySchemas}>🔄 Áp dụng schema/UI schema</button>
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

export default ContractForm;
