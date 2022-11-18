var prev_card;
var num_row_col=4
var count_open_cards=0
var dyn_matrix = new Array(num_row_col);
const empty_word="None"
const id_progress_text="progress"
const que_card_img="pics\\que_card.png"
var paires_found=0

var pics_array=["pics\\artistkitty.jpg",
    "pics\\cupid.jpg" ,"pics\\falafel.jpg","pics\\frog.jpg",
    "pics\\kuromi.jpg","pics\\mapledog.jpg",
    "pics\\pinguein.jpg","pics\\sleepybunny.jpg"]

function create_matrix()
{
    // initialize matrix to 4X4
    for (var i = 0; i < dyn_matrix.length; i++) 
    {
        dyn_matrix[i] = new Array(num_row_col);
        for (var j = 0; j < 4; j++) 
        {
            dyn_matrix[i][j] = empty_word         
        }
    }
    
}

function init_game(){
    paires_found=0
    document.getElementById(id_progress_text).innerHTML=paires_found+"/8 pairs opened"                 
    create_matrix()
    fill_matrix_with_pics()
}

function generateRandomFloatInRange(min=0, max=3) {
    var generate_row=Math.floor(Math.random() * (max - min + 1)) + min;
    var generate_col=Math.floor(Math.random() * (max - min + 1)) + min;
    return [generate_row,generate_col];
}

function fill_matrix_with_pics(){
    console.log(dyn_matrix,"init mat")
    //double spread cards
    for(var c=0;c<2;c++)
    {
    
    for(var i=0;i<pics_array.length;i++)
    { 
        var return_array=generateRandomFloatInRange()
        var rand_row=return_array[0]
        var rand_col=return_array[1]
       //var check=dyn_matrix[rand_row][rand_col]
      
       while( dyn_matrix[rand_row][rand_col]!="None")
        {
         return_array=generateRandomFloatInRange()
         rand_row=return_array[0]
         rand_col=return_array[1]
        }
      
        dyn_matrix[rand_row][rand_col]=pics_array[i]
        //place pics by id of tag
        var chained_id=rand_row.toString()+rand_col.toString()
        //console.log(chained_id)
        document.getElementById(chained_id).src=que_card_img
    }
}
console.log("check")
console.log(dyn_matrix)
}

function cellClicked(id){
    console.log(id)
    //slice string   
    count_open_cards+=1
    document.getElementById(id).src=dyn_matrix [parseInt(id[0])]
     [parseInt(id[1])] 
     //sleep
     
    if(count_open_cards==2){
        setTimeout(function(){
        //dependin on an existing prev card + thats the second pair
        //show card
        //check if correct 

        if(dyn_matrix [id[0]] [id[1]] == find_card_by_id(prev_card))
        {
            console.log("match found!");
            paires_found+=1
            document.getElementById(id_progress_text).innerHTML=paires_found+"/8 pairs opened"        
            if(paires_found==8){
                Swal.fire(
                    'Good job!',
                    'You found all pairs!',
                    'success'
                  )
            }
        }
        else{
            console.log("match not found!");
            document.getElementById(prev_card).src=que_card_img        
            document.getElementById(id).src=que_card_img
           
        }
        count_open_cards=0
           //if it doesnt match change background to white
        }, 500); 
    }

    
    else{
        //waiting for second pair 
        prev_card=id // ex "01"
    }

}

function find_card_by_id(card_id){
   return dyn_matrix[card_id[0]][card_id[1]]
}