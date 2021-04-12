import Head from "next/head";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import Modal from "react-modal";
import { Circle } from "rc-progress";
import Collapsible from "react-collapsible";

export default function Home() {
  const [items, setItems] = useState({});
  const [privacyScore, setPrivacyScore] = useState(0);

  useEffect(() => {
    openModal();
    fetch("/api/getItems")
      .then((items) => items)
      .then((items) => items.json())
      .then((items) => items.data)
      .then((items) => {
        let PrivacyScores: any = [];
        let PrivacyScoresNumber: number = 0;

        Object.keys(items).forEach(function (key) {
          PrivacyScores.push(items[key].privacyPoints);
        });

        PrivacyScores.forEach((score: number) => {
          PrivacyScoresNumber += score;
        });

        setPrivacyScore(PrivacyScoresNumber / PrivacyScores.length);
      });
  }, []);

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="container">
        <h3 className="mt-5">Dashboard</h3>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          className="modal"
        >
          <div className="score">
            <Circle
              percent={privacyScore}
              strokeColor="var(--color-accent)"
              trailColor="var(--color-primary-500)"
            />
            <div className="scoreNumber">
              <h1>{privacyScore}</h1>
            </div>
          </div>
          <p className="text-muted small">Made by m2v</p>
        </Modal>
      </div>
    </div>
  );
}
