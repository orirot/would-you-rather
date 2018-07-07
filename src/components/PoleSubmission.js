import React, {Component} from 'react'
import { connect } from 'react-redux'
import { handleSaveQuestion } from "../actions/questions";

class PoleSubmission extends Component {

    state = {
        optionOneText: '',
        optionTwoText: ''
    }

    handleChange = (e, textToChange) => {
        const text = e.target.value

        this.setState(() => ({
            ...this.state,
                [textToChange]: text
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOneText, optionTwoText } = this.state
        const { dispatch, authedUser } = this.props
        dispatch(handleSaveQuestion({author: authedUser, optionOneText, optionTwoText}))

        this.setState(() => ({
            optionOneText: '',
            optionTwoText: ''
        }))
    }

    render() {
        const { optionOneText, optionTwoText } = this.state

        return (
            <div>

                <h1>WOULD YOU RATHER</h1>

                <form className='new-question' onSubmit={this.handleSubmit}>


                    <div class="form-group">
                        <label for="option1">Option 1:</label>
                        <input type="text" class="form-control"
                               onChange={(event)=>this.handleChange(event, "optionOneText")}
                               placeholder="Write Option 1 text here"
                               value={optionOneText}/>
                    </div>
                    <br/>
                    <div class="form-group">
                        <label for="option2">Option 2:</label>
                        <input type="text" class="form-control"
                               onChange={(event)=>this.handleChange(event, "optionTwoText")}
                               placeholder="Write Option 2 text here"
                               value={optionTwoText}/>
                    </div>

                    <button
                        className='btn'
                        type='submit'
                        disabled={optionOneText === '' || optionTwoText === ''}>
                        Submit
                    </button>

                </form>
            </div>
        )
    }
}

function mapStateToProps ({authedUser, questions}, { id, wasAnsweredByUser }) {
    const question = questions[id]
    return {
        authedUser,
        wasAnsweredByUser,
        question
    }
}


export default connect(mapStateToProps)(PoleSubmission)