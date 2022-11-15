var request = require("request");
// const {sessionUser,getSec}=require("../routes/api/auth")
require('es6-promise').polyfill();
require('isomorphic-fetch');

const url = path => `https://jshw6.herokuapp.com${path}`;
let cookie="mockcookie";


describe("A suite", function() {


    it('POST /register', (done) => {
        let user={
                "username":"testUser",
                "email":"jg125@rice.edu",
                "dob":"19990901",
                "zipcode":"77030",
                "password":"123"            
        }
        fetch(url('/register'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(user)
        }).then(res => res.json()).then(res => {
            // expect(res.statusCode).toEqual(400);
            console.log(res)
            expect(1).toEqual(1);
            expect(res.result).toEqual("success");
            done();
        });
    });

    it('POST /login', (done) => {
        let user={
            "username":"testUser",
            "password":"123"
        }

        fetch(url('/login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).then(res => {
            // console.log(res.headers.get('set-cookie'));
            return res.json();
        }).then(res => {
           expect(res.result).toEqual("success");
            done();
       });
    });

    

    it('PUT /logout', (done) => {
        fetch(url('/logout'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' ,Cookie: 'sid='+cookie},
        }).then(res => {
            console.log(res.statusText)
                expect(res.statusText).toEqual('OK');
                done();
       });
    });

    it('PUT /headline', (done) => {
        let headline={
            "headline":"Happy"
        }
        fetch(url('/headline'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',Cookie: 'sid='+cookie },
            body: JSON.stringify(headline)
        }).then(res => res.json()).then(res => {
            console.log(res.headline)

                expect(res.headline).toEqual("Happy");
                done();
       });
    });

    it('GET /headline', (done) => {
        fetch(url('/headline/testUser'), {
            method: 'GET',

            headers: { 'Content-Type': 'application/json',Cookie: 'sid='+cookie },
        }).then(res => res.json()).then(res => {
                console.log(res.headline)
                expect(res.headline).toEqual("Happy");
            done();
        });
    });




    it('POST /article', (done) => {
        let post={
            "text":"A new message"
        }
        fetch(url('/article'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',Cookie: 'sid='+cookie },
            body: JSON.stringify(post)
        }).then(res => res.json()).then(res => {
            console.log(res.articles.length)
                expect(res.articles.length).toBe(1);
                done();
       });
    });

    it('GET /articles/id', (done) => {
        fetch(url('/articles/testUser'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',Cookie: 'sid='+cookie },
        }).then(res => res.json()).then(res => {
            console.log(res.articles.length)
                expect(res.articles.length).toBeGreaterThan(0);
                done();
       });
    });

    it('GET /articles', (done) => {
        fetch(url('/articles'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',Cookie: 'sid='+cookie },
        }).then(res => res.json()).then(res => {
            console.log(res.articles.length)
                expect(res.articles.length).toBeGreaterThan(0);
                done();
       });
    });
































    // it("contains spec with an expectation", function() {
    //     expect(true).toBe(true);
    // });

    // it("should respond with hello world", function(done) {
    //     request.get("http://localhost:3000/", function(error, response, body){
    //         console.log("here:"+body)
    //       expect(body).toEqual("API Running");
    //       done();
    //     });
    //   });
    
    //   it('should fail on POST', function (done) {           
    //     request.post("http://localhost:3000/register", {json: true, body: {
    //             "username":"testUser",
    //             "email":"jg125@rice.edu",
    //             "dob":"123-123-1234",
    //             "zipcode":"77030",
    //             "password":"123"
    //     }}, function (error, response,body) {
    //         expect(response.statusCode).toEqual(400);
    //         done();
    //     });
    // });
});




// var user={
//     "username":"testUser",
//     "email":"jg125@rice.edu",
//     "dob":"123-123-1234",
//     "zipcode":"77030",
//     "password":"123"
// }


describe("Hello World Server", function() {

//     it('register new users', function(done){
//         request({
//             url:'http://localhost:3000/register',
//             method:'POST',
//             json:{
//                 "username":"testUser",
//                 "email":"jg125@rice.edu",
//                 "dob":"123-123-1234",
//                 "zipcode":"77030",
//                 "password":"123" 
//             },function (error,response, body) {
//                 console.log(body);
//             }
//         })
//       });
});


