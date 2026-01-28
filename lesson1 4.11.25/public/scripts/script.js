let greating = " hello ";
greating += localStorage.getItem('name');
 document.getElementById("greating").innerHTML = greating;
 let allCategories = [];
 let categories = [];
 let allTasks = [];



async function getTasks() {
    try {
        let response = await fetch('/api/tasks')
        if(response.status == 401){
            window.location.href = '/login';
            return;
         }
         let data = await response.json();
        if(response.status == 400){
            alert(data.message);
            return;
        }
        allTasks = data;
        createTable(data);
            
        }
     catch (err) {
        alert(err);
    }
}

function createTable(data) {
          let txt = "";
          for (obj of data) {
              if(obj){
                  let check = obj.isDone ? "checked" : "";
                  let rowClass = obj.isDone ? "class =rowClass" : "";
                  console.log(obj.category_ID);
                  console.log(allCategories);
                  
                  let categoryName = allCategories[obj.category_ID] ? allCategories[obj.category_ID].categoryName : '--';
                  txt += `<tr ${rowClass}>`;
                  txt += `<td><input type="checkbox" ${check} onchange = "taskDone(${obj.id},this)"></td>`
                  txt += `<td>${obj.text}</td>`;
                  txt += `<td>${categoryName}</td>`;
                //   txt += `<td><button onclick = "toggleDone(${obj.id}, ${obj.isDone})">${obj.isDone ? '☑️' : '☐'}</button></td>`;
                  txt += `<td><button onclick = "updateTask(${obj.id})">✏️</button></td>`;
                  txt += `<td><button onclick = "deleteTask(${obj.id})">🗑️</button></td>`;
                  txt += `</tr>`;
              }
  
          }
          document.getElementById("tableBody").innerHTML = txt;
      }
      async function taskDone(id,element) {
              try {
                let isDone = element.checked;                
                let response = await fetch(`/api/tasks/${id}`,{
                    method: 'PATCH',
                    headers: {'Content-type':'application/json'},
                    body: JSON.stringify({isDone})
                })
                    getTasks();
                // document.getElementById('id').value = "";
                // document.getElementById('txt').value = "";
            } catch (err) {
                alert(err);
            }
        }
        async function getCategories() {
    try {
        let response = await fetch('/api/categories')
        if(response.status == 401){
            window.location.href = '/login';
            return;
         }
         let data = await response.json();
        if(response.status == 400){
            alert(data.message);
            return;
        }
        categories = data; // ✔ שומר כמערך
         allCategories = {};
        for(let c of data){
            allCategories[c.id] = c;
        }
        selectCategories(); // ✔ בונה את ה-select
        }
     catch (err) {
        alert(err);
    }
}

 function selectCategories(){
const select = document.getElementById('select');
    select.innerHTML = '<option value="">בחר קטגוריה...</option>';
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.categoryName;
        select.appendChild(option);
    });
    select.onchange = filterTasks;
 }
//   function selectCategories(){
//     let txt = '<option value="0">בחר קטגוריה...</option>';
//     for(obj of data){
//         if(obj){
//             txt += `<option value="${obj.id}">${obj.categoryName}</option>`;
//         }
//     }
//  }

 function filterTasks() {
    let select = document.getElementById('select');
    let selectedCategoryId = select.value;
    
    if (selectedCategoryId === '') {
        createTable(allTasks);
    } else {
        let filteredTasks = allTasks.filter(task => task.category_ID == selectedCategoryId);
        createTable(filteredTasks);
    }
}

async function deleteTask(id) {
    
    const isSure = confirm("האם אתה בטוח שברצונך למחוק את המשימה?");

    if (!isSure) {
        return; // המשתמש ביטל
    }
    try {
        let response = await fetch(`/api/tasks/${id}`, {
            method: 'DELETE'
        })
        let data = await response.json();
        if(!response.ok){
            alert(data.message);
        }
        alert("task deleted");
                getTasks();
        } catch (err) {
        alert(err);
    }
}

async function addNewTask() {
    try {
        let text = document.getElementById('taskInput').value;
        let category_ID = document.getElementById('select').value;
        if(category_ID === 0){
            category_ID = null;
        }
        let response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text,
                category_ID,
                isDone: false
            })
        }).then(response => {
            if (response.status === 201) {
                alert("task added");
                document.getElementById('taskInput').value = "";
                getTasks();
            } else {
                response.json().then(data => {
                    alert(data.message);
                });
            }
        });
    } catch (err) {
        alert(err);
    }
}
   

async function updateTask(id) {
    try {
        let newTask = document.getElementById('taskInput').value;
        let response = await fetch(`/api/tasks/${id}`); 
        let data = await response.json();
        if(!response.ok){
            alert(data.message);
            
        }else{
            document.getElementById('id').value = data.id;
            document.getElementById('taskInput').value = data.text;
        }          
        }
     catch (err) {
        alert(err);
    }
}

function addOrEdit(){
    let id = document.getElementById('id').value;
    if(id){
        EditTask(id);
    }else{
        addNewTask();
    }
}

async function EditTask(id) {
              try {
                let text = document.getElementById('taskInput').value;    
                console.log(text);
                            
                let response = await fetch(`/api/tasks/${id}`,{
                    method: 'PATCH',
                    headers: {'Content-type':'application/json'},
                    body: JSON.stringify({text})
                })
                    getTasks();
                    
                 document.getElementById('taskInput').value = "";
            } catch (err) {
                alert(err);
            }
        }


//selectCategories();
getCategories();
getTasks();