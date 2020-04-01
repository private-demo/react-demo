import React, { CompositeTypes } from 'react';
import { withRouter } from "react-router-dom";
import { Suspense, lazy } from 'react';
import { Ref } from '../../components/ref';

import { Hot } from '../../components/hot'
// import { FunComponent } from '../../components/FunComponent';
import { slowImport } from '../../services';
import './Home.css'

class FancyButton extends React.Component {
  focus() {
    // ...
  }

  render() {
    return <button>一直惦记</button>
  }
}

function CustomTextInput(props) {
  return (
    <div>
      <input type="text" />
    </div>
  );
}

const Page = lazy(() => slowImport(import('../../components/404'), 1000))

const HotComponent = Hot(FancyButton)

const ref = React.createRef();
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      isShow: false,
      person: {
        name: 'sxt'
      }
    }

    this.textInput = null;

    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // 使用原生 DOM API 使 text 输入框获得焦点
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // 组件挂载后，让文本框自动获得焦点
    
    //  this.textInput.focus()
  }

  click = () => {
    this.setState({show: true})
  }

  changeState = () => {
    this.props.history.push({ pathname: '/user' , state : { id: '6666' }})
    // console.log(this._compositeType)
    // console.log(CompositeTypes)

    let { person } = this.state;
    person.name = 'sxt2';
    this.setState({
      person
    })
  };

  render() {
    return (
      <div>
        <span ref={ref} onClick={this.click}>Home</span>
        <Suspense fallback={<div>loading...</div>}>
          <Page />
        </Suspense>

        <Ref />
        <HotComponent 
          label="Click Me"
          ref={ref}
        >ppppp</HotComponent>

        <button className="red" onClick={this.changeState}>点击</button>
        <div>{this.state.person.name}</div>
        <div>{this.state.isShow.toString()}</div>
        <FancyButton ref={el => this.inputElement = el}  />


        <div>
          <input
            type="text"
            ref={this.setTextInputRef}
          />
          <input
            type="button"
            value="Focus the text input"
            onClick={this.focusTextInput}
          />
        </div>

        {/* <CustomTextInput
          ref={el => this.inputElement = el}
        /> */}
      </div>
    )
  }
}



export default withRouter(Home)