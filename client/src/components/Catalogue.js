import React from "react";
import { Card, Row, Col } from "@douyinfe/semi-ui";
import XboxLogo from "../media/xbox.svg";
import PlaystationLogo from "../media/ps5.svg";
import SwitchLogo from "../media/switch.svg";

function Catalogue() {
  const { Meta } = Card;
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card
            shadows="hover"
            style={{ maxWidth: 300 }}
            cover={<img alt="Xbox" src={XboxLogo} />}
          >
            <Meta title="Xbox" />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            shadows="hover"
            style={{ maxWidth: 300 }}
            cover={<img alt="Switch" src={SwitchLogo} />}
          >
            <Meta title="Switch" />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            shadows="hover"
            style={{ maxWidth: 300 }}
            cover={<img alt="PS5" src={PlaystationLogo} />}
          >
            <Meta title="PS5" />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Catalogue;
