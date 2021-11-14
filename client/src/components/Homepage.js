import React from "react";
import { Tabs, TabPane, Card } from "@douyinfe/semi-ui";
const { Meta } = Card;
class Homepage extends React.Component {
  render() {
    return (
      <div>
        <Tabs type="line">
          <TabPane tab="Document" itemKey="1">
            <h3>Document</h3>
            <p style={{ lineHeight: 1.8 }}>
              Semi Design is a design system developed and maintained by IES
              Front-end Team and UED Team
            </p>
            <p style={{ lineHeight: 1.8 }}>
              Semi Design create a consistent, good-looking, easy-to-use, and
              efficient user experience with a user-centric, content-first, and
              human-friendly design system.
            </p>
            <ul>
              <li>
                <p>Content-first</p>
              </li>
              <li>
                <p>Customized theming</p>
              </li>
              <li>
                <p>Internationalized</p>
              </li>
              <li>
                <p>Humanism</p>
              </li>
            </ul>
          </TabPane>
          <TabPane tab="Quick Start" itemKey="2">
            <h3>Quick Start</h3>
            <p style={{ lineHeight: 1.8 }}>
              If it is a new project, it is recommended that you use Eden to
              initialize the project and initialize the project type to select
              the React direction.
            </p>
            <pre
              style={{
                margin: "24px 0",
                padding: "20px",
                border: "none",
                whiteSpace: "normal",
                borderRadius: "6px",
                color: "var(--semi-color-text-1)",
                backgroundColor: "var(--semi-color-fill-0)",
              }}
            >
              <code>yarn add @douyinfe/semi-ui</code>
            </pre>
          </TabPane>
          <TabPane tab="Help" itemKey="3">
            <h3>Help</h3>
            <Card
              style={{ maxWidth: 300, height: "100%", margin: "0 auto" }}
              cover={ 
                <img 
                  alt="example" 
                  src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo2.jpeg" 
                />
              }
            >
              <Meta title="Card cover" />
            </Card>
            <p
              style={{
                lineHeight: 1.8,
                color: "var(--semi-color-text-0)",
                fontWeight: 600,
              }}
            >
              Q: Who should I look for if there are new component requirements,
              or existing component does not meet my needs?
            </p>
            <p style={{ lineHeight: 1.8, color: "var(--semi-color-text-1)" }}>
              Give feedbacks in the upper right corner, submit an Issue,
              describe your needs as well as the business scenario. We will
              handle these issues with priorities.
            </p>
            <p
              style={{
                lineHeight: 1.8,
                color: "var(--semi-color-text-0)",
                fontWeight: 600,
              }}
            >
              Q: Have questions when using components?
            </p>
            <p style={{ lineHeight: 1.8, color: "var(--semi-color-text-1)" }}>
              Welcome to ask anything in our Lark customer service group.
            </p>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Homepage;
