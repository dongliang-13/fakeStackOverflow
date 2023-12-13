// Setup database with initial test data.
// Include an admin user.
// Script should take admin credentials as arguments as described in the requirements doc.
var create = require('./createModel.js');
var createComment = create.createComment;
var createAnswer = create.createAnswer;
var createQuestion = create.createQuestion;
var createTag = create.createTag;
var createUser = create.createUser;

let adminArgs = process.argv.slice(2);

if(adminArgs.length != 2){
    console.log("ERROR!! PLEASE PROVIDE ADMIN USERNAME & PASSWORD. READ README.md FOR MORE INFO")
    process.exit(0)
}

let mongoose = require('mongoose');
let mongoDB = "mongodb://127.0.0.1:27017/fake_so";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connect',()=>console.log('successful connection'));

const populate = async () => {
    let c1 = await createComment('nice question', ['dummy1'], 'dummy2');
    let c2 = await createComment('I was thinking the same thing', ['dummy2'],'dummy1');
    let c3 = await createComment('agree lol', ['dummy3'], 'dummy1');
    let t1 = await createTag('react');
    let t2 = await createTag('javascript');
    let t3 = await createTag('android-studio');
    let t4 = await createTag('shared-preferences');
    let a1 = await createAnswer('React Router is mostly a wrapper around the history library. history handles interaction with the browser\'s window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don\'t have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.', 'dummy1', new Date('2023-10-31T05:24:00'), [c2], ['dummy2','dummy3'], []);
    let a2 = await createAnswer('On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn\'t change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.', 'dummy2', new Date('2023-11-07T11:24:45'), [c3], [], []);
    let a3 = await createAnswer('Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.', 'dummy2', new Date('2023-12-03T17:09:20'), [], [], []);
    let a4 = await createAnswer('YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);', 'dummy3', new Date('2023-12-04T00:09:20'), [], [], []);
    let a5 = await createAnswer('I just found all the above examples just too confusing, so I wrote my own. ', 'dummy3', new Date('2023-12-05T18:09:20'), [], [], []);
    let q1 = await createQuestion('Programmatically navigate using React router', 'question on React router' ,'the alert shows the proper index for the li clicked, and when I alert the variable within the last function I\'m calling, moveToNextImage(stepClicked), the same value shows but the animation isn\'t happening. This works many other ways, but I\'m trying to pass the index value of the list item clicked to use for the math to calculate.', [t1,t2] ,'dummy3', new Date('2023-10-31T03:24:00'), 20, [a1,a2], [c1], [], []);
    let q2 = await createQuestion('android studio save string shared preference', 'question on android studio', 'I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time i switch to a different view. I just hide/show my fragments depending on the icon selected. The problem i am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what i am using to refrain them from being recreated.', [t2, t3, t4], 'dummy1', new Date('2023-12-02T18:09:20'), 121, [a3, a4, a5], [], [], []);
    let u1 = await createUser('dummy1@gmail.com','dummy1','dummy1password',100, new Date('2023-12-01T13:10:20'), 'registered', [t2, t3, t4], [q2]);
    let u2 = await createUser('dummy2@gmail.com', 'dummy2', 'dummy2password', 0, new Date('2023-11-05T11:24:45'), 'registered', [], []);
    let u3 = await createUser('dummy3@gmail.com','dummy3','dummy3password', 520, new Date('2023-10-30T03:24:00'), 'registered', [t1], [q1]);
    let admin = await createUser('admin@gmail.com', adminArgs[0], adminArgs[1], 0, new Date(), 'admin', [], []);
    if(db) db.close();
        console.log('done');
}

populate()
  .catch((err) => {
    console.log('ERROR: ' + err);
    if(db) db.close();
  });

