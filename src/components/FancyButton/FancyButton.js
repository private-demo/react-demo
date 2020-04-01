import React from 'react';

function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      // console.log('old props:', prevProps);
      // console.log('new props:', this.props);
    }

    render() {
      const {forwardedRef, ...rest} = this.props;
      return <Component ref={forwardedRef} {...rest} />
    }
  }

  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />
  });
}

// const FancyButton = React.forwardRef((props, ref) => {
//   return <button ref={ref} className="FancyButton">
//           {props.children}
//         </button>
// });
class FancyButton extends React.Component {
  focus() {

  }

  render() {
    console.log(11111, this.props)
    return <button onClick={this.props.onClick}>{this.props.children}</button>
  }
}

// 我们导出 LogProps，而不是 FancyButton。
// 虽然它也会渲染一个 FancyButton。
export default logProps(FancyButton);

// export default FancyButton;