import React from "react";
import { AutoComplete, Avatar, Skeleton } from "@douyinfe/semi-ui";
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
    const style = {
      marginTop: "30px",
      marginBottom: "30px",
      width: "100%",
      display: "flex",
      alignItems: "flex-start",
    };
    const placeholder = (
      <div style={style}>
        <Skeleton.Avatar style={{ marginRight: 12 }} />
        <div>
          <Skeleton.Title
            style={{ width: 120, marginBottom: 12, marginTop: 12 }}
          />
          <Skeleton.Paragraph style={{ width: 240 }} rows={3} />
        </div>
      </div>
    );

    return (
      <>
        <AutoComplete
          size="large"
          data={this.state.data}
          placeholder="Search"
          prefix={<IconSearch />}
          style={{ width: "100%" }}
          renderSelectedItem={(option) => option.email}
          renderItem={this.renderOption}
          onSearch={this.search.bind(this)}
          onSelect={(v) => console.log(v)}
        ></AutoComplete>
        <Skeleton placeholder={placeholder} loading={true} active>
          <div style={style}>
            <Avatar color="blue" style={{ marginRight: 12 }}>
              UI
            </Avatar>
            <div>
              <h3>Semi UI</h3>
              <p>Hi, Bytedance dance dance.</p>
              <p>Hi, Bytedance dance dance.</p>
              <p>Hi, Bytedance dance dance.</p>
            </div>
          </div>
        </Skeleton>
      </>
    );
  }
}

export default Search;
