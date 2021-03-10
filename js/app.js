function getList(){
    var existingData  =  window.localStorage.getItem("todoList");
    if(existingData != null){
        return  JSON.parse(existingData)
    }
    return [];
}

function render(){
    var list  = getList();
    $(".todoList").html("");
    list.forEach(function(item){
        console.log(item)
        $(".todoList").append(`
            <li>
                    <div class="itemList ${item.status?"completed":""}">
                        <div class="checkBox">
                            <input type="checkbox" ${item.status?"checked='checked'":""} onchange="markAsComplete(${item.id})"/>
                        </div>
                        <div class="content">
                            <p>${item.name}</p>
                            <span>26th Oct 2020</span>
                        </div>
                        <div  class="deleteBtn">
                            <button class="btn btn-danger btn-sm" onclick="deleteItem(${item.id})">
                                <i class="fa fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </li>
        `);
    });
    if(list.length == 0){
        $(".todoList").append(`
            <li>
                <p>No Task added</p>
            </li>
        `);
    }
}


$("#addTaskBtn").click(function(){
    var taskDetails   =     $("#task_name").val();
    if(taskDetails.trim().length != 0){
        var list  = getList();
        var id = list.length + 1
        list.push({
            'id':id,
            'name':taskDetails,
            'date':(new Date()),
            'status':false
        });
        window.localStorage.setItem("todoList",JSON.stringify(list))
        $("#task_name").val("");
    }
    $("#task_name").focus();
    render();
})

function markAsComplete(id){
    var list  = getList();
    list.forEach((item)=>{
        if(item.id == id){
            item.status = !item.status
        }
    })
    window.localStorage.setItem("todoList",JSON.stringify(list))
    render();
}

function deleteItem(id){
    var list  = getList();
    window.localStorage.setItem("todoList",JSON.stringify(list.filter((item)=>{
        return item.id != id
    })));
    render();
}


$(document).ready(function(){
    render();
})