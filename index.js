

fetch('https://opentdb.com/api.php?amount=10')

.then(response =>  response.json() )

.then(data =>  {
    for (let i = 0; i < data.results.length; i++) {
        let ques = data.results[i].question;
        let questionItem = document.createElement('div');
        questionItem.innerHTML =`<h2>${ques}</h2>`;
        document.body.appendChild(questionItem);
       
    }  

} )
.then( )


fetch('https://opentdb.com/api.php?amount=10')
.then(data => console.log(data.json()))
