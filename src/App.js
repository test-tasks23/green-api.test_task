import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { useLazyQuery } from "@apollo/client";

import UserInput from "./components/Input";
import ActionButton from "./components/Button";
import Output from "./components/Output";
import { apiToGqlResolvers } from "./GQL/index";
import { GET_SETTINGS } from "./GQL/GET_SETTINGS";
import { Item } from "./components/Item";
import { SendData } from "./components/SendData";
function App() {
  const [dataRequest, setDataRequest] = useState({});
  const [apiMethod, setApiMethod] = useState("");
  const [gqlQuery, setGqlQuery] = useState(null);
  const handleInputChange = (key, value) => {
    setDataRequest((prev) => ({ ...prev, [key]: value }));
  };

  const [requestHandler, { loading, data }] = useLazyQuery(
    gqlQuery || GET_SETTINGS,
    {
      skip: !gqlQuery,
    }
  );
  useEffect(() => {
    if (apiMethod) {
      setGqlQuery(apiToGqlResolvers(apiMethod));
    }
  }, [apiMethod]);

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5}>
          <Grid size={8}>
            <Item sx={{ mb: 2 }}>
              <UserInput
                inputLable={"Id Instance"}
                onChange={handleInputChange}
                keyData={"idInstance"}
                variant={"outlined"}
                sx={{ minHeight: "60px" }}
              />
              <UserInput
                inputLable={"Api Token Instance"}
                onChange={handleInputChange}
                keyData={"apiKey"}
                variant={"outlined"}
                sx={{ minHeight: "60px" }}
              />

              <ActionButton
                buttonName={"Get Settings"}
                apiMethod={"getSettings"}
                setApiMethod={setApiMethod}
                requestHandler={requestHandler}
                dataRequest={dataRequest}
              />
              <ActionButton
                buttonName={"Get State Instance"}
                apiMethod={"stateInstance"}
                requestHandler={requestHandler}
                setApiMethod={setApiMethod}
                dataRequest={dataRequest}
              />
            </Item>

            <SendData
              handleInputChange={handleInputChange}
              buttonName={"Send Message"}
              apiMethod={"sendMessage"}
              setApiMethod={setApiMethod}
              requestHandler={requestHandler}
              keyData={"phoneNumber"}
              sx={{ minHeight: "60px" }}
              dataRequest={dataRequest}
              content={
                <UserInput
                  variant={"outlined"}
                  inputLable={"Сообщение"}
                  onChange={handleInputChange}
                  keyData={"message"}
                  sx={{ width: "42%", height: "200px" }}
                  multiline={true}
                  minRows={4}
                />
              }
            />
            <SendData
              handleInputChange={handleInputChange}
              id={"phoneNumber"}
              buttonName={"Send File By Url"}
              keyData={"phoneNumber"}
              apiMethod={"urlToFile"}
              setApiMethod={setApiMethod}
              requestHandler={requestHandler}
              sx={{ minHeight: "60px" }}
              dataRequest={dataRequest}
              content={
                <UserInput
                  variant={"outlined"}
                  inputLable={"Url To File"}
                  onChange={handleInputChange}
                  keyData={"urlToFile"}
                />
              }
            />
          </Grid>

          <Output data={!loading ? data : ""} />
        </Grid>
      </Box>
    </div>
  );
}

export default App;
