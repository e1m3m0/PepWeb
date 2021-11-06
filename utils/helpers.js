module.exports = {
  format_date: date => {
    return `${new Date(date).getMonth() +1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
  },
  reactionCount: (reactionArray, reactionNum) => {
    const reactionObj = reactionArray.filter(reaction => reaction.reaction_id === parseInt(reactionNum));
    if (reactionObj.length === 0) {
      return 0;
    } else {
      return reactionObj[0].reactionCount;
    }
  }
}