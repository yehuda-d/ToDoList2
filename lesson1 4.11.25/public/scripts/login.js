async function login() {
    let userName = document.getElementById('userName').value;
    let pass = document.getElementById('pass').value;
    
    try {
        if(userName && pass){
        let response  = await fetch('/api/auth/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'},
            body:JSON.stringify({userName,pass})
        })
        let data = await response.json();
        if(response.status == 200){
            localStorage.setItem('name', data.name);
            window.location.href = '/';
            return;
        }
        // console.log(response);
        // console.log(data);
        // console.log(data.message);
        
        alert(data.message);
    }else{
        alert("חסרים נתונים");
    }
    } catch (err) {
        alert(err);
        
    }

}