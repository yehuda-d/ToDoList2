let greating = " hello ";
greating += localStorage.getItem('name');
 document.getElementById("greating").innerHTML = greating;


// if (!name) {
//     window.location.href = '/login';
// } else {
//     document.getElementById('greating').innerText =
//        // `שלום ${userName}`;
//         // או:
//          `Hello ${name}`;
// }