
var fs = require('fs');
var result={};
var Obj = {};

function csvfiles(data , result){
  fs.readFileSync(data).toString().split('\n').forEach(function (lineContent) {
    var line = lineContent.split(",");
//console.log(line);
    var statename = line[3];

          if(Obj[statename] != null){

        var state = Obj[statename];
      // console.log("if");
        state.illiterateMales= +state.illiterateMales + +line[10];
        state.illiterateFemales= +state.illiterateFemales + +line[11];
        state.literateMales= +state.literateMales + +line[13];
        state.literateFemales= +state.literateFemales + +line[14];
     console.log(Obj);
// console.log(state);
     }
     else{
        var tempArray = {};
        // console.log("else");
        tempArray["illiterateMales" ]= line[10];
        tempArray["illiterateFemales" ]= line[11];
        tempArray["literateMales"]= line[13];
        tempArray["literateFemales"]= line[14];
  //console.log(tempArray);
        Obj[statename] = tempArray;

      }

  });
}
csvfiles("India2011.csv" , Obj);
csvfiles("IndiaSC2011.csv" ,Obj);
csvfiles("IndiaST2011.csv" ,Obj);

//removes the items
delete Obj["Area Name"];
delete Obj["undefined"];

var firstrequirment =  [];
var neStates = ["State - ARUNACHAL PRADESH" , "State - NAGALAND" , "State - MANIPUR", "State - MIZORAM" , "State - TRIPURA" , "State - MEGHALAYA" , "State - ASSAM"];
var secondrequirment= [];
 var stateWiseComparision = [];

function TotalLiteracy(Obj){

  var literateMales = 0, illiterateMales =0 , literateFemales=0,illiterateFemales=0;
  var neLiterateFemales=0,neIlliterateFemales=0,neLiterateMales=0,neIlliterateMales=0;
  var stateWiseLiterate=0,stateWiseIlliterate=0;

  for(var i in Obj){

    var value = Obj[i];
 //console.log(Obj[i]);
 //first json
    literateMales += value.literateMales;
    illiterateMales += value.illiterateMales;
    literateFemales += value.literateFemales;
    illiterateFemales += value.illiterateFemales;
//second json
    if(neStates.indexOf(i) != -1){
      neLiterateFemales += value.literateFemales;
      neIlliterateFemales +=value.illiterateFemales;
      neLiterateMales +=value.literateMales;
      neIlliterateMales += value.illiterateMales;

    }
//third json
    var literate_Illetrate = {};
    literate_Illetrate.statename = i;
    literate_Illetrate.totalLiterate = value.literateMales + value.literateFemales;
    literate_Illetrate.totalIlliterate = value.illiterateMales + value.illiterateFemales;

    stateWiseComparision.push( literate_Illetrate);
  }

  firstrequirment.push({"Total": "Literate Male" , "value" : literateMales});
  firstrequirment.push({"Total": "Illiterate Male" , "value" : illiterateMales});
  firstrequirment.push({"Total": "Literate Female" , "value" : literateFemales});
  firstrequirment.push({"Total": "Illiterate Female" , "value" : illiterateFemales});

  secondrequirment.push({"Total": "Literate Male" , "value" : neLiterateMales});
  secondrequirment.push({"Total": "Illiterate Male" , "value" : neIlliterateMales});
  secondrequirment.push({"Total": "Literate Female" , "value" : neLiterateFemales});
  secondrequirment.push({"Total": "Illiterate Female" , "value" : neIlliterateFemales});

}
TotalLiteracy(Obj);

 fs.writeFileSync('first.json',JSON.stringify(firstrequirment,null,2),'utf8');
 fs.writeFileSync('second.json',JSON.stringify(secondrequirment,null,2),'utf8');
 fs.writeFileSync('third.json',JSON.stringify(stateWiseComparision,null,2),'utf8');
