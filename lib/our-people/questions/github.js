

export default {


    type: "input",
    name: "github",
    message: "Please enter your github handle :-",


    filter: function(val){
        return "https://github.com/" + val;
    }
}