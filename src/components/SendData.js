import { Item } from "./Item";
import UserInput from "./Input";
import ActionButton from "./Button";

export function SendData({
  handleInputChange,
  content,
  buttonName,
  setApiMethod,
  apiMethod,
  keyData,
  sx,
  requestHandler,
  dataRequest,
}) {
  return (
    <Item sx={{ mb: 2 }}>
      <UserInput
        inputLable={"Номер телефона"}
        onChange={handleInputChange}
        keyData={keyData}
        sx={sx}
      />
      {content}
      <ActionButton
        buttonName={buttonName}
        apiMethod={apiMethod}
        setApiMethod={setApiMethod}
        requestHandler={requestHandler}
        dataRequest={dataRequest}
      />
    </Item>
  );
}
