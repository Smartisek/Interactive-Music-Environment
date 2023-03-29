class Balloon{
    constructor(balloonX,balloonY, sizeBalloon){
        this.balloonX = balloonX;
        this.balloonY = balloonY;
        this.sizeBalloon = sizeBalloon;
        this.speedX = random(3,6);
        this.speedY = random(2,5);
        this.color = ("khaki");
    }
    show(){
        noStroke();
        fill(this.color);
        ellipse(this.balloonX, this.balloonY, 2*this.sizeBalloon,2*this.sizeBalloon);
    }
    move(){
        this.balloonX = this.balloonX + this.speedX;
        this.balloonY = this.balloonY + this.speedY;
    }
    collide(){
        if(this.balloonX+this.sizeBalloon/2 >= 550){
            this.speedX = this.speedX * -1;
            piano1.play();
            this.color = "khaki";
        } else if(this.balloonX-this.sizeBalloon <=200){
            piano1.play();
            this.color = "khaki";
            this.speedX = this.speedX * -1;
        }
        if(this.balloonY+this.sizeBalloon/2 >= 700){
            this.speedY = this.speedY * -1;
        } else if(this.balloonY-this.sizeBalloon <=255){
            this.speedY = this.speedY * -1;
        }
    }
    intersect(other){
        let distance = dist(this.balloonX, this.balloonY, other.balloonX, other.balloonY);
        if(distance <= this.sizeBalloon + other.sizeBalloon){
            this.color = "SlateBlue";
            return true;
        } else {
            return false;
        }
    }
    changeDirection(){
        this.speedX = this.speedX * -1;
        this.speedY =  this.speedY * -1;
    }
    mouseInteraction(){
        if(mouseIsPressed && dist(mouseX, mouseY, this.balloonX, this.balloonY)<this.sizeBalloon){
            // console.log("Inside");
            this.color = "lightBlue";
            guitar.play();
       
        }
    }
}