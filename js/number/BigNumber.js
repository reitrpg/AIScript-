class BigNumber{


constructor(value=0){

this.value=Number(value);

}



add(value){

this.value+=Number(value);

}



subtract(value){

this.value-=Number(value);

}



toString(){

return this.value.toString();

}



toJSON(){

return this.value;

}



static from(value){

return new BigNumber(value);

}



}



export default BigNumber;