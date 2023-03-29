class Square{
    constructor(squareX,squareY,sizeSquare){
        this.squareX = squareX;
        this.squareY = squareY;
        this.sizeSquare = sizeSquare;
        this.speedSquareX = random(2,4);
        this.speedSquareY = random(2,5);
        this.color = "lightPink";
    }
    show(){
        noStroke();
        fill(this.color);
        rect(this.squareX, this.squareY, this.sizeSquare);
    }
    move(){
        this.squareX = this.squareX + this.speedSquareX;
        this.squareY = this.squareY + this.speedSquareY;
    }
    collide(){
        if(this.squareX+this.sizeSquare >= 1000){
            this.speedSquareX = this.speedSquareX * -1;
            this.color = "lightPink";
            kalimba.play();
        } else if(this.squareX <=640){
            this.color = "lightPink";
            kalimba.play();
            this.speedSquareX = this.speedSquareX * -1;
        }
        if(this.squareY+this.sizeSquare >=700){
            this.color = "lightPink";
            this.speedSquareY = this.speedSquareY * -1;
        } else if(this.squareY<=250){
            this.color = "lightPink";
            this.speedSquareY = this.speedSquareY * -1;
        }
    }
    changeDirection(){
        this.speedSquareX = this.speedSquareX * -1;
        this.speedSquareY = this.speedSquareY * -1;
    }
    intersect(other){
        let squareWidth = this.squareX + this.sizeSquare;
        let squareHeight = this.squareY + this.sizeSquare;
        if(squareWidth > other.squareX && squareHeight > other.squareY && other.squareX+other.sizeSquare > this.squareX && other.squareY + other.sizeSquare > this.squareY){
            this.color = "IndianRed";
            return true;
        } else {
            return false;
        }
    }
    mouseInteraction(){
       if(mouseIsPressed && mouseX > this.squareX && mouseX < this.sizeSquare+this.squareX && mouseY > this.squareY && mouseY < this.squareY+this.sizeSquare){
        this.color = "khaki";
        horn.play();
       }
}
}