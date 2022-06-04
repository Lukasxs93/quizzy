let solutions = [];
let score=0;
function findSiblings(idValue){
  let siblings = [];
       let sibling = document.getElementById(idValue).parentNode.firstChild;
       while(sibling){
        if (sibling.nodeType === 1 && sibling !== idValue) {
          siblings.push(sibling.id);
      }
      sibling = sibling.nextSibling;             
  }return siblings;
}
function validate(idValue){
  let elem = document.getElementById(idValue).innerHTML;
   if(solutions.includes(elem)){
      document.getElementById(idValue).classList.toggle('correct');
      score ++ ;
      let scoreItem = document.createElement('div');
      let siblings=findSiblings(idValue); 
      for(let i = 0; i< siblings.length; i++){
        document.getElementById(siblings[i]).disabled= true;
      }      
     if(document.getElementById('score') !== null){
      document.getElementById('score').remove();      
     }
     
    scoreItem.innerHTML=`<h1 id="score">${score}</h1>`;
    document.body.appendChild(scoreItem);
      
   }else{
    document.getElementById(idValue).classList.toggle('incorrect');
    score-=0.5;
    let scoreItem = document.createElement('div');
    if(document.getElementById('score') !== null){
      document.getElementById('score').remove();
    }
    scoreItem.innerHTML=`<h1 id="score">${score}</h1>`;
    document.body.appendChild(scoreItem);
}
}
// getting the data from opentdb.com
fetch('https://opentdb.com/api.php?amount=10&category=21&type=multiple')
// unpacking the jason file 
.then(response =>  response.json() )
.then(data => { const array1 = data.results.map((result) => { return {published: false,counter: 0, ...result} });
   return array1;
})

.then(array1 =>  { 
  console.log(array1);
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
// function validate(idValue){
//   let elem = document.getElementById(idValue).innerHTML;
//    if(solutions.includes(elem)){
//       document.getElementById(idValue).classList.toggle('correct');
//       score ++ ;
//       let scoreItem = document.createElement('div');
//      if(document.getElementById('score') !== null){
//       document.getElementById('score').remove();      
//      }
     
//     scoreItem.innerHTML=`<h1 id="score">${score}</h1>`;
//     document.body.appendChild(scoreItem);
      
//    }else{
//     document.getElementById(idValue).classList.toggle('incorrect');
//     score-=0.5;
//     let scoreItem = document.createElement('div');
//     if(document.getElementById('score') !== null){
//       document.getElementById('score').remove();
//     }
//     scoreItem.innerHTML=`<h1 id="score">${score}</h1>`;
//     document.body.appendChild(scoreItem);
//    }
// }



  // for each object in the data we perform an action 
    for (let i = 0; i < array1.length; i++) {
 
      let wrongAnswers = array1[i].incorrect_answers;
      let rightAnswer = array1[i].correct_answer;
        
        // creating an array of  all answers (no matter if correct or incorrect )
         wrongAnswers.push(rightAnswer);
        // creating an array of all the right answers for validation purposes
        solutions.push(rightAnswer)
        shuffle(wrongAnswers);
        
        
        let ques = array1[i].question;
        
       
      
        let questionItem = document.createElement('div');
       
        questionItem.className='question';
       //generating an array of 4 ids to be assigned to each answer. 
        var idArray = [makeid(5),makeid(5),makeid(5),makeid(5)]
        
        //generating html that displays a question and 4 andswers, the question has  calss "question" while the div containint the answers has 
        //class "answer_container", every answer has a class "answer " and unique id given by idArray.
        questionItem.innerHTML =`
        
        <h2>${ques}</h2><br>
        <div class="answer_container">
          <button class="answer  ${[i]}" id="${idArray[0]}">${wrongAnswers[0]}</button>
          <button class="answer  ${[i]}" id="${idArray[1]}">${wrongAnswers[1]}</button>
          <button class="answer  ${[i]}" id="${idArray[2]}">${wrongAnswers[2]}</button>
          <button class="answer  ${[i]}" id="${idArray[3]}">${wrongAnswers[3]}</button>
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
