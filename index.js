

fetch('https://opentdb.com/api.php?amount=10&category=21&type=multiple')

.then(response =>  response.json() )

.then(data =>  {
    for (let i = 0; i < data.results.length; i++) {
      function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }
        
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

    function validate(idValue){
      let elem = document.getElementById(idValue).innerHTML;
       if(solutions.includes(elem)){
          document.getElementById(idValue).className += ' correct';
       }else{
        document.getElementById(idValue).className +=' incorrect';
       }
    }
         
        let wrongAnswers = data.results[i].incorrect_answers;
        let rightAnswer = data.results[i].correct_answer;
         wrongAnswers.push(rightAnswer);
        let solutions = [];
        solutions.push(rightAnswer);
        shuffle(wrongAnswers);

        
        let ques = data.results[i].question;
        
        console.log(solutions);
        console.log(data);
      
        let questionItem = document.createElement('div');
       
        questionItem.className='question';

        var idArray = [makeid(5),makeid(5),makeid(5),makeid(5)]
        
        
        questionItem.innerHTML =`
        
        <h2>${ques}</h2><br>
        <div class="answer_container">
          <button class="answer " id="${idArray[0]}">${wrongAnswers[0]}</button>
          <button class="answer " id="${idArray[1]}">${wrongAnswers[1]}</button>
          <button class="answer " id="${idArray[2]}">${wrongAnswers[2]}</button>
          <button class="answer " id="${idArray[3]}">${wrongAnswers[3]}</button>
        </div>
        `;
        
        
        document.body.appendChild(questionItem);       
        document.getElementById(idArray[0]).addEventListener('click',validate.bind(this,idArray[0]),false);
        document.getElementById(idArray[1]).addEventListener('click',validate.bind(this,idArray[1]),false);
        document.getElementById(idArray[2]).addEventListener('click',validate.bind(this,idArray[2]),false);
        document.getElementById(idArray[3]).addEventListener('click',validate.bind(this,idArray[3]),false);
       
    }  
    

} )



fetch('https://opentdb.com/api.php?amount=10')
.then(data => console.log(data.json()))
