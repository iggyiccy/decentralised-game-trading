import React from "react";
import { Modal, Button, List } from "@douyinfe/semi-ui";
import { IconHelpCircle } from "@douyinfe/semi-icons";
import CalendarIcon from "../media/calendar.svg";
import ExploreIcon from "../media/explore.svg";
import PriceTagIcon from "../media/price-tag.svg";
import VerifyIcon from "../media/verified.svg";

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
        icon: (
          <img
            src={ExploreIcon}
            alt="Explore Logo"
            width="48px"
            height="48px"
          />
        ),
        title: "Explore Pre-owned Game Listing",
        content:
          "All listing on DeGame is backed by decentralised smart contract. We only charge 1% per trade in order to maintain and host the website.",
      },
      {
        icon: (
          <img src={PriceTagIcon} alt="Price Logo" width="48px" height="48px" />
        ),
        title: "List Your Pre-owned Game",
        content:
          "Post an ad on DeGame is simple. You only need to provide game details and pick a listing price, then you are good to go!",
      },
      {
        icon: (
          <img
            src={CalendarIcon}
            alt="Meetup Logo"
            width="48px"
            height="48px"
          />
        ),
        title: "Arrange Local Meetup & Trade",
        content:
          "All meetup require buyer and seller lockin security deposit to the smart contract. The smart contract is designed to be trustless.",
      },
      {
        icon: (
          <img
            src={VerifyIcon}
            alt="Verified Logo"
            width="48px"
            height="48px"
          />
        ),
        title: "Choose Trusted 3rd Party & Trade",
        content:
          "Local business can register to become a trusted trading point help keep the game in a secure location for buyer to pickup.",
      },
    ];
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
          Start Exploring
        </Button>
        <Button
          type="primary"
          theme="borderless"
          onClick={() => {
            window.open("https://www.youtube.com");
          }}
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
          width={350}
          height={700}
          bodyStyle={{ overflow: "auto" }}
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
