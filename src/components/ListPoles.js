import React, { Component } from 'react';
import { connect } from 'react-redux'
import PoleSummary from "./PoleSummary";

class ListPoles extends Component{
    render(){
        return (
            <div>
                <h3 className="center">poles</h3>
                <ul>
                    {this.props.questionsIds.map((id)=>(
                        <li key={id}>
                            <PoleSummary id={id}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStaeToProps({questions}){
    return {
        questionsIds: Object.keys(questions)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStaeToProps)(ListPoles)