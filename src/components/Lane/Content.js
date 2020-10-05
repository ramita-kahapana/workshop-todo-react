import React from "react";
import ListItem from "./ListItem";

function Content({ title, list, type }) {
  return (
    <div className="lane-content">
      <div className="lane-title">{title}</div>
      <ul className="list-container">
        {list.map((item, index) => (
          <ListItem key={item.id} index={index} type={type}>
            {item.content}
          </ListItem>
        ))}
      </ul>
    </div>
  );
}

export default Content;
