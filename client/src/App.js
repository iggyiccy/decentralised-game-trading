import React, { Component } from "react";
import { Typography } from "@douyinfe/semi-ui";
import { Layout, Nav, Button } from "@douyinfe/semi-ui";
import {
  IconGithubLogo,
  IconHome,
  IconSearch,
  IconInbox,
  IconBookmark,
  IconCopyAdd,
} from "@douyinfe/semi-icons";
import Info from "./components/Info";
import Notification from "./components/Notification";
import "./App.css";
import UserProfile from "./components/UserProfile";
import { Outlet } from "react-router-dom";
import GameLogo from "./media/game.svg";

class App extends Component {
  render() {
    const { Header, Footer, Sider, Content } = Layout;
    const { Text } = Typography;
    return (
      <div className="App">
        <Layout style={{ border: "1px solid var(--semi-color-border)" }}>
          <Header style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
            <div>
              <Nav mode="horizontal" defaultSelectedKeys={["Home"]}>
                <Nav.Header>
                  <img
                    alt="Logo"
                    src={GameLogo}
                    style={{ width: 40, height: 40, color: "black" }}
                  />
                </Nav.Header>
                <span
                  style={{
                    color: "var(--semi-color-text-2)",
                  }}
                >
                  <span
                    style={{
                      marginRight: "24px",
                      color: "var(--semi-color-text-0)",
                      fontWeight: "1000",
                      fontSize: "20px",
                    }}
                  >
                    DeGame
                  </span>
                </span>
                <Nav.Footer>
                  <Notification />
                  <Info />
                  <UserProfile />
                </Nav.Footer>
              </Nav>
            </div>
          </Header>
          <Layout>
            <Sider style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
              <Nav
                style={{ maxWidth: 130, height: "100%" }}
                defaultSelectedKeys={["Home"]}
                defaultIsCollapsed={true}
                items={[
                  {
                    itemKey: "Home",
                    text: "Home",
                    icon: <IconHome size="large" />,
                    link: "/",
                    // onClick: () => {
                    //   window.location.href = "/";
                    //   this.setState({
                    //     page: "Home",
                    //   });
                    // },
                  },
                  {
                    itemKey: "Search",
                    text: "Search",
                    icon: <IconSearch size="large" />,
                    link: "/search",
                    // direction user to search page
                    // onClick: () => {
                    //   window.location.href = "/search";
                    //   this.setState({
                    //     page: "Search",
                    //   });
                    // },
                  },
                  {
                    itemKey: "Create",
                    text: "Create",
                    icon: <IconCopyAdd size="large" />,
                    link: "/create",
                    // direction user to search page
                    // onClick: () => {
                    //   window.location.href = "/search";
                    //   this.setState({
                    //     page: "Search",
                    //   });
                    // },
                  },
                  {
                    itemKey: "Bookmark",
                    text: "Bookmark",
                    icon: <IconBookmark size="large" />,
                    disabled: true,
                    link: "/bookmark",
                    // onClick: () => {
                    //   window.location.href = "/bookmark";
                    //   this.setState({
                    //     page: "Bookmark",
                    //   });
                    // },
                  },
                  {
                    itemKey: "Inbox",
                    text: "Inbox",
                    icon: <IconInbox size="large" />,
                    disabled: true,
                    link: "/inbox",
                    // onClick: () => {
                    //   window.location.href = "/inbox";
                    //   this.setState({
                    //     page: "Inbox",
                    //   });
                    // },
                  },
                ]}
                footer={{
                  collapseButton: true,
                  collapseText: (collapsed?: ture) => "Collapse",
                }}
              />
            </Sider>
            <Content
              style={{
                padding: "16px",
                backgroundColor: "var(--semi-color-bg-0)",
              }}
            >
              <Outlet />
            </Content>
          </Layout>
          <Footer
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px",
              color: "var(--semi-color-text-2)",
              backgroundColor: "rgba(var(--semi-grey-0), 1)",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text type="quaternary">
                Copyright © 2021 DeGame Australia. All Rights Reserved.{" "}
              </Text>
            </span>
            <span>
              <span style={{ marginRight: "5px" }}>
                <Button
                  onClick={() => {
                    window.open(
                      "https://github.com/iggyiccy/decentralised-game-trading"
                    );
                  }}
                  theme="borderless"
                  icon={<IconGithubLogo size="large" />}
                  style={{
                    color: "var(--semi-color-text-2)",
                    marginRight: "5px",
                  }}
                />
              </span>
            </span>
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
