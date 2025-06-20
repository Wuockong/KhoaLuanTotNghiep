export default function ActionLogs({ logs }) {
  return (
    <div className="border rounded p-4">
      <h2 className="font-bold mb-2">Nhật ký hành động</h2>
      <ul className="space-y-1">
        {logs.map((log, i) => (
          <li key={i}>
            <span className="text-sm text-gray-600">
              [{new Date(log.timestamp).toLocaleString()}]
            </span>{" "}
            - <b>{log.user}</b>: {log.action}
          </li>
        ))}
      </ul>
    </div>
  );
}
