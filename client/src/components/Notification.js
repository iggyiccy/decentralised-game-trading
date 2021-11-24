import React, { useState } from "react";
import { SideSheet, Button, Card, Typography } from "@douyinfe/semi-ui";
import { IconBell } from "@douyinfe/semi-icons";

function Notification() {
  const [visible, setVisible] = useState(false);
  const change = () => {
    setVisible(!visible);
  };
  const { Text } = Typography;
  return (
    <>
      <Button
        onClick={change}
        theme="borderless"
        icon={<IconBell size="large" />}
        style={{
          color: "var(--semi-color-text-2)",
          marginRight: "12px",
        }}
        // disabled={true}
        // disable notification when user is not logged in
      />
      <SideSheet
        title="Notification"
        visible={visible}
        onCancel={change}
        width={360}
      >
        <Card
          title="Notification #1"
          style={{ maxWidth: 360 }}
          headerExtraContent={<Text link>More</Text>}
        >
          Testing notification #1
        </Card>
      </SideSheet>
    </>
  );
}

export default Notification;
