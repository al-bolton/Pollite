function genCode (chars) {
  let text = '';
  const codeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const codeCharsLen = codeChars.length;

  for (var i = 0; i < chars; i++) {
    text += codeChars.charAt(Math.floor(Math.random() * codeCharsLen));
  }
  return text;
}

module.exports = function Poll(mongoose) {
  const pollSchema = new mongoose.Schema({
    title: String,
    dates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DateChoice' },],
    venues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Venue' }],
    linkCode: { type: String, default: genCode(20)},
  });

  return mongoose.model('Poll', pollSchema);
}