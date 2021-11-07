import React from "react";
import { Modal, Button, List } from "@douyinfe/semi-ui";
import {
  IconHelpCircle,
  IconSemiLogo,
  IconVigoLogo,
} from "@douyinfe/semi-icons";

class modalInfo extends React.Component {
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
    const data = [
      {
        icon: <IconSemiLogo style={{ fontSize: 48 }} />,
        title: "Explore Pre-owned Game Listing",
        content:
          "All listing on DeGame is backed by decentralised smart contract. We only charge 1% per trade in order to maintain and host the website.",
      },
      {
        icon: <IconVigoLogo style={{ fontSize: 48 }} />,
        title: "List Your Pre-owned Game",
        content:
          "Post an ad on DeGame is simple. You only need to provide game details and pick a listing price, then you are good to go!",
      },
      {
        icon: <IconSemiLogo style={{ fontSize: 48 }} />,
        title: "Arrange Local Meetup & Trade",
        content:
          "All meetup require buyer and seller lockin security deposit to the smart contract. The smart contract is designed to be trustless.",
      },
      {
        icon: <IconSemiLogo style={{ fontSize: 48 }} />,
        title: "Choose Trusted 3rd Party & Trade",
        content:
          "Local business can register to become a trusted trading point help keep the game in a secure location for buyer to pickup.",
      },
    ];
    const btnStyle = {
      width: 240,
      margin: "4px 50px",
    };
    const footer = (
      <div style={{ textAlign: "center" }}>
        <Button
          type="primary"
          theme="solid"
          onClick={this.handleOk}
          style={btnStyle}
        >
          Start Exploring
        </Button>
        <Button
          type="primary"
          theme="borderless"
          onClick={this.handleCancel}
          style={btnStyle}
        >
          Learn more
        </Button>
      </div>
    );
    return (
      <>
        <Button
          onClick={this.showDialog}
          theme="borderless"
          icon={<IconHelpCircle size="large" />}
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
        >
          <h3 style={{ textAlign: "center", fontSize: 24, margin: 40 }}>
            How to start trading games?
          </h3>
          <List
            dataSource={data}
            split={false}
            renderItem={(item) => (
              <List.Item
                header={item.icon}
                main={
                  <div>
                    <h6 style={{ margin: 0, fontSize: 16 }}>{item.title}</h6>
                    <p
                      style={{
                        marginTop: 4,
                        color: "var(--semi-color-text-1)",
                      }}
                    >
                      {item.content}
                    </p>
                  </div>
                }
              />
            )}
          />
        </Modal>
      </>
    );
  }
}

export default modalInfo;
