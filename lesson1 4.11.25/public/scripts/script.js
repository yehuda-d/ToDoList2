let greating = " hello ";
greating += localStorage.getItem('name');
 document.getElementById("greating").innerHTML = greating;


async function getTasks() {
    try {
        let response = await fetch('/tasks')
        if(response.status == 401){
            window.location.href = '/login';
            return;
         }
         let data = await response.json();
        if(response.status == 400){
            alert(data.message);
            return;
        }
        creatTable(data);
            
        }
     catch (err) {
        alert(err);
    }
}

function creatTable(data) {
          let txt = "";
          for (obj of data) {
              if(obj){
                  let check = obj.isDone ? "checked" : "";
                  let rowClass = obj.isDone ? "class =rowClass" : "";
                  txt += `<tr ${rowClass}>`;
                  txt += `<td><input type="checkbox" ${check} onchange = "taskDone(${obj.id},this)"></td>`
                  txt += `<td>${obj.text}</td>`;
                  txt += `<td>${obj.category_ID}</td>`;
                //   txt += `<td><button onclick = "toggleDone(${obj.id}, ${obj.isDone})">${obj.isDone ? '☑️' : '☐'}</button></td>`;
                  txt += `<td><button onclick = "taskById(${obj.id})">✏️</button></td>`;
                  txt += `<td><button onclick = "deleteTask(${obj.id})">🗑️</button></td>`;
                  txt += `</tr>`;
              }
  
          }
          document.getElementById("tableBody").innerHTML = txt;
      }
      async function taskDone(id,element) {
              try {
                let isDone = element.checked;                
                let response = await fetch(`/tasks/${id}`,{
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
getTasks();