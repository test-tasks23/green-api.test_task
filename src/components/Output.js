import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { Item } from "./Item";
import Grid from "@mui/material/Grid2";

export default function Output({ data }) {
  return (
    <Grid size={4}>
      <Item>
        <Box sx={{ width: "100%", maxWidth: 500, height: "100%" }}>
          <Typography variant="subtitle1" gutterBottom>
            Ответ:
          </Typography>
          <TextField
            variant="outlined"
            multiline
            disabled
            minRows={37.4}
            sx={{ width: "100%", height: "100%" }}
            value={Object.values(data || {})[0]?.response}
          />
        </Box>
      </Item>
    </Grid>
  );
}
