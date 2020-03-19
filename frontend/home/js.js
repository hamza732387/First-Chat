let input = document.getElementById('input');
let div = document.getElementById('div');
Get_Data_From_Database()

let header = new Headers()
header.append('content-type' , 'application/json');
function Add_Data_To_Database() {

fetch('http://localhost:3000/' ,{
    method : 'post',
    headers : header,
    body : JSON.stringify({
        input : input.value
    })
}).then(re=>{
    return re.json()
}).then(data=>{
    console.log(data)
})
}

function Get_Data_From_Database() {
 

    fetch('http://localhost:3000/free' ,{
        method : 'get',
    }).then(re=>{
        return re.json()
    }).then(data=>{
        div.innerHTML = `<div class="div">${data.name}</div>`
    })
    }