let greating = " hello ";
greating += localStorage.getItem('name');
 document.getElementById("greating").innerHTML = greating;
 let categories = [];

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
        categories = data;
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
                  let categoryName = obj.categoryName || 'לא מוגדר';
                  let user_id = obj.user_id || 'לא מוגדר';
                  txt += `<tr>`;
                  txt += `<td>${categoryName}</td>`;
                  txt += `<td>${user_id}</td>`;
                  txt += `<td><button onclick = "updateCategory(${obj.id})">✏️</button></td>`;
                  txt += `<td><button onclick = "deleteCategory(${obj.id})">🗑️</button></td>`;
                  txt += `</tr>`;
              }
  
          }
          document.getElementById("tableBody").innerHTML = txt;
      }

      async function addNewCategory() {
    try {
        let name = document.getElementById('nameInput').value;
        // אין צורך לשלוח user_id, השרת לוקח אותו מההתחברות (req.user.id)

        let response = await fetch('/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                categoryName: name // השינוי החשוב: name -> categoryName
            })
        });

        let data = await response.json();

        if (response.status === 201) {
            alert("Category added successfully");
            document.getElementById('nameInput').value = "";
            getCategories(); // רענון הטבלה
        } else {
            // השרת מחזיר לפעמים error ולפעמים message, נציג את מה שיש
            alert(data.message || data.error);
        }

    } catch (err) {
        console.error(err);
        alert("Server error");
    }
}

      getCategories();