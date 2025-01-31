import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function UserInput({
  onChange,
  inputLable,
  keyData,
  variant,
  sx,

  minRows,
}) {
  return (
    <Box
      sx={{ "& > :not(style)": { m: 0, width: "50ch" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label={inputLable}
        variant={variant}
        sx={sx}
        size="small"
        minRows={minRows}
        multiline
        onChange={(e) => onChange(keyData, e.target.value)}
      />
    </Box>
  );
}
