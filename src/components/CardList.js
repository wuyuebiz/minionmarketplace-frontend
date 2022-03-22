import React from "react";
import NFTCard from "./NFTCard";
import "../styles/CardList.css";
import { useHistory } from "react-router-dom";

const CardList = ({ list, type = "horizontal" }) => {
  const history = useHistory();

  return (
    <div
      id="card-list"
      style={{ flexDirection: type === "horizontal" ? "row" : "column" }}
    >
      {list.map((item, index) => (
        <NFTCard
          nftSrc={item.src}
          key={index}
          onClick={() => history.push("/detail", { state: { item: item } })}
        />
      ))}
    </div>
  );
};

export default CardList;
