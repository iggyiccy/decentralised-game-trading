import React from "react";
import { Modal, Button } from "@douyinfe/semi-ui";
import { IconCreditCard } from "@douyinfe/semi-icons";
import { Form } from "@douyinfe/semi-ui";
import Wallet from "./Wallet";

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
  // handleSubmit(e) {
  //   e.preventDefault();
  //   // console.log(e.target[0].value);
  //   // console.log(e.target.elements.email.value);
  //   // console.log(e.target.email.value);
  //   console.log(this.inputNode.value);
  // }
  // createNewUser(e) {
  //   // e.preventDefault();
  //   // const formState = useFormState();
  //   // console.log(JSON.stringify(formState));
  //   console.log(e.target.email.value);
  //   console.log(e.target.postcode.value);
  //   console.log(e.target.about.value);
  //   console.log(e.target.newsletter.value);
  //   console.log(e.target.trade.value);
  //   console.log(e.target[0].value);
  //   // this.props.form.validateFields((err, values) => {
  //   //   if (!err) {
  //   //     console.log("Received values of form: ", values);
  //   //   }
  //   // });
  // }
  render() {
    // const emailRef = React.useRef();
    // const postcodeRef = React.useRef();
    // const aboutRef = React.useRef();
    // const newsletterRef = React.useRef();
    // const tradeRef = React.useRef();
    // async function createNewUser(e) {
    //   e.preventDefault();
    //   console.log(e.target.email.value);
    //   console.log(e.target.postcode.value);
    //   console.log(e.target.about.value);
    //   console.log(e.target.newsletter.value);
    //   console.log(e.target.trade.value);
    // }
    const btnStyle = {
      width: 240,
      margin: "4px 20px",
    };
    const footer = (
      <div style={{ textAlign: "center" }}>
        <Button
          type="primary"
          theme="solid"
          htmlType="submit"
          style={btnStyle}
          form="personal-info"
          value="Submit"
          // onClick={this.handleSubmit}
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
          maskClosable={false}
        >
          <Wallet />
          <Form
            id="personal-info"
            method="get"
            labelPosition="top"
            labelWidth="200px"
            labelAlign="left"
            style={{ paddingLeft: 30, width: 225, alignItems: "center" }}
            name="profile"
            // onSubmit={this.handleSubmit}
          >
            <input type="hidden" name="form-profile" value="profile" />
            <Form.Input
              // ref={emailRef}
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
              // ref={(node) => (this.inputNode = node)}
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
              // ref={aboutRef}
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
                  // ref={newsletterRef}
                  type="radio"
                  name="newsletter"
                  value="newsletter"
                >
                  Newsletter
                </Form.Checkbox>
                <Form.Checkbox
                  // ref={tradeRef}
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
