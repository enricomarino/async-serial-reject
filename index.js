module.exports = function (array, iterator, callback) {
  var results = [];
  var completed = 0;
  var len = array.length;

  function complete (err, result) {
    if (err) {
      callback(err);
      callback = function () {};
      return;
    }
    if (!result) {
      results.push(array[completed]);
    }
    completed += 1;
    if (completed === len) {
      callback(err, results);
      return;
    }
    iterate();
  }

  function iterate () {
    iterator(array[completed], complete);
  }

  iterate();
};
