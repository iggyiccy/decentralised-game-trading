import React, { Component } from "react";
import { Button, Toast } from "@douyinfe/semi-ui";

class Demo extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Button onClick={() => Toast.warning({ content: "welcome" })}>
        Hello Semi
      </Button>
    );
  }
}

export default Demo;
