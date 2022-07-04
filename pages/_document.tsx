import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";
import { HeaderTabs } from "@/components/Layout/Header";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head />
        {/* <HeaderTabs
          user={{
            name: "sadf",
            image: "asfdasd",
          }}
          tabs={["asdf", "qwer", "zxcv"]}
        /> */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
