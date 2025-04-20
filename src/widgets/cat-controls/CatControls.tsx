import React from "react";
import styles from "./styles/cat-controls.module.scss";

interface CatControlsProps {
  enabled: boolean;
  autoRefresh: boolean;
  onToggleEnabled: () => void;
  onToggleAutoRefresh: () => void;
  onGetCat: () => void;
}

const CatControls: React.FC<CatControlsProps> = ({ enabled, autoRefresh, onToggleEnabled, onToggleAutoRefresh, onGetCat }) => {
  return (
    <div className={styles.controls}>
      <label>
        <input type="checkbox" checked={enabled} onChange={onToggleEnabled} />
        Enabled
      </label>
      <br />
      <label>
        <input type="checkbox" checked={autoRefresh} onChange={onToggleAutoRefresh} disabled={!enabled} />
        Auto-refresh every 5 second
      </label>
      <br />
      <button onClick={onGetCat} disabled={!enabled}>
        Get cat
      </button>
    </div>
  );
};
export default CatControls;