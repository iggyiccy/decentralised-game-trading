import React, { Component } from "react";
import { Typography } from "@douyinfe/semi-ui";
import { Layout, Nav, Button, Breadcrumb, Skeleton } from "@douyinfe/semi-ui";
import {
  IconSemiLogo,
  IconGithubLogo,
  IconHome,
  IconSearch,
  IconInbox,
  IconBookmark,
} from "@douyinfe/semi-icons";
import Info from "./components/Info";
import Notification from "./components/Notification";
import Announcement from "./components/Announcement";
import "./App.css";
import Homepage from "./components/Homepage";
import Catalogue from "./components/Catalogue";
import UserProfile from "./components/UserProfile";

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
                  <IconSemiLogo style={{ fontSize: 36 }} />
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
                    onClick: () => {
                      window.location.href = "/";
                      this.setState({
                        page: "Home",
                      });
                    },
                  },
                  {
                    itemKey: "Search",
                    text: "Search",
                    icon: <IconSearch size="large" />,
                    // direction user to search page
                    onClick: () => {
                      window.location.href = "/search";
                      this.setState({
                        page: "Search",
                      });
                    },
                  },
                  {
                    itemKey: "Bookmark",
                    text: "Bookmark",
                    icon: <IconBookmark size="large" />,
                    disabled: true,
                    onClick: () => {
                      window.location.href = "/bookmark";
                      this.setState({
                        page: "Bookmark",
                      });
                    },
                  },
                  {
                    itemKey: "Inbox",
                    text: "Inbox",
                    icon: <IconInbox size="large" />,
                    disabled: true,
                    onClick: () => {
                      window.location.href = "/inbox";
                      this.setState({
                        page: "Inbox",
                      });
                    },
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
              <Breadcrumb
                compact={true}
                style={{
                  marginBottom: "16px",
                }}
              >
                <Breadcrumb.Item icon={<IconHome />}></Breadcrumb.Item>
                <Breadcrumb.Item>Nintendo Switch</Breadcrumb.Item>
                <Breadcrumb.Item>Latest Game Listing</Breadcrumb.Item>
              </Breadcrumb>
              <div
                style={{
                  borderRadius: "10px",
                  border: "1px solid var(--semi-color-border)",
                  padding: "16px",
                }}
              >
                <Announcement />
                <Catalogue />
                <Homepage />
                <br />
                <Skeleton
                  placeholder={<Skeleton.Paragraph rows={2} />}
                  loading={true}
                >
                  <p>Hi, Bytedance dance dance.</p>
                  <p>Hi, Bytedance dance dance.</p>
                </Skeleton>
              </div>
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
