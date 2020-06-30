import { opine } from 'https://deno.land/x/opine@main/mod.ts';

const app = opine();

app.get('/', function (req, res) {
    res.send('hello world')
})

app.listen(4000);

console.log('Listening on port 4000...');
