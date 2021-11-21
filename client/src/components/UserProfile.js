import React from "react";
import { Modal, Button } from "@douyinfe/semi-ui";
import { IconCreditCard } from "@douyinfe/semi-icons";
import { Banner } from "@douyinfe/semi-ui";
import { Form } from "@douyinfe/semi-ui";
import getWeb3 from "../getWeb3";

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

  state = { web3: null, accounts: null };

  connectWallet = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Set web3, accounts to the state, and then proceed with an
      this.setState({ web3, accounts });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load wallet, please reconnect.`);
      console.error(error);
    }
  };

  render() {
    const btnStyle = {
      width: 240,
      margin: "4px 20px",
    };
    const footer = (
      <div style={{ textAlign: "center" }}>
        <Button type="primary" theme="solid" htmlType="submit" style={btnStyle}>
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

    if (!this.state.web3) {
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
            maskClosable={false}
          >
            <div style={{ textAlign: "center", marginTop: "250px" }}>
              <Banner
                type="danger"
                closeIcon={null}
                title={
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "30px",
                    }}
                  >
                    Failed to load wallet, please reconnect.
                  </div>
                }
              />
            </div>
          </Modal>
        </>
      );
    }

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
          maskClosable={false}
        >
          <h3 style={{ textAlign: "center", fontSize: 24, marginTop: 40 }}>
            {this.state.accounts[0]}
          </h3>
          <Form
            labelPosition="top"
            labelWidth="200px"
            labelAlign="left"
            style={{ paddingLeft: 30, width: 225, alignItems: "center" }}
            name="profile"
            method="post"
          >
            <input type="hidden" name="form-profile" value="profile" />
            <Form.Input
              type="email"
              name="email"
              field="input"
              label="Email address"
              trigger="blur"
              style={{ width: 200 }}
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "invaild email" },
              ]}
            />
            <Form.Input
              type="text"
              name="postcode"
              field="input"
              label="Postcode"
              trigger="blur"
              style={{ width: 200 }}
              rules={[
                { required: true, message: "Please enter your postcode" },
                { type: "string" },
                { len: 4, message: "postcode must be 4 digits" },
                // validate postcode
                // { validator: (rule, value) => value === "semi", message: "not semi" },
              ]}
            />
            <Form.TextArea
              name="about"
              style={{ width: 200 }}
              field="about"
              label="About"
            />
            <Form.CheckboxGroup
              field="notification"
              label="Notification"
              initValue={["newsletter", "trade"]}
              style={{ width: 200 }}
            >
              <div
              // style={{
              //   display: "inline-flex",
              //   alignItems: "baseline",
              //   marginBottom: -20,
              // }}
              >
                <Form.Checkbox
                  type="radio"
                  name="newsletter"
                  value="newsletter"
                >
                  Newsletter
                </Form.Checkbox>
                <Form.Checkbox
                  type="radio"
                  name="trade"
                  value="trade"
                  // style={{ paddingLeft: "10px" }}
                >
                  Trade Alert
                </Form.Checkbox>
              </div>
            </Form.CheckboxGroup>
          </Form>
        </Modal>
      </>
    );
  }
}

export default userProfile;
