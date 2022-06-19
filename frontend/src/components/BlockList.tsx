import axios from "axios";
import { useEffect, useState } from "react";
import { BlockBody } from "../types/block";
import "./BlockList.css";

function renderBlock(block: BlockBody) {
  return (
    <div className="block" key={block.id}>
      <div className="content">
        <h2 className="title">{block.title}</h2>
        <h4 className="subtitle">{block.subtitle}</h4>
        {block.body && <div className="body">{block.body}</div>}
        {block.imageId && (
          <div className="image">
            <img
              src={`/api/images/${block.imageId}`}
              style={{ maxWidth: "80px", maxHeight: "120px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function BlockList({ blocks }: { blocks: BlockBody[] }) {
  return (
    <div className="block-wrapper">
      {blocks.map((block) => {
        return renderBlock(block);
      })}
    </div>
  );
}
