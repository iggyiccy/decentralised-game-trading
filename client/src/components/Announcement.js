import React, { useState } from "react";
import { Banner } from "@douyinfe/semi-ui";

function Announcement() {
  const [visible, setVisible] = useState(false);
  const changeVisible = () => {
    setVisible(!visible);
  };
  const banner = (
    <Banner
      fullMode={false}
      title="🎉 Beta version is now live on Polygon Mumbai Testnet!"
      type="info"
      bordered
      description="Please ensure your wallet is connected to the Polygon Mumbai network in order to interact with DeGame web application. Click the button below to learn how to configure and add Polygon Mumbai network to your Metamask. "
    >
      <div className="semi-modal-footer">
        <button
          onClick={() => {
            window.open(
              "https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/"
            );
          }}
          className="semi-button semi-button-tertiary semi-button-light"
          type="button"
        >
          Learn More
        </button>
        <button
          onClick={changeVisible}
          className="semi-button semi-button-primary"
          type="button"
        >
          I Understand
        </button>
      </div>
    </Banner>
  );
  return (
    <>
      {visible ? null : banner}
      <br />
    </>
  );
}

export default Announcement;
