import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import { Typography } from "@douyinfe/semi-ui";
import {
  Layout,
  Nav,
  Button,
  Breadcrumb,
  Skeleton,
  Avatar,
} from "@douyinfe/semi-ui";
import {
  IconSemiLogo,
  IconBell,
  IconGithubLogo,
  IconHome,
  IconSearch,
  IconInbox,
  IconBookmark,
} from "@douyinfe/semi-icons";
import Info from "./components/Info";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(10).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
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
                      fontWeight: "600",
                    }}
                  >
                    DeGame Australia
                  </span>
                </span>
                <Nav.Footer>
                  <Button
                    theme="borderless"
                    icon={<IconBell size="large" />}
                    style={{
                      color: "var(--semi-color-text-2)",
                      marginRight: "12px",
                    }}
                  />
                  <Info />
                  <Avatar color="orange" size="small">
                    YJ
                  </Avatar>
                </Nav.Footer>
              </Nav>
            </div>
          </Header>
          <Layout>
            <Sider style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
              <Nav
                style={{ maxWidth: 150, height: "100%" }}
                defaultSelectedKeys={["Home"]}
                defaultIsCollapsed={true}
                items={[
                  {
                    itemKey: "Home",
                    text: "Home",
                    icon: <IconHome size="large" />,
                  },
                  {
                    itemKey: "Search",
                    text: "Search",
                    icon: <IconSearch size="large" />,
                  },
                  {
                    itemKey: "Setting",
                    text: "Setting",
                    icon: <IconBookmark size="large" />,
                  },
                  {
                    itemKey: "Chat",
                    text: "Chat",
                    icon: <IconInbox size="large" />,
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
                padding: "24px",
                backgroundColor: "var(--semi-color-bg-0)",
              }}
            >
              <Breadcrumb
                style={{
                  marginBottom: "24px",
                }}
                routes={["Home", "Page Section", "Ppage Ssection", "Detail"]}
              />
              <div
                style={{
                  borderRadius: "10px",
                  border: "1px solid var(--semi-color-border)",
                  height: "376px",
                  padding: "32px",
                }}
              >
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
                      "https://github.com/iggyiccy/blockchain-developer-bootcamp-final-project"
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
