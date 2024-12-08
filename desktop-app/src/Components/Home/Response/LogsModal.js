import LogDataTable from "./LogDataTable";

const LogsModal = ({ isOpen, onclose, logs, toggle }) => {
  return (
    <div style={{
      top: "1vh", left: "1vw",
      border: "1px solid white", position: "fixed", width: "98vw", height: "99vh"
    }}>
      <button onClick={onclose}>Close</button>
      <LogDataTable logs={logs} toggle={toggle} />
    </div>
  );
}
export default LogsModal;