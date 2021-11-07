import React from "react";
import { List } from "@douyinfe/semi-ui";
import XboxLogo from "../media/xbox.svg";
import PlaystationLogo from "../media/ps5.svg";
import SwitchLogo from "../media/switch.svg";
class Homepage extends React.Component {
  render() {
    const data = [
      {
        title: "Xbox Game",
        logo: XboxLogo,
        alt: "Xbox Logo",
      },
      {
        title: "PS5 Game",
        logo: PlaystationLogo,
        alt: "Playstation Logo",
      },
      {
        title: "Switch Game",
        logo: SwitchLogo,
        alt: "Switch Logo",
      },
    ];

    return (
      <div
        style={{
          padding: 12,
          border: "1px solid var(--semi-color-border)",
          margin: 12,
        }}
      >
        <List
          dataSource={data}
          layout="vertical"
          renderItem={(item) => (
            <List.Item
              header={
                <img
                  src={item.logo}
                  alt={item.alt}
                  width="60px"
                  height="60px"
                />
              }
              main={
                <div>
                  <span
                    style={{
                      color: "var(--semi-color-text-0)",
                      fontWeight: 500,
                    }}
                  >
                    {item.title}
                  </span>
                  <p
                    style={{
                      color: "var(--semi-color-text-2)",
                      margin: "4px 0",
                    }}
                  >
                    Highlighted Games...
                  </p>
                </div>
              }
            />
          )}
        />
      </div>
    );
  }
}

export default Homepage;
