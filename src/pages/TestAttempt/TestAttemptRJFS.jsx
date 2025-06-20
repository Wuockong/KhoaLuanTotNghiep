import React, { useState } from "react";
import { withTheme } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { Theme as MuiTheme } from "@rjsf/mui";
const Form = withTheme(MuiTheme);

const defaultSchema = {
  title: "TestAttemptData",
  type: "object",
  properties: {
    _id: { type: "string" },
    attempt_id: { type: "string" },
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          difficulty: {
            type: "string",
            enum: ["easy", "medium", "hard"],
          },
          options: {
            type: "array",
            minItems: 4,
            maxItems: 4,
            items: {
              type: "string",
            },
          },
          correct_answer: { type: "string" },
        },
        required: ["question", "difficulty", "options", "correct_answer"],
        additionalProperties: false,
      },
    },
    timestamp: { type: "string", format: "date-time" },
  },
  required: ["_id", "attempt_id", "questions", "timestamp"],
  additionalProperties: false,
};

const defaultUiSchema = {
  _id: { "ui:disabled": true },
  attempt_id: { "ui:placeholder": "Enter attempt ID" },
  timestamp: { "ui:widget": "alt-datetime" },
  questions: {
    items: {
      question: { "ui:placeholder": "Enter the question text" },
      difficulty: { "ui:widget": "radio" },
      options: {
        items: { "ui:placeholder": "Option" },
      },
      correct_answer: { "ui:placeholder": "Correct answer text" },
    },
  },
};

const TestAttemptRJFSPlayground = () => {
  const [formData, setFormData] = useState({});
  const [schemaText, setSchemaText] = useState(
    JSON.stringify(defaultSchema, null, 2)
  );
  const [uiSchemaText, setUiSchemaText] = useState(
    JSON.stringify(defaultUiSchema, null, 2)
  );
  const [parsedSchema, setParsedSchema] = useState(defaultSchema);
  const [parsedUiSchema, setParsedUiSchema] = useState(defaultUiSchema);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState("");

  const handleSchemaChange = (e) => setSchemaText(e.target.value);
  const handleUiSchemaChange = (e) => setUiSchemaText(e.target.value);

  const applySchema = () => {
    try {
      const parsed = JSON.parse(schemaText);
      setParsedSchema(parsed);
      setError("");
    } catch (err) {
      setError("Invalid JSON in Schema: " + err.message);
    }

    try {
      const parsedUI = JSON.parse(uiSchemaText);
      setParsedUiSchema(parsedUI);
      setError("");
    } catch (err) {
      setError("Invalid JSON in UI Schema: " + err.message);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">📘 RJSF Playground (Material UI)</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold">Schema</h4>
          <textarea
            className="w-full h-60 p-2 border font-mono text-sm"
            value={schemaText}
            onChange={handleSchemaChange}
          />
        </div>
        <div>
          <h4 className="font-semibold">UI Schema</h4>
          <textarea
            className="w-full h-60 p-2 border font-mono text-sm"
            value={uiSchemaText}
            onChange={handleUiSchemaChange}
          />
        </div>
      </div>

      <button
        onClick={applySchema}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        ✅ Apply Schema
      </button>

      {error && <div className="text-red-500 font-mono">{error}</div>}

      <Form
        schema={parsedSchema}
        uiSchema={parsedUiSchema}
        validator={validator}
        formData={formData}
        onChange={({ formData }) => setFormData(formData)}
        onSubmit={({ formData }) => {
          setSubmittedData(formData);
          console.log("Submitted:", formData);
        }}
        onError={(e) => console.log("Form errors", e)}
      />

      {submittedData && (
        <div>
          <h4 className="font-semibold mt-4">Submitted JSON</h4>
          <pre className="bg-gray-100 p-2">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestAttemptRJFSPlayground;
