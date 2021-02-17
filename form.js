class Form {

    constructor() {
     
     
    }
    hide(){
      this.instruction.hide();
      this.button.hide();
      
    }
  
    display(){
       this.button = createButton('OK');
      this.instruction = createElement('h2');
      var title = createElement('h3')
      title.html("INSTRUCTIONS");

      push()
      textSize(40)
      fill("white")
      text("hello",100,100)
      pop()




      title.position(displayWidth/2 , displayHeight/2 - 200);
      this.instruction.html("-use right and left arrow keys to move")
     
      this.instruction.position(displayWidth/2 - 70,displayHeight /4 );
      
      this.button.position(displayWidth/2 +30, displayHeight/2 );
  
      this.button.mousePressed(()=>{
        this.instruction.hide();
        this.button.hide();
         title.hide()
       
      });
  
    }
  }
  