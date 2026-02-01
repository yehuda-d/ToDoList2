let greating = " hello ";
greating += localStorage.getItem('name');
 document.getElementById("greating").innerHTML = greating;
 let allUsers = [];

 async function getAllUsers() {
    try {
        let response = await fetch('/api/users')
        if(response.status == 401){
            window.location.href = '/login';
            return;
         }
         let data = await response.json();
        if(response.status == 400){
            alert(data.message);
            return;
        }
        allUsers = data;
        createTable(data);
            
        }
     catch (err) {
        alert(err);
    }
}

function createTable(data) {
          let txt = "";
          for (obj of data) {
            console.log(obj);
              if(obj){
                txt += `<tr>`;
                  txt += `<td>${obj.name}</td>`;
                  txt += `<td>${obj.email}</td>`;
                  txt += `<td>${obj.userName}</td>`;
                  txt += `<td><button onclick = "updateUser(${obj.id})">✏️</button></td>`;
                  txt += `<td><button onclick = "deleteUser(${obj.id})">🗑️</button></td>`;
                  txt += `</tr>`;
              }
  
          }
          document.getElementById("tableBody").innerHTML = txt;
      }


async function addNewUser() {
    try {
        let name = document.getElementById('nameInput').value;
        let email = document.getElementById('emailInput').value;
        let userName = document.getElementById('userNameInput').value;
        let password = document.getElementById('passwordInput').value;

        let response = await fetch('/api/auth/reg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                userName: userName,
                pass: password
            })
        });

        let data = await response.json();

        if (response.status === 201) {
            alert("user added");
            document.getElementById('nameInput').value = "";    
            document.getElementById('emailInput').value = "";
            document.getElementById('userNameInput').value = "";
            document.getElementById('passwordInput').value = "";
            getAllUsers();
        } else {
            alert(data.message);
        }

    } catch (err) {
        console.error(err);
        alert("Server error");
    }
}

async function deleteUser(id) {
    
    const isSure = confirm("האם אתה בטוח שברצונך למחוק את המשתמש?");

    if (!isSure) {
        return; // המשתמש ביטל
    }
    try {
        let response = await fetch(`/api/users/${id}`, {
            method: 'DELETE'
        })
        let data = await response.json();
        if(!response.ok){
            alert(data.message);
        }
        alert("user deleted");
                getAllUsers();
        } catch (err) {
        alert(err);
    }
}

async function updateUser(id) {
    try {
        let response = await fetch(`/api/users/${id}`); 
        let data = await response.json();
        if(!response.ok){
            alert(data.message);
            
        }else{
            document.getElementById('id').value = data.id;
            document.getElementById('nameInput').value = data.name;
            document.getElementById('emailInput').value = data.email;
            document.getElementById('userNameInput').value = data.userName;
        }          
        }
     catch (err) {
        alert(err);
    }
}

function addOrEdit(){
    let id = document.getElementById('id').value;
    if(id){
        EditUser(id);
    }else{
        addNewUser();
    }
}

async function EditUser(id) {
              try {
                let name = document.getElementById('nameInput').value;      
                let email = document.getElementById('emailInput').value;
                let userName = document.getElementById('userNameInput').value;
                console.log(name, email, userName);

                let response = await fetch(`/api/users/${id}`,{
                    method: 'PATCH',
                    headers: {'Content-type':'application/json'},
                    body: JSON.stringify({name, email, userName})
                })
                if (!response.ok) {
            // אם השרת מחזיר שגיאה, נקרא אותה כטקסט כדי לראות מה קרה
            let text = await response.text(); 
            console.error("Server Error:", text); // תסתכל בקונסול של הדפדפן מה מודפס כאן
            alert("שגיאת שרת: ראה קונסול");
            return;
        }
                    getAllUsers();
                    
                 document.getElementById('nameInput').value = "";
                 document.getElementById('emailInput').value = "";
                 document.getElementById('userNameInput').value = "";
            } catch (err) {
                alert(err);
            }
        }
getAllUsers();