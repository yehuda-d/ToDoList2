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

//       async function addNewUser() {
//     try {
//         let name = document.getElementById('nameInput').value;
//         let email = document.getElementById('emailInput').value;
//         let userName = document.getElementById('userNameInput').value;
//         let password = document.getElementById('passwordInput').value;
//         let response = await fetch('http://localhost:3800/users', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 name,
//                 email,
//                 userName,
//                 pass: password
//             })
//         }).then(response => {
//             if (response.status === 201) {
//                 alert("user added");
//                 document.getElementById('nameInput').value = "";    
//                 document.getElementById('emailInput').value = "";
//                 document.getElementById('userNameInput').value = "";
//                 document.getElementById('passwordInput').value = "";
//                 getAllUsers();
//             } else {
//                 response.json().then(data => {
//                     alert(data.message);
//                 });
//             }
//         });
//     } catch (err) {
//         alert(err);
//     }
// }

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
                name,
                email,
                userName,
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
getAllUsers();