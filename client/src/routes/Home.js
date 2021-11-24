import React from "react";
import { Breadcrumb } from "@douyinfe/semi-ui";
import { IconHome } from "@douyinfe/semi-icons";
import { Skeleton } from "@douyinfe/semi-ui";
import Announcement from "../components/Announcement";
import Catalogue from "../components/Catalogue";
import Homepage from "../components/Homepage";

export default function Home() {
  return (
    <>
      <Breadcrumb
        compact={true}
        style={{
          marginBottom: "16px",
        }}
      >
        <Breadcrumb.Item icon={<IconHome />}></Breadcrumb.Item>
        <Breadcrumb.Item>Trading</Breadcrumb.Item>
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
        <Skeleton placeholder={<Skeleton.Paragraph rows={2} />} loading={true}>
          <p>Hi, Bytedance dance dance.</p>
          <p>Hi, Bytedance dance dance.</p>
        </Skeleton>
      </div>
    </>
  );
}
