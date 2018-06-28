export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatQuestion (question, author, authedUser) {
    const { id, timestamp, optionOne, optionTwo} = question
    const { name, avatarURL } = author

    return {
        authorName: name,
        id,
        timestamp,
        avatar: avatarURL,
        optionOneText: optionOne.text,
        optionTwoText: optionTwo.text,
        optionOneVotes: optionOne.votes.length,
        optionTwoVotes: optionTwo.votes.length,
    }
}

export function didUserVoteToQuestion (userId, question){
    return (didUserVoteToOption(userId, question.optionOne)
        || didUserVoteToOption(userId, question.optionTwo))
}

export function didUserVoteToOption (userId, option){
    const votes = option.votes
    if (votes.includes(userId)){
        return true;
    }
    return false;
}