/// setting up variable

// let theInput = document.querySelector(".task-add input");
// let buttonAdd = document.querySelector(".task-add .plus");
// let textContent = document.querySelector(".task-content");
// let taskCount = document.querySelector(".task-status .task-count span");
// let taskComplete = document.querySelector(".task-status .task-complete span");
// window.onload = function() {
//     theInput.focus();
// }

// buttonAdd.onclick = function(){
//     // check input is empty
//     if(theInput.value === ""){
//         Swal.fire({
//             title: "can you set input empty",
//             text: "That thing is still around?",
//             icon: "question"
//           });
//     }else {
//         let noTask = document.querySelector(".task-content .no-task-message");
//         // remove no task
//         if(document.body.contains(document.querySelector('.no-task-message'))){
//             noTask.remove();
//         }
//         // add task
//         let taskBox = document.createElement("span");
//         taskBox.setAttribute('class','task-box');
//         textContent.appendChild(taskBox);
//         taskBox.appendChild(document.createTextNode(theInput.value));
//         console.log(taskBox.textContent);
//         // create delete button
//         let buttonDelete = document.createElement('span');
//         buttonDelete.setAttribute('class','delete');
//         buttonDelete.appendChild(document.createTextNode('Delete'));
//         taskBox.appendChild(buttonDelete);
//         theInput.value = "";
//         theInput.focus();
//         //claculate tasks
//         calculationTasks();
//     }
// }
// /// remove // finished

// document.addEventListener('click',function(e){
//     /// delete task
//     if(e.target.className == 'delete'){
//         e.target.parentNode.remove();
//         if(textContent.childElementCount == 0){
//             createNoTaskMessage();
//         }
//     }
//     // finished task
//     if(e.target.classList.contains('task-box')){
//         e.target.classList.toggle('finished');
//     }
//     calculationTasks();

// });

// /// create no task message
// function createNoTaskMessage(){
//     let spanMsg = document.createElement('span');
//     let textMsg = document.createTextNode('No Task To Show');
//     spanMsg.appendChild(textMsg);
//     spanMsg.className = 'no-task-message';
//     textContent.appendChild(spanMsg);
// }
// /// Function to calculate task 
// function calculationTasks(){
//     // task count
//     taskCount.innerHTML = document.querySelectorAll('.task-content .task-box').length;
//     // task complete
//     taskComplete.innerHTML = document.querySelectorAll('.task-content .finished').length;

// }


/////////////////////////////////////////////////////////

let input = document.querySelector(".input");
let submit = document.querySelector(".plus");
let taskDiv = document.querySelector(".task-box");
let count = document.querySelector(".count");
let complete = document.querySelector(".complete");

let arrayOfTasks = [];/// Empty Array to store Tasks
if(window.localStorage.getItem("task")){
    arrayOfTasks = JSON.parse(window.localStorage.getItem("task"));
}


submit.onclick = function(){
    if(input.value !== ""){
        addTaskToArray(input.value);
        input.value = ""; /// Empty input 
    }
}

function addTaskToArray(taskText){
    // Task Data
    const task = {
        id: Date.now(),
        title: taskText,
        complete: false,
    }
    // add task to array
    arrayOfTasks.push(task);
    // Add task to page
    addTaskToPage(arrayOfTasks);
    // Add data to localStorage from array of tasks
    addDataToLocalStorageFrom(arrayOfTasks);
}
function addTaskToPage(arrayOfTasks) {
    taskDiv.innerHTML = "";
    arrayOfTasks.forEach(task => {
        /// create main div
        let ele = document.createElement("div");
        ele.className = "task";
        if(task.complete){
            ele.className = "task done"
        }
        ele.setAttribute("data-id",task.id);
        let taskText = document.createTextNode(task.title);
        ele.appendChild(taskText);

        // create delete button
        let deleteButton = document.createElement("span");
        deleteButton.className = "del";
        deleteButton.appendChild(document.createTextNode("Delete"));
        ele.append(deleteButton);
        taskDiv.appendChild(ele);
    });
    calculateCountandComplete();
}
function addDataToLocalStorageFrom(arrayOfTasks){
    window.localStorage.setItem('task',JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("task");
    if(data){
        let task = JSON.parse(data);
        addTaskToPage(task);
    }
}
getDataFromLocalStorage();
let buttonDelete = document.querySelector(".del");
taskDiv.addEventListener('click',(e)=>{
    if(e.target.classList.contains("del")){
        deleteTaskFromLocalStorage(e.target.parentElement.getAttribute('data-id'));
        e.target.parentElement.remove();
    }
    if(e.target.classList.contains('task')){
        toggleStatusTask(e.target.getAttribute("data-id"));
        e.target.classList.toggle('done');
    }
    calculateCountandComplete();
});
function deleteTaskFromLocalStorage(taskText){
    arrayOfTasks = arrayOfTasks.filter((e)=> e.id != taskText);
    addDataToLocalStorageFrom(arrayOfTasks);
}
function calculateCountandComplete(){
    complete.innerHTML = document.querySelectorAll(".task-box .done").length;
    count.innerHTML = document.querySelectorAll(".task-box .task").length;
}
function toggleStatusTask(doneTask){
    for (let i = 0; i < arrayOfTasks.length; i++){
        if(arrayOfTasks[i].id == doneTask){
            arrayOfTasks[i].complete == false ? (arrayOfTasks[i].complete = true):(arrayOfTasks[i].complete = false);
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}
document.querySelector(".deleteAll").onclick = function(){
    taskDiv.innerHTML = "";
    window.localStorage.removeItem("task");
    calculateCountandComplete();
}