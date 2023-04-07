let arr;
function findAll() {
    $.ajax({
        url: "http://localhost:8080/smartphones",
        type: "GET",
        success(data) {
            let arr = data
            let context = `<table border="1"><tr>
                            <th>STT</th>
                            <th>Producer</th>
                            <th>Model</th>
                            <th>Price</th>
                            <th colspan="2">Action</th>
                            </tr>`
            for (let i = 0; i < arr.length; i++) {
                context += `<tr>
                            <td>${i + 1}</td>
                            <td>${arr[i].producer}</td> 
                            <td> ${arr[i].model}</a></td>
                            <td>${arr[i].price}</td>
                            <td><button onclick="updateForm(${arr[i].id})">Update</button></td>
                          
                            <td><button onclick="deletePhone(${arr[i].id})">Delete</button></td>
                            </tr>`
            }
            context += `</table>`
            document.getElementById("display").innerHTML = context
            $("#form").hide()
            $("#display").show()
        }
    })
}
function createForm() {
    $("#producer").val("")
    $("#model").val("")
    $("#price").val("")
    document.getElementById("title").innerHTML = "Create Form"
    $("#form").show()
    document.getElementById("action").setAttribute("onclick", "createPhone()")
    document.getElementById("action").innerHTML = "Create"
    $("#display").hide()
}
function createPhone(){
    let smartPhone = {
        producer: $("#producer").val(),
        model: $("#model").val(),
        price: $("#price").val(),
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/smartphones",
        type: "POST",
        data: JSON.stringify(smartPhone),
        success() {
            findAll()
        }
    })
    event.preventDefault()
}
function updateForm(id){
    $.ajax({
        url: `http://localhost:8080/smartphones/${id}`,
        type: "GET",
        success(data){
            $("#producer").val(data.producer)
            $("#model").val(data.model)
            $("#price").val(data.price)
            document.getElementById("title").innerHTML="Update form"
            $("#form").show()
            document.getElementById("action").setAttribute("onclick",`updatePhone(${id})`)
            document.getElementById("action").innerHTML="Update"
            $("#display").hide()
        }
    })
}
function updatePhone(id){
    let smartphone = {
        id: id,
        producer: $("#producer").val(),
        model: $("#model").val(),
        price: $("#price").val(),
    }
    $.ajax({
        url: "http://localhost:8080/smartphones",
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(smartphone),
        success() {
            findAll()
        }
    })
    event.preventDefault()
}
function deletePhone(id) {
    if (confirm("Are You Sure To Delete This Phone?")) {
        $.ajax({
            url: `http://localhost:8080/smartphones/${id}`,
            type: "DELETE",
            success() {
                findAll()
            }
        })
    }
}
function backHome() {
    $("#form").hide()
    $("#detail").hide()
    $("#display").show()
    event.preventDefault()
}