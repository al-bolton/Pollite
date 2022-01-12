module.exports = function DateChoice(mongoose) {
  const dateChoiceSchema = new mongoose.Schema({
    dateString: String,
    votes: {type: Number, default: 0}
  });

  return mongoose.model('DateChoice', dateChoiceSchema);
}