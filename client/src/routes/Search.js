import React from "react";
import { AutoComplete, Avatar, Skeleton, Button } from "@douyinfe/semi-ui";
import { IconSearch } from "@douyinfe/semi-icons";
import DeGame_Listing from "../contracts/DeGame_Listing.json";
import { ethers } from "ethers";

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      color: ["amber", "indigo", "cyan"],
      list: [
        {
          name: "Testing Call Smart Contract Function",
          type: "GameID: #1",
          abbr: "TC",
          color: "green",
        },
        {
          name: "Pokemon Brilliant Diamond",
          type: "Nintendo Switch",
          abbr: "PK",
          color: "amber",
        },
        {
          name: "Minecraft",
          type: "Nintendo Switch",
          abbr: "MC",
          color: "indigo",
        },
        {
          name: "Mario Kart 8 Delux",
          type: "Nintendo Switch",
          abbr: "MK",
          color: "blue",
        },
        {
          name: "Animal Crossing: New Horizons",
          type: "Nintendo Switch",
          abbr: "AC",
          color: "cyan",
        },
      ],
    };
  }

  search(value) {
    let result;
    if (value) {
      result = this.state.list.map((item) => {
        return { ...item, value: item.name, label: item.type };
      });
    } else {
      result = [];
    }
    this.setState({ data: result });
  }

  renderOption(item) {
    // let optionStyle = {
    //   display: "flex",
    // };
    return (
      <>
        <Avatar color={item.color} size="small">
          {item.abbr}
        </Avatar>
        <div style={{ marginLeft: 4 }}>
          <div style={{ fontSize: 14, marginLeft: 4, fontWeight: "bold" }}>
            {item.name}
          </div>
          <div style={{ fontSize: 12, marginLeft: 4, color: "grey" }}>
            {item.type}
          </div>
        </div>
      </>
    );
  }

  async getGameListing(value) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const NFTcontract = new ethers.Contract(
      "0x64c4bC7008Af9ebB2CC084FFA443DF74DDF35d49",
      DeGame_Listing,
      signer
    );
    // call the contract function .createGameListing() from the DeGame_Listing smart contract
    const CheckGameListing = await NFTcontract.checkGameListing(value);
    const GetGameURI = await NFTcontract.getGameListingDetails(value);
    try {
      const GameExsitance = await CheckGameListing.toString();
      const GameURI = await GetGameURI.toString();
      console.log("Does the GameID exsit? Below are the game listing details.");
      console.log("GameID: " + value);
      console.log("GameID existance: " + GameExsitance);
      console.log("Associated URI: " + GameURI);
    } catch (error) {
      console.log(error);
    }
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
          placeholder="Search by GameID"
          prefix={<IconSearch />}
          style={{ width: "100%" }}
          renderSelectedItem={(option) => option.type}
          renderItem={this.renderOption}
          onSearch={this.search.bind(this)}
          onSelect={(v) => console.log(v)}
        ></AutoComplete>
        <Button
          size="default"
          style={{ marginTop: 20 }}
          onClick={() => this.getGameListing("1")}
        >
          Submit
        </Button>
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
