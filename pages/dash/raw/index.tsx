import Head from "next/head";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function Home() {
  const [items, setItems] = useState({});

  useEffect(() => {
    fetch("/api/getItems")
      .then((items) => items.json())
      .then((items) => setItems(items.data));
  }, []);

  return (
    <div className="min-h-100">
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="container">
        <SyntaxHighlighter language="json" style={atomOneDark}>
          {JSON.stringify(items, null, 2)}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
