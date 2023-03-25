import * as React from "react";
import { FC } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { IconButton, Stack, TextField } from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setLanguage, setMistakes, setSeed } from "../slice/userTableSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const UsersTableToolbar: FC = () => {
  const { language, mistakes, seed } = useSelector(
    (state: RootState) => state.userTable
  );
  const dispatch = useDispatch();

  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        gap: "300px",
        alignItems: "center",
        border: 0,
      }}
    >
      <Grid>
        <FormControl sx={{ m: 2, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Region</InputLabel>
          <Select
            sx={{
              height: 45,
            }}
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            value={language}
            onChange={(event) => dispatch(setLanguage(event.target.value))}
            input={<OutlinedInput label="Region" />}
            MenuProps={MenuProps}
          >
            <MenuItem value="ru">Русский</MenuItem>
            <MenuItem value="it">Italian</MenuItem>
            <MenuItem value="en">English</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid>
        <Box sx={{ minWidth: 250, height: 80 }}>
          <Typography id="input-slider" gutterBottom>
            Mistakes
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                sx={{ width: 200 }}
                value={mistakes}
                valueLabelDisplay="auto"
                onChange={(_, newError) => dispatch(setMistakes(newError))}
                step={0.25}
                min={0}
                max={10}
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="Mistakes"
                fullWidth
                value={mistakes}
                onChange={({ target: { value } }) =>
                  dispatch(
                    setMistakes(Math.max(0, Math.min(1000, Number(value))))
                  )
                }
                size="small"
                inputProps={{
                  type: "number",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid>
        <Box>
          <Stack direction="row" gap="6px" width="300px">
            <TextField
              id="outlined-basic"
              label="Seed"
              fullWidth
              value={seed}
              onChange={({ target: { value } }) => dispatch(setSeed(+value))}
              size="small"
              inputProps={{
                type: "number",
              }}
            />
            <IconButton
              onClick={() =>
                dispatch(setSeed(Math.floor(Math.random() * 999999)))
              }
            >
              <CatchingPokemonIcon color="primary" />
            </IconButton>
          </Stack>
        </Box>
      </Grid>
    </Box>
  );
};
