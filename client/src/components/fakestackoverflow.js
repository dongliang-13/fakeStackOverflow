import React from 'react';
import axios from 'axios';
import Welcome from './welcome';
import Home from './home';
import Register from './register';
import NewQuestionPage from './newQuestionPage';
import AnswerPage from './answerPage'
import Navigate from './navigate';

export default class FakeStackoverflow extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      page: 'welcome',
      user: {
        userType: 'guest',
        username: null,
      },
      registerInfo: '',
      data: {
        question: [],
        tag: [],
        answer: [],
        comment: [],
        user: [],
      },
      searchResultText : '',
      filterMode : "newest",
      currentQuestion : null,
    });

    this.setPage = this.setPage.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setRegisterInfo = this.setRegisterInfo.bind(this);
    this.updateData = this.updateData.bind(this); 
    this.getDisplayQuestions = this.getDisplayQuestions.bind(this);
    this.changefilterMode = this.changefilterMode.bind(this);
  }

  setPage(page, question = null){
    this.setState({
      page: page
    });
    if(question!==null){
      this.setState({
        currentQuestion: question
      })
    }
  }

  setUser(user){
    this.setState({
      user: user
    });
  }

  setRegisterInfo(info){
    this.setState({
      registerInfo: info
    });
  }
  
  componentDidMount(){
    axios.get('http://127.0.0.1:8000', {withCredentials:true})
      .then(response => 
        {
          this.setUser({
            userType : response.data.userType,
            username : response.data.username
          });
        }
      );
    this.updateData();
  }

  async updateData(){
    await axios.get('http://127.0.0.1:8000/getData').then(res => {
      let updatedData = {
          question: res.data.question,
          tag: res.data.tag,
          comment: res.data.comment,
          user: res.data.user,
          answer: res.data.answer,
      };
      let newCurrentQ = null;
      if(this.state.currentQuestion!==null){
        newCurrentQ = this.state.data.question.find(q=>{
          return q._id === this.state.currentQuestion._id;
        });
      }
      this.setState({
        data: updatedData,
        currentQuestion: newCurrentQ
      });
    });
  }

  getDisplayQuestions(){
    const searchFilterText = this.state.searchResultText;
    const filterMode = this.state.filterMode;

    let copyData = {...this.state.data};
    if(searchFilterText!==""){
      if(searchFilterText.includes("[") && searchFilterText.includes("]")){
          const regex = /\[(.*?)\]/g;
          const matches = searchFilterText.match(regex);
          const textArray = matches.map(match => match.slice(1, -1));

          const q = copyData.question.filter((question) => 
              question.tags.some((tag) => {
                return textArray.includes(tag.name);
              })
          );
          copyData.question = q;
      }
      else{
          const q = copyData.question.filter((question) => question.title.toLowerCase().includes(searchFilterText.toLowerCase()));
          copyData.question = q;
      }
    }else{
      if(this.state.currentPage === 'searchResultPage'){
        copyData.question = [];
      }
    }

    if(filterMode === "newest"){
      copyData.question.sort(function(a,b){
          return new Date(b.askedDateTime) - new Date(a.askedDateTime);
      }); 
    }
    else if (filterMode === "active"){
      copyData.question.sort((a, b) => {
        return b.answers.length - a.answers.length
      });
    }
    else if (filterMode === "unanswered"){
      copyData.question = copyData.question.filter((a) => {
        return a.answers.length===0;
      });
    }
    return copyData;
  }

  changefilterMode(mode){
    this.setState({
      filterMode : mode,
    })
  }

  render(){
    let html = "";
    if((this.state.user.userType === 'registered' && this.state.page === 'welcome') || this.state.page === 'home'){
      html = <Home
        setPage = {this.setPage}
        getDisplayQuestions = {this.getDisplayQuestions}
        changefilterMode = {this.changefilterMode}
        updateDataView = {this.updateData}/>
    }
    else if(this.state.page === 'welcome'){
      return <Welcome 
        registerInfo = {this.state.registerInfo}
        user = {this.state.user}
        setPage = {this.setPage}
        setUser = {this.setUser}/>;
    }
    else if(this.state.page === 'register'){
      return <Register
        setPage = {this.setPage}
        setRegisterInfo = {this.setRegisterInfo}/>
    }
    else if(this.state.page === 'newQuestionPage'){
      html = <NewQuestionPage 
        addQuestion={this.addQuestion} 
        changePage={this.setPage}
        setPage = {this.setPage}
        updateDataView = {this.updateData}/>
    }
    else if(this.state.page === 'answerPage'){
      html = <AnswerPage 
        question = {this.state.currentQuestion}
        updateModel = {this.updateData}
        changePage = {this.setPage}/>
    }
    else{
      html = <div>default</div>
    }
    return (
      <>
        <Navigate 
          user = {this.state.user}
          setPage = {this.setPage}
          setUser = {this.setUser}/>
        {html}
      </>
    )
  }
}
