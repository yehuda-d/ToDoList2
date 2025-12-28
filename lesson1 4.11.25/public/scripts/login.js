async function login() {
    let userName = document.getElementById('userName').value;
    let pass = document.getElementById('pass').value;
    
    try {
        if(userName && pass){
        let response  = await fetch('/auth/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'},
            body:JSON.stringify({userName,pass})
        })
        if(response.status == 200){
            window.location.href = '/';
            return;
        }
        let data = await response.json();
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