import React from "react";
import { Form, Row, Button, Typography } from "@douyinfe/semi-ui";

class Create extends React.Component {
  constructor() {
    super();
    this.state = {
      initValues: {
        name: "semi",
        business: ["hotsoon"],
        role: "ued",
        switch: true,
      },
    };
    this.getFormApi = this.getFormApi.bind(this);
  }

  getFormApi(formApi) {
    this.formApi = formApi;
  }

  render() {
    const { Input, InputNumber, Select, TextArea, Checkbox, Switch } = Form;
    const { Title, Paragraph } = Typography;
    const { initValues } = this.state;
    const style = { width: "100%" };
    const treeData = [
      {
        label: "VIC",
        value: "VIC",
        key: "0",
        children: [
          {
            label: "Melbourne",
            value: "Melbourne",
            key: "0-0",
            children: [
              {
                label: "City",
                value: "City",
                key: "0-0-0",
              },
              {
                label: "Richmond",
                value: "Richmond",
                key: "0-0-1",
              },
            ],
          },
        ],
      },
      {
        label: "NSW",
        value: "NSW",
        key: "1",
      },
      {
        label: "QLD",
        value: "QLD",
        key: "2",
      },
      {
        label: "WA",
        value: "WA",
        key: "3",
      },
      {
        label: "SA",
        value: "SA",
        key: "4",
      },
      {
        label: "NT",
        value: "NT",
        key: "5",
      },
      {
        label: "TAS",
        value: "TAS",
        key: "6",
      },
    ];

    return (
      <div className="create" style={{ display: "inline-flex", width: "75%" }}>
        <Form
          getFormApi={this.getFormApi}
          initValues={initValues}
          style={{ padding: 10, width: "100%", wordWrap: "break-word" }}
          onValueChange={(v) => console.log(v)}
        >
          <Title heading={5} style={{ marginBottom: 10 }}>
            🆕 Create a New Listing
          </Title>
          <Paragraph type="tertiary">
            {`Fill in the below informations to list your game to the DeGame marketplace. The game listing will be published under your ethereum wallet address deposit is required for each listing. Deposit amount is equal to the list price you set. Deposit will be returned to your wallet once trade completed.`}
          </Paragraph>
          <br />
          <Row>
            <Select
              field="category"
              style={style}
              label="🪧 Category"
              placeholder="Select "
            >
              <Select.Option value="Nintendo Switch">
                Nintendo Switch
              </Select.Option>
              <Select.Option value="Xbox">Xbox</Select.Option>
              <Select.Option value="Play Station">Play Station</Select.Option>
            </Select>
          </Row>
          <Row>
            <Input
              field="title"
              label="👾 What game are you selling?"
              initValue={"Animal Crossing: New Horizons"}
              style={style}
              trigger="blur"
            />
          </Row>
          <Row>
            <InputNumber
              field="price"
              label="💲 List Price ($)"
              initValue={20}
              style={style}
            />
          </Row>
          <Row>
            <Form.Cascader
              placeholder="Choose Area"
              treeData={treeData}
              field="location"
              label="🗺 Location"
              style={style}
            ></Form.Cascader>
          </Row>
          <Row>
            <TextArea
              style={{}}
              field="description"
              label="✍️ Description"
              maxCount={1000}
              initValue="do Lorem velit elit consectetur minim dolor eiusmod reprehenderit laborum excepteur consectetur consequat qui occaecat sit commodo ex commodo exercitation cillum sunt mollit amet reprehenderit amet deserunt excepteur ullamco tempor exercitation Lorem nulla aliquip mollit consectetur ut eu anim exercitation quis voluptate eu laboris voluptate elit dolore culpa non occaecat"
            />
          </Row>
          <Row>
            <Switch
              field="shipping"
              label="📦 Offer Shipping"
              style={{ marginRight: "95%" }}
            />
          </Row>
          <Checkbox value="false" field="agree" noLabel={true}>
            I agree to publicly list the item on the blockchain
          </Checkbox>
          <div style={{ marginTop: 10 }} />
          <Button type="primary" htmlType="submit" className="btn-margin-right">
            Submit
          </Button>
          <Button htmlType="reset">Reset</Button>
        </Form>
      </div>
    );
  }
}

export default Create;
