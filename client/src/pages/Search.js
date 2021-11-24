import React from "react";
import { AutoComplete, Avatar } from "@douyinfe/semi-ui";
import { IconSearch } from "@douyinfe/semi-icons";

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      color: ["amber", "indigo", "cyan"],
      list: [
        {
          name: "Xia",
          email: "xiakeman@example.com",
          abbr: "XK",
          color: "amber",
        },
        {
          name: "Shen",
          email: "shenyue@example.com",
          abbr: "SY",
          color: "indigo",
        },
        {
          name: "Qu",
          email: "quchenyi@example.com",
          abbr: "CY",
          color: "blue",
        },
        {
          name: "Wen",
          email: "wenjiamao@example.com",
          abbr: "JM",
          color: "cyan",
        },
      ],
    };
  }

  search(value) {
    let result;
    if (value) {
      result = this.state.list.map((item) => {
        return { ...item, value: item.name, label: item.email };
      });
    } else {
      result = [];
    }
    this.setState({ data: result });
  }

  renderOption(item) {
    let optionStyle = {
      display: "flex",
    };
    return (
      <>
        <Avatar color={item.color} size="small">
          {item.abbr}
        </Avatar>
        <div style={{ marginLeft: 4 }}>
          <div style={{ fontSize: 14, marginLeft: 4 }}>{item.name}</div>
          <div style={{ marginLeft: 4 }}>{item.email}</div>
        </div>
      </>
    );
  }

  render() {
    return (
      <AutoComplete
        data={this.state.data}
        prefix={<IconSearch />}
        style={{ width: "250px" }}
        renderSelectedItem={(option) => option.email}
        renderItem={this.renderOption}
        onSearch={this.search.bind(this)}
        onSelect={(v) => console.log(v)}
      ></AutoComplete>
    );
  }
}

export default Search;
