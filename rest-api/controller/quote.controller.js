const Quote = require("../model/quote.model");

async function getRandomQuotes(req, res, next) {
  try {
    const randomQuote = await Quote.getRandomQuotes();
    res.json({
      quote: randomQuote,
    });
  } catch (err) {
    return next(error);
  }
}

module.exports = {
  getRandomQuotes,
};
