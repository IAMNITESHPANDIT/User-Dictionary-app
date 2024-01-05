import React from "react";
import "./loading.style.scss";

interface loadingProps {
  loading: boolean;
}
const Loading: React.FC<loadingProps> = ({ loading }) => {
  return (
    <div className="loading">
      {loading && (
        <>
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Loading;
