import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { withRouter, useLocation } from "react-router-dom";
import { PriceInput } from '../../components/PriceInput';
import { FancyButton } from '../../components/FancyButton';
import { connect } from 'react-redux'
import { setA } from '../../actions/setting'

function Hook() {
  // const location = useLocation();
  return <div>this is HOOk</div>
}

class User extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      return callback();
    }
    callback('Price must greater than zero!');
  };

  handleClick = () => {
    this.props.setA(99999)
  }

  componentDidMount() {
  }

  componentWillMount() {
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const ref = React.createRef();
    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item label="Price">
            {getFieldDecorator('price', {
              initialValue: { number: null, currency: 'rmb' },
              rules: [{ validator: this.checkPrice }],
            })(<PriceInput />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        <FancyButton ref={ref} onClick={()=> this.handleClick()}>设置value值</FancyButton>
        <div>{this.props.value}</div>

        <Hook />
        {/* <FancyButton
          label="Click Me"
          handleClick={this.handleClick}
          ref={ref}
        /> */}
      </div>
      
    );
  }
}

// User.defaultProps = {
//   value: null
// }

const WrappedDemo = Form.create({ name: 'customized_form_controls' })(withRouter(User));

export default connect(
  state => ({
    value: state.A.value
  }),
  {
    setA,
  }
)(WrappedDemo);
// export default WrappedDemo;