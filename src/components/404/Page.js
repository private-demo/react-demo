import React from 'react';
import { ThemeContext } from '../../services';
export default class Page extends React.Component {
  render() {
    // let theme = this.context;
    return (
      <ThemeContext.Consumer>
        {
          (theme) => (
            <div style={theme}>404</div>

          )
        }
      </ThemeContext.Consumer>

    )
  }
}

// Page.contextType = ThemeContext;
