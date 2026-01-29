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

async function deleteCategory(id) {
    // שלב א: הצגת הודעת אזהרה למשתמש
    const isSure = confirm("האם אתה בטוח שברצונך למחוק את הקטגוריה ואת כל המשימות שלה?");

    // אם המשתמש לחץ "ביטול", עוצרים כאן
    if (!isSure) {
        return; 
    }

    // שלב ב: שליחת בקשת המחיקה לשרת
    try {
        let response = await fetch(`/api/categories/${id}`, {
            method: 'DELETE'
        });

        // אם המחיקה הצליחה (סטטוס 200)
        if (response.ok) {
            alert("הקטגוריה והמשימות נמחקו בהצלחה");
            getCategories(); // רענון הטבלה
        } else {
            let data = await response.json();
            alert(data.message || "שגיאה במחיקת הקטגוריה");
        }
    } catch (err) {
        console.error(err);
        alert("שגיאת שרת");
    }
}

async function updateCategory(id) {
    try {
        let response = await fetch(`/api/categories/${id}`); 
        let data = await response.json();
        if(!response.ok){
            alert(data.message);
            
        }else{
            document.getElementById('id').value = data.id;
            document.getElementById('nameInput').value = data.categoryName;
        }          
        }
     catch (err) {
        alert(err);
    }
}

function addOrEdit(){
    let id = document.getElementById('id').value;
    if(id){
        EditCategory(id);
    }else{
        addNewCategory();
    }
}

async function EditCategory(id) {
              try {
                let categoryName = document.getElementById('nameInput').value;      
                console.log(categoryName);

                let response = await fetch(`/api/categories/${id}`,{
                    method: 'PATCH',
                    headers: {'Content-type':'application/json'},
                    body: JSON.stringify({categoryName})
                })
                if (!response.ok) {
            // אם השרת מחזיר שגיאה, נקרא אותה כטקסט כדי לראות מה קרה
            let text = await response.text(); 
            console.error("Server Error:", text); // תסתכל בקונסול של הדפדפן מה מודפס כאן
            alert("שגיאת שרת: ראה קונסול");
            return;
        }
                    getCategories();
                    
                 document.getElementById('nameInput').value = "";
            } catch (err) {
                alert(err);
            }
        }

      getCategories();