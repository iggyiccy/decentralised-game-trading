import React from "react";
import { Modal, Button } from "@douyinfe/semi-ui";
import { IconCreditCard } from "@douyinfe/semi-icons";

class userProfile extends React.Component {
  constructor() {
    super();
    this.state = { visible: false };
    this.showDialog = this.showDialog.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  showDialog() {
    this.setState({
      visible: true,
    });
  }
  handleOk(e) {
    this.setState({
      visible: false,
    });
  }
  handleCancel(e) {
    this.setState({
      visible: false,
    });
  }
  render() {
    const btnStyle = {
      width: 240,
      margin: "4px 20px",
    };
    const footer = (
      <div style={{ textAlign: "center" }}>
        <Button
          type="primary"
          theme="solid"
          onClick={this.handleOk}
          style={btnStyle}
        >
          Save
        </Button>
        <Button
          type="primary"
          theme="borderless"
          onClick={this.handleOk}
          style={btnStyle}
        >
          Back
        </Button>
      </div>
    );
    return (
      <>
        <Button
          onClick={this.showDialog}
          theme="borderless"
          icon={<IconCreditCard size="large" />}
          style={{
            color: "var(--semi-color-text-2)",
            marginRight: "12px",
          }}
        />
        <Modal
          header={null}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={footer}
          width={350}
          height={700}
          bodyStyle={{ overflow: "auto" }}
        >
          <h3 style={{ textAlign: "center", fontSize: 24, margin: 40 }}>
            Username
          </h3>
        </Modal>
      </>
    );
  }
}

export default userProfile;
