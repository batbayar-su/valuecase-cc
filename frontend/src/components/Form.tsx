import axios from "axios";
import React, { useState } from "react";
import { BlockBody, INITIAL_BLOCK } from "../types/block";
import "./Form.css";
import { StyledButton } from "./StyledButton";
import { SwitchButton } from "./SwitchButton";

export function Form({ loadBlocks }: { loadBlocks: () => void }) {
  const [useImage, setUseImage] = useState(true);
  const [formData, setFormData] = useState<BlockBody>(INITIAL_BLOCK);
  const fileInput = React.createRef<HTMLInputElement>();

  const changeFormData = (key: string, value: string) => {
    const newFormData = { ...formData, [key]: value };
    console.log(newFormData);
    setFormData({ ...formData, [key]: value });
  };

  const submit = async () => {
    const requestBody: BlockBody = { ...formData, imageId: undefined };
    try {
      const file = fileInput.current?.files?.[0];
      if (file) {
        const uploadData = new FormData();
        uploadData.append("file", file, file.name);
        const imageResponse = await axios.post<{ id: number }>(
          "/api/images/upload",
          uploadData
        );
        requestBody.imageId = imageResponse.data.id;
      }

      console.log(requestBody);
      await axios.post<BlockBody>("api/blocks", requestBody);
      setFormData(INITIAL_BLOCK);
      loadBlocks();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="form">
      <SwitchButton
        onLabel="Image"
        offLabel="Content"
        value={useImage}
        onChange={(toggle) => setUseImage(toggle)}
      ></SwitchButton>
      <div className="input">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => changeFormData("title", e.target.value)}
        />
      </div>
      <div className="input">
        <label htmlFor="subtitle">Subtitle</label>
        <input
          type="text"
          value={formData.subtitle}
          onChange={(e) => changeFormData("subtitle", e.target.value)}
        />
      </div>
      <div className="input">
        <label htmlFor="index">Index</label>
        <input
          type="number"
          value={formData.index}
          onChange={(e) => changeFormData("index", e.target.value)}
        />
      </div>
      {useImage ? (
        <div className="input">
          <label htmlFor="image">Image</label>
          <input ref={fileInput} type="file" accept="image/png, image/jpeg" />
        </div>
      ) : (
        <div className="input">
          <label htmlFor="body">Body</label>
          <input
            type="text"
            value={formData.body}
            onChange={(e) => changeFormData("body", e.target.value)}
          />
        </div>
      )}
      <StyledButton className="submit" onClick={submit}>
        Submit
      </StyledButton>
    </div>
  );
}
