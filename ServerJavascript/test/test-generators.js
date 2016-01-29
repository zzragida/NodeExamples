
function* foo(x) {
  yield x + 1;

  var y = 10;
  return x + y;
}

for (var n of foo(10)) {
  console.log(n);
}

var gen = foo(10);

function* bar(result) {
  yield result.next() + 10;
}

var genBar = bar(gen);
console.log(genBar.next());
console.log(genBar.next());
