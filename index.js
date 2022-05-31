

fetch('https://opentdb.com/api.php?amount=10&category=21&type=multiple')

.then(response =>  response.json() )

.then(data =>  {
    for (let i = 0; i < data.results.length; i++) {
        
        function shuffle(answers){
            let currentIndex = answers.length;
            let randomIndex;
            while(currentIndex != 0 ){
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex --;
              [answers[currentIndex], answers[randomIndex]]=[ answers[randomIndex], answers[currentIndex]];
            }
            return answers;
        }   
        let wrongAnswers = data.results[i].incorrect_answers;
        let rightAnswer = data.results[i].correct_answer;
         wrongAnswers.push(rightAnswer);
        let solutions = [];
        solutions.push(rightAnswer);
        shuffle(wrongAnswers);

        
        let ques = data.results[i].question;
        console.log(solutions);
      
        let questionItem = document.createElement('div');
       
        questionItem.className='question';
        
        questionItem.innerHTML =`
        
        <h2>${ques}</h2><br>
        <ul>
          <li>${wrongAnswers[0]}</li>
          <li>${wrongAnswers[1]}</li>
          <li>${wrongAnswers[2]}</li>
          <li>${wrongAnswers[3]}</li>
        </ul>
        `;
        document.body.appendChild(questionItem);       
        
       
    }  


} )
.then( )


fetch('https://opentdb.com/api.php?amount=10')
.then(data => console.log(data.json()))
