import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
  } from "@material-ui/core/styles";
  import Tooltip from "@material-ui/core/Tooltip";
  
  const defaultTheme = createMuiTheme();
  const theme = createMuiTheme({
    overrides: {
      MuiTooltip: {
        tooltip: {
          fontSize: "2em",
          color: "yellow",
          backgroundColor: "red"
        }
      }
    }
  });
  const BlueOnGreenTooltip = withStyles({
    tooltip: {
      color: "lightblue",
      backgroundColor: "green"
    }
  })(Tooltip);
  
  const TextOnlyTooltip = withStyles({
    tooltip: {
      color: "black",
      backgroundColor: "transparent"
    }
  })(Tooltip);
  
  function App(props) {
    return (
      <MuiThemeProvider theme={defaultTheme}>
        <div className="App">
          <MuiThemeProvider theme={theme}>
            <Tooltip title="This tooltip is customized via overrides in the theme">
              <div style={{ marginBottom: "20px" }}>
                Hover to see tooltip customized via theme
              </div>
            </Tooltip>
          </MuiThemeProvider>
          <BlueOnGreenTooltip title="This tooltip is customized via withStyles">
            <div style={{ marginBottom: "20px" }}>
              Hover to see blue-on-green tooltip customized via withStyles
            </div>
          </BlueOnGreenTooltip>
          <TextOnlyTooltip title="This tooltip is customized via withStyles">
            <div>Hover to see text-only tooltip customized via withStyles</div>
          </TextOnlyTooltip>
        </div>
      </MuiThemeProvider>
    );
  }