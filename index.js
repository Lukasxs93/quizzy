
// getting the data from opentdb.com
fetch('https://opentdb.com/api.php?amount=10&category=21&type=multiple')
// unpacking the jason file 
.then(response =>  response.json() )

.then(data =>  { 
  // for each object in the data we perform an action 
    for (let i = 0; i < data.results.length; i++) {
  // makeid generates a unique id to be added to the signle element in the object
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
  // shuffle rearanges the order of the answers so they are less predictable   
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
  // validate checks if the answer is correct or incorrect and injects a class to the button to style and produce feedback
  
    function validate(idValue){
      let elem = document.getElementById(idValue).innerHTML;
      
       if(solutions.includes(elem)){
          document.getElementById(idValue).classList.toggle('correct');
          
       }else{
        document.getElementById(idValue).classList.toggle('incorrect');
       }
    }
         
        let allAnswers = data.results[i].incorrect_answers;
        let rightAnswer = data.results[i].correct_answer;
        // creating an array of  all answers (no matter if correct or incorrect )
         allAnswers.push(rightAnswer);
        // creating an array of all the right answers for validation purposes
        let solutions = [];
        solutions.push(rightAnswer);
        shuffle(allAnswers);
       let score = document.querySelectorAll('#main-div .specific-class').length;

        let ques = data.results[i].question;
        
        console.log(solutions);
        console.log(data);
      
        let questionItem = document.createElement('div');
       
        questionItem.className='question';
       //generating an array of 4 ids to be assigned to each answer. 
        var idArray = [makeid(5),makeid(5),makeid(5),makeid(5)]
        
        //generating html that displays a question and 4 andswers, the question has  calss "question" while the div containint the answers has 
        //class "answer_container", every answer has a class "answer " and unique id given by idArray.
        questionItem.innerHTML =`
        
        <h2>${ques}</h2><br>
        <div class="answer_container">
          <button class="answer " id="${idArray[0]}">${allAnswers[0]}</button>
          <button class="answer " id="${idArray[1]}">${allAnswers[1]}</button>
          <button class="answer " id="${idArray[2]}">${allAnswers[2]}</button>
          <button class="answer " id="${idArray[3]}">${allAnswers[3]}</button>
        </div>
        `;
        
        
        document.body.appendChild(questionItem);       
        //adding event listener to the buttons.
        document.getElementById(idArray[0]).addEventListener('click',validate.bind(this,idArray[0]),false);
        document.getElementById(idArray[1]).addEventListener('click',validate.bind(this,idArray[1]),false);
        document.getElementById(idArray[2]).addEventListener('click',validate.bind(this,idArray[2]),false);
        document.getElementById(idArray[3]).addEventListener('click',validate.bind(this,idArray[3]),false);
       
    }  
    
   

} )



fetch('https://opentdb.com/api.php?amount=10')
.then(data => console.log(data.json()))
