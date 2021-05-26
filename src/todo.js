import {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components';

export default class Todo extends Component{
  constructor(props){
    super(props);
    this.state = {...props};
  }
  render(){
    return <>
      {this.state.title}
    </>
  }
}
 