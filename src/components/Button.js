import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

export default function ActionButton({
  buttonName,
  setApiMethod,
  apiMethod,
  requestHandler,
  dataRequest,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 2,
        },
      }}
    >
      <ButtonGroup
        variant="outlined"
        aria-label="Medium-sized button group"
        sx={{ width: "42%" }}
      >
        <Button
          sx={{ flex: 1, p: 2 }}
          onClick={() => {
            setApiMethod(apiMethod);
            setTimeout(() => {
              requestHandler({
                variables: {
                  credentials: JSON.stringify(dataRequest),
                },
                fetchPolicy: "network-only",
              });
            }, 0);
          }}
        >
          {buttonName}
        </Button>
      </ButtonGroup>
    </Box>
  );
}
