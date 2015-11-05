
console.log('are you happy?');
process.stdin.once('data', function (data) {
  console.log('user replied', data.toString().trim());
  process.exit();
});